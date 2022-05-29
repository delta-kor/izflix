const key = 'izflix_playtime';

type PlaytimeData = [string, number][];

class Playtime {
  public static get(): PlaytimeData {
    const json = localStorage.getItem(key) || '[]';
    try {
      const data = JSON.parse(json);
      return data;
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
}

export default Playtime;
