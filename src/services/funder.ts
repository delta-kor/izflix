import Playtime from './playtime';

const active = false;
const target = 42000;
const current = 103854;

export default class Funder {
  public static isActive(): boolean {
    return active && Playtime.total() > 60 * 60 * 1;
  }

  public static percentage(): string {
    return Math.round((current / target) * 100) + '%';
  }

  public static target(): string {
    return target.toLocaleString('ko');
  }

  public static left(): string {
    return (target - current).toLocaleString('ko');
  }
}
