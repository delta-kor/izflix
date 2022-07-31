import { MobileLimit } from './styles';

const Constants = {
  LANDING_VIDEO_HEIGHT_MOBILE() {
    return (window.innerWidth + 64 * 2) * (9 / 16);
  },
  LANDING_VIDEO_HEIGHT_PC() {
    return window.innerHeight - 180;
  },

  HEADER_STICK_POSITION_MOBILE() {
    return this.LANDING_VIDEO_HEIGHT_MOBILE() - 172;
  },
  HEADER_STICK_POSITION_PC() {
    return this.LANDING_VIDEO_HEIGHT_PC() - 96;
  },
  VIDEO_PAUSE_POSITION_MOBILE() {
    return this.LANDING_VIDEO_HEIGHT_MOBILE() - 80;
  },
  VIDEO_PAUSE_POSITION_PC() {
    return this.HEADER_STICK_POSITION_PC();
  },

  VIDEO_HEADER_FLOAT_POSITION_PC() {
    return 32;
  },

  IS_HEADER_STICK_POSITION_MOBILE() {
    return window.scrollY > this.HEADER_STICK_POSITION_MOBILE();
  },
  IS_HEADER_STICK_POSITION_PC() {
    return window.scrollY > this.HEADER_STICK_POSITION_PC();
  },

  IS_VIDEO_HEADER_FLOAT_POSITION_PC() {
    return window.scrollY > this.VIDEO_HEADER_FLOAT_POSITION_PC();
  },

  IS_ON_TOP() {
    return window.scrollY <= 0;
  },

  TOP_ROUTE(location: any = window.location) {
    return '/' + location.pathname.split('/')[1];
  },
  IS_VIDEO_PAGE(location: any = window.location) {
    return !['/', '/music', '/category', '/info', '/settings', '/stats'].includes(
      this.TOP_ROUTE(location)
    );
  },
  IS_ADDITIONAL_PAGE(location: any = window.location) {
    return !['/', '/music', '/category'].includes(this.TOP_ROUTE(location));
  },
  IS_MAIN(location: any = window.location) {
    return location.pathname === '/';
  },
  IS_BLANK_PAGE(location: any = window.location) {
    return location.pathname === '/live';
  },

  IS_MOBILE() {
    return window.innerWidth <= MobileLimit;
  },
  IS_PC() {
    return window.innerWidth > MobileLimit;
  },
};

export default Constants;
