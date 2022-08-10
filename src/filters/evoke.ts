class Evoke<T> {
  private promise: Promise<T>;

  constructor(promise: Promise<T>) {
    this.promise = promise;
    this.listen();
  }

  private listen(): void {
    this.promise.catch(e => console.error(e));
  }
}

export default Evoke;
