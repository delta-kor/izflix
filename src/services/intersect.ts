import EventEmitter from 'events';

class Intersect extends EventEmitter {
  private readonly observer: IntersectionObserver;

  constructor() {
    super();
    this.observer = new IntersectionObserver(this.onIntersect.bind(this), {
      threshold: [1],
      rootMargin: '-80px 0px 0px 0px',
    });
  }

  private onIntersect(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    if (entry.intersectionRatio === 1) {
      this.emit('bump', 'out');
    } else {
      this.emit('bump', 'in');
    }
  }

  public setBoundary(id: string) {
    const element = document.getElementById(id);
    if (!element) {
      console.log('no');
      this.observer.disconnect();
      this.emit('bump', 'in');
      return false;
    }

    this.observer.disconnect();
    this.observer.observe(element);
  }
}

export default new Intersect();
