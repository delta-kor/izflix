interface UserInfo {
  id: string;
  nickname: string;
  role: Role;
}

interface PacketBase<T extends string = any> {
  type: T;
}

interface ClientPacketBase<T extends string = any> extends PacketBase<T> {
  packet_id: number;
}

interface ServerPacketBase<T extends string = any> extends PacketBase<T> {
  packet_id: number | null;
}

namespace ClientPacket {
  export interface Hello extends ClientPacketBase<'hello'> {
    ticket: string;
    token: string | null;
  }

  export interface UserSync extends ClientPacketBase<'user-sync'> {
    id: string[];
  }
}

namespace ServerPacket {
  export interface Hello extends ServerPacketBase<'hello'> {
    server_time: number;
    user_info: UserInfo;
    token: string;
  }

  export interface Error extends ServerPacketBase<'error'> {
    message: string;
  }

  export interface MultipleConnect
    extends ServerPacketBase<'multiple-connect'> {}

  export interface UserConnect extends ServerPacketBase<'user-connect'> {
    user_info: UserInfo;
  }

  export interface UserDisconnect extends ServerPacketBase<'user-disconnect'> {
    id: string;
  }

  export interface UserSync extends ServerPacketBase<'user-sync'> {
    data: UserInfo[];
  }
}
