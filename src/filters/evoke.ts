type Handler<T> = (arg: T) => any;

class Evoke<T> {
  private readonly method: () => Promise<T>;
  private readonly handlers: Handler<T>[] = [];

  constructor(method: () => Promise<T>) {
    this.method = method;
    this.run();
  }

  private run(): void {
    const promise = this.method();
    promise.then(result => {
      this.handlers.forEach(handler => handler(result));
    });
    promise.catch(e => console.log(e));
  }

  public and(handler: Handler<T>): this {
    this.handlers.push(handler);
    return this;
  }

  public retry(): this {
    this.run();
    return this;
  }
}

export default Evoke;
