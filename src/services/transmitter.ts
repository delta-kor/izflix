import EventEmitter from 'events';
import Constants from '../constants';
import Spaceship from './spaceship';

interface TransmitterEvents {
  popup(message: any): void;
  nextvideo(video: IVideoItem): void;
  levelscroll(): void;
  locationupdate(to: string, from: string): void;
  pip(): void;
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
    this.setMaxListeners(0);
    this.loadListeners();
  }

  private loadListeners(): void {
    this.loadScrollListeners();
    this.loadLocationListeners();
    this.loadResizeListeners();
  }

  private loadScrollListeners(): void {
    document.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      const max = Math.max(this.lastScroll, currentScroll);
      const min = Math.min(this.lastScroll, currentScroll);

      const positions = [
        0,
        Constants.VIDEO_HEADER_FLOAT_POSITION_PC(),
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

  private loadLocationListeners(): void {
    this.on('locationupdate', (to, from) => {
      if (to === '/') Spaceship.refreshUserRecommends(20);
      this.emit('levelscroll');
    });
  }

  private loadResizeListeners(): void {
    window.addEventListener('resize', () => {
      this.emit('levelscroll');
    });
  }
}

const Transmitter = new TransmitterClass();
export default Transmitter;
