import EventEmitter from 'events';

interface TransmitterEvents {
  popup(message: any): void;
}

declare interface TransmitterClass {
  on<U extends keyof TransmitterEvents>(
    event: U,
    listener: TransmitterEvents[U]
  ): this;
  emit<U extends keyof TransmitterEvents>(
    event: U,
    ...args: Parameters<TransmitterEvents[U]>
  ): boolean;
}

class TransmitterClass extends EventEmitter {}

const Transmitter = new TransmitterClass();

export default Transmitter;
