const key = 'izflix_settings';

class SettingsClass {
  private data: ISettings;

  constructor() {
    this.data = SettingsClass.loadData();
    this.saveData();
  }

  private static loadData(): ISettings {
    const data: ISettings = {
      FEATURED_VIDEO_AUTOPLAY: true,
      VIDEO_AUTOPLAY: true,
      DEFAULT_VIDEO_QUALITY: 1080,
      DISPLAY_NEXT_VIDEO: true,
      VIDEO_RECOMMEND_COUNT: 20,
      FEATURED_VIDEO_START_POSITION: 0.5,
      NEXT_VIDEO_AUTOPLAY: true,
      NEXT_VIDEO_AUTOPLAY_COUNTDOWN: 5,
      NEXT_VIDEO_INSTANT_PIP: true,
      $_TRAFFIC_ALERT: false,
      $_4K_ALERT: false,
      $_LIVE_TOKEN: null,
    };

    const json = localStorage.getItem(key);
    if (!json) return data;

    try {
      const savedData: Partial<ISettings> = JSON.parse(json);

      for (const index in savedData) {
        const key = index as keyof ISettings;
        (<any>data)[key] = savedData[key] as any;
      }

      return data;
    } catch (e) {
      console.error(e);
      return data;
    }
  }

  private saveData(): void {
    const json = JSON.stringify(this.data);
    localStorage.setItem(key, json);
  }

  public getAll(): ISettings {
    return this.data;
  }

  public getOne<K extends keyof ISettings>(key: K): ISettings[K] {
    return this.data[key];
  }

  public setAll(data: ISettings): void {
    this.data = data;
    this.saveData();
    SettingsClass.loadData();
  }

  public setOne<K extends keyof ISettings>(key: K, value: ISettings[K]): void {
    this.data[key] = value;
    this.saveData();
    SettingsClass.loadData();
  }
}

const Settings = new SettingsClass();

export default Settings;
