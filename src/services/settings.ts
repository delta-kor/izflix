const key = 'izflix_settings_v2';

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
      VIDEO_SUBTITLE: false,
      VIDEO_QUALITY: 1080,
      VIDEO_NEXT_COUNTDOWN: 5,
      VIDEO_SCREEN_ADJUST: 'left',

      USER_RECOMMEND_COUNT: 20,
      VIDEO_RECOMMEND_COUNT: 10,

      $_AUTH_TOKEN: null,
      $_LIVE_TOKEN: null,
      $_VOD_CLUSTER: null,
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
