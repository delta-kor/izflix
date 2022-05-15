import { EventEmitter } from 'events';
import Settings from './settings';
import getTicket from './ticket';
import Transmitter from './transmitter';

interface PacketPromise {
  packetId: number;
  resolve: any;
  reject: any;
}

interface PingpongEvents {
  me(id: string): void;
  usersync(infos: UserInfo[]): void;
  userconnect(...infos: UserInfo[]): void;
  userdisconnect(...ids: string[]): void;
}

declare interface Pingpong {
  on<U extends keyof PingpongEvents>(
    event: U,
    listener: PingpongEvents[U]
  ): this;
  emit<U extends keyof PingpongEvents>(
    event: U,
    ...args: Parameters<PingpongEvents[U]>
  ): boolean;
}

class Pingpong extends EventEmitter {
  private socket!: WebSocket;
  private packetId: number = 1;
  private promises: PacketPromise[] = [];

  constructor(url: string) {
    super();
    try {
      this.socket = new WebSocket(url);
      this.socket.addEventListener('open', this.onOpen.bind(this));
      this.socket.addEventListener('message', this.onMessage.bind(this));
      this.socket.addEventListener('error', () =>
        this.onError('서버 연결에 실패했어요\n다시 시도해 주세요')
      );
    } catch (e) {
      console.error(e);
      this.onError('서버 연결에 실패했어요\n다시 시도해 주세요');
    }
  }

  private sendPacketAndWait<T extends ServerPacketBase>(
    packet: ClientPacketBase
  ): Promise<T> {
    const packetId = this.packetId;
    packet.packet_id = packetId;
    this.packetId++;

    const json = JSON.stringify(packet);
    this.socket.send(json);

    return new Promise((resolve, reject) => {
      this.promises.push({ packetId, resolve, reject });
    });
  }

  private sendPacket(packet: ClientPacketBase): void {
    packet.packet_id = this.packetId;
    this.packetId++;

    const json = JSON.stringify(packet);
    this.socket.send(json);
  }

  private onError(
    message: string = '오류가 발생했어요\n다시 시도해 주세요'
  ): void {
    Transmitter.emit('popup', message);
  }

  private async onOpen(): Promise<void> {
    try {
      const ticket = await getTicket();
      const token = Settings.getOne('$_LIVE_TOKEN');

      const helloPacket: ClientPacket.Hello = {
        packet_id: 0,
        type: 'hello',
        ticket,
        token,
      };
      const response = await this.sendPacketAndWait<ServerPacket.Hello>(
        helloPacket
      );

      const newToken = response.token;
      Settings.setOne('$_LIVE_TOKEN', newToken);

      this.emit('me', response.user_info.id);
    } catch (e: any) {
      console.error(e);
      this.onError(e.message);
    }
  }

  private onMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data) as ServerPacketBase;
      for (const resolve of this.promises) {
        if (resolve.packetId === data.packet_id) {
          if (data.type === 'error') resolve.reject(data);
          else resolve.resolve(data);
        }
      }

      switch (data.type) {
        case 'user-sync':
          this.onUserSync(data as any);
          break;
        case 'live-user-sync':
          this.onLiveUserSync(data as any);
          break;
        case 'user-connect':
          this.onUserConnect(data as any);
          break;
        case 'user-disconnect':
          this.onUserDisconnect(data as any);
          break;
      }
    } catch (e) {
      console.error(e);
      this.onError();
    }
  }

  private onUserSync(packet: ServerPacket.UserSync): void {
    const users = packet.data;
    this.emit('usersync', users);
  }

  private onLiveUserSync(packet: ServerPacket.LiveUserSync): void {
    const users = packet.data;
    this.emit('usersync', users);
    this.emit('userconnect', ...users);
  }

  private onUserConnect(packet: ServerPacket.UserConnect): void {
    const user = packet.user_info;
    this.emit('userconnect', user);
  }

  private onUserDisconnect(packet: ServerPacket.UserDisconnect): void {
    const id = packet.id;
    this.emit('userdisconnect', id);
  }
}

export default Pingpong;
