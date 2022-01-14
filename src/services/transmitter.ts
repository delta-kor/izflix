import EventEmitter from 'events';
import Constants from '../constants';

interface TransmitterEvents {
  popup(message: any): void;
  levelscroll(): void;
  locationupdate(path: string): void;
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

class TransmitterClass extends EventEmitter {
  private lastScroll: number = window.scrollY;

  constructor() {
    super();
    this.loadListeners();
  }

  private loadListeners() {
    this.loadScrollListeners();
    this.loadLocationListeners();
  }

  private loadScrollListeners() {
    document.addEventListener('scroll', (e) => {
      const currentScroll = window.scrollY;

      const max = Math.max(this.lastScroll, currentScroll);
      const min = Math.min(this.lastScroll, currentScroll);

      const positions = [
        0,
        Constants.HEADER_STICK_POSITION_MOBILE(),
        Constants.HEADER_STICK_POSITION_PC(),
        Constants.VIDEO_PAUSE_POSITION_MOBILE(),
        Constants.VIDEO_PAUSE_POSITION_PC(),
      ];

      for (const position of positions) {
        if (min <= position && max >= position) {
          Transmitter.emit('levelscroll');
          break;
        }
      }

      this.lastScroll = currentScroll;
    });
  }

  private loadLocationListeners() {
    this.on('locationupdate', () => this.emit('levelscroll'));
  }
}

const Transmitter = new TransmitterClass();
export default Transmitter;
