function Filter<T>(...promises: Promise<T>[]): void {
  promises.forEach(promise =>
    promise.catch(e => {
      console.error(e);
    })
  );
}

export default Filter;
