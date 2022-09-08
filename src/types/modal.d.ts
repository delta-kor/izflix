type ModalSegment = { Component: React.FC; props: any };
type ModalHandler = {
  open<T>(Component: React.FC<T>, props: T): void;
  close(Component: React.FC): void;
};
