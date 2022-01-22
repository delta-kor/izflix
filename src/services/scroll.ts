class ScrollClass {
  public up() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

const Scroll = new ScrollClass();

export default Scroll;
