import HttpException from '../exceptions/http-exception';
import Transmitter from '../services/transmitter';

class Evoke<T> {
  private promise: Promise<T>;

  constructor(promise: Promise<T>) {
    this.promise = promise;
    this.listen();
  }

  private listen(): void {
    this.promise.catch(e => {
      console.error(e);
      if (e instanceof HttpException)
        Transmitter.emit('popup', { type: 'error', message: e.message });
      else Transmitter.emit('popup', { type: 'error', message: 'error.service' });
    });
  }
}

export default Evoke;
