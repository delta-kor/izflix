import HttpException from '../exceptions/http-exception';
import Transmitter from '../services/transmitter';

class Evoke<T> {
  private promise: Promise<T>;
  private callbacks: any[] = [];

  constructor(promise: Promise<T>) {
    this.promise = promise;
    this.listen();
  }

  private listen(): void {
    this.promise
      .then(data => this.callbacks.forEach(callback => callback(data)))
      .catch(e => {
        console.error(e);
        if (e instanceof HttpException)
          Transmitter.emit('popup', { type: 'error', message: e.message });
        else Transmitter.emit('popup', { type: 'error', message: 'error.service' });
      });
  }

  public then(callback: (data: T) => void): void {
    this.callbacks.push(callback);
  }
}

export default Evoke;
