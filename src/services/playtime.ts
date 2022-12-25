const key = 'izflix_playtime_v2';

type PlaytimeData = [string, number][];

class Playtime {
  public static get(): PlaytimeData {
    const json = localStorage.getItem(key) || '[]';
    try {
      return JSON.parse(json);
    } catch (e) {
      return [];
    }
  }

  public static set(data: PlaytimeData): void {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  }

  public static add(id: string, delta: number): void {
    delta = Math.round((delta + Number.EPSILON) * 100) / 100;

    const data = Playtime.get();
    for (const item of data) {
      if (item[0] === id) {
        const currentPlaytime = item[1];

        const index = data.indexOf(item);
        data.splice(index, 1);

        const added = parseFloat((currentPlaytime + delta).toFixed(2));
        data.push([id, added]);

        Playtime.set(data);
        return;
      }
    }
    data.push([id, delta]);
    Playtime.set(data);
  }

  public static total(): number {
    const data = Playtime.get();

    let total: number = 0;
    for (const item of data) {
      total += item[1];
    }

    return total;
  }

  public static count(): number {
    const data = Playtime.get();
    return data.length;
  }

  public static rank(count: number): [string, number][] {
    const data = Playtime.get();
    const ranked = data.sort((a, b) => b[1] - a[1]);
    return ranked.slice(0, count);
  }
}

export default Playtime;
