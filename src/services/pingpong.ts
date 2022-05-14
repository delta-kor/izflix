interface PacketPromise {
  packetId: number;
  resolve: any;
}

class Pingpong {
  private socket: WebSocket;
  private packetId: number = 1;
  private resolves: PacketPromise[] = [];

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.addEventListener('open', this.onOpen.bind(this));
    this.socket.addEventListener('message', this.onMessage.bind(this));
  }

  private onOpen(): void {}

  private onMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data) as ServerPacketBase;
    for (const resolve of this.resolves) {
      if (resolve.packetId === data.packet_id) resolve.resolve(data);
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

    return new Promise((resolve) => {
      this.resolves.push({ packetId, resolve });
    });
  }

  private sendPacket(packet: ClientPacketBase): void {
    packet.packet_id = this.packetId;
    this.packetId++;

    const json = JSON.stringify(packet);
    this.socket.send(json);
  }
}

export default Pingpong;
