class ScrollClass {
  private readonly points: Map<string, ScrollData> = new Map();

  public getPosition(): number {
    return window.scrollY;
  }

  public up(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  public to(position: number): void {
    window.scrollTo({ top: position, behavior: 'auto' });
  }

  public savePoint(data: ScrollData): void {
    if (data.type === 'music') {
      this.points.set('music', data);
    }
  }

  public getPoint(key: string): ScrollData | null {
    return this.points.get(key) || null;
  }
}

const Scroll = new ScrollClass();

export default Scroll;
