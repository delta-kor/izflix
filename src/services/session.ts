class Session {
  private readonly map: Map<string, any> = new Map<string, any>();

  public set<T>(key: string, value: T): void {
    this.map.set(key, value);
  }

  public get<T>(key: string): Partial<T> {
    return this.map.get(key) || {};
  }

  public remove<T>(key: string): void {
    this.map.delete(key);
  }
}

export default new Session() as Session;
