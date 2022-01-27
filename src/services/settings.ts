const key = 'izflix_settings';

class SettingsClass {
  private data: ISettings;

  constructor() {
    const data = this.loadData();
    this.data = data;
    this.saveData();
  }

  private loadData(): ISettings {
    const data: ISettings = {
      FEATURED_VIDEO_AUTOPLAY: true,
      VIDEO_AUTOPLAY: true,
      DEFAULT_VIDEO_QUALITY: 1080,
    };

    const json = localStorage.getItem(key);
    if (!json) return data;

    try {
      const savedData: Partial<ISettings> = JSON.parse(json);

      for (const index in savedData) {
        const key = index as keyof ISettings;
        const value = savedData[key] as any;
        (<any>data)[key] = value;
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
    this.loadData();
  }

  public setOne<K extends keyof ISettings>(key: K, value: ISettings[K]): void {
    this.data[key] = value;
  }
}

const Settings = new SettingsClass();

export default Settings;
