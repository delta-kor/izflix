type ModalCallback = (data: ModalData | null, key: number) => void;

class ModalControllerClass {
  private callbacks: Set<ModalCallback> = new Set();
  private resolves: Map<number, any> = new Map();

  public fire<T = any>(data: ModalData | null): Promise<T> {
    const key = Date.now();
    this.callbacks.forEach((callback) => callback(data, key));
    return new Promise((resolve) => this.resolves.set(key, resolve));
  }

  public submit(key: number, data: any): void {
    const resolve = this.resolves.get(key);
    resolve && resolve(data);
    this.fire(null);
  }

  public subscribe(callback: ModalCallback): void {
    this.callbacks.add(callback);
  }

  public unsubscribe(callback: ModalCallback): void {
    this.callbacks.delete(callback);
  }
}

const ModalController = new ModalControllerClass();

export default ModalController;
