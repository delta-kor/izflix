import Playtime from './playtime';

const active = true;
const target = 70000;
const current = 1000;

export default class Funder {
  public static isActive(): boolean {
    return active && Playtime.total() > 1;
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
