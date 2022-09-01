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
      else
        Transmitter.emit('popup', { type: 'error', message: '서비스 로드 중 오류가 발생했어요' });
    });
  }
}

export default Evoke;
