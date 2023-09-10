import Playtime from './playtime';

const active = true;
const target = 42000;
const current = 3000;

export default class Funder {
  public static isActive(): boolean {
    console.log(Playtime.total());
    return active && Playtime.total() > 60 * 60 * 3;
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