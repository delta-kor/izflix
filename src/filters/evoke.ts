function Evoke<T>(...methods: (() => Promise<T>)[]): void {
  for (const method of methods) {
    const promise = method();
    promise.catch(e => {
      console.error(e);
    });
  }
}

export default Evoke;
