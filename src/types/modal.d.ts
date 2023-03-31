interface ModalContextType {
  modal: Modal | null;
  fire: ModalFireFunction;
  respond: ModalRespondFunction;
}

type ModalRespondFunction = (result: ModalResult) => void;
type ModalFireFunction = (modal: Modal) => Promise<ModalResult>;

type ModalResult = ModalOkResult | ModalCancelResult | ModalSelectResult | ModalInputResult;

interface ModalOkResult {
  type: 'ok';
}

interface ModalCancelResult {
  type: 'cancel';
}

interface ModalSelectResult {
  type: 'select';
  selected: any;
}

interface ModalInputResult {
  type: 'input';
  value: string;
}

type Modal = TextModal | SelectModal | InputModal | PlaylistModal | LinkModal;

interface ModalBase {
  id?: string;
}

interface TextModal extends ModalBase {
  type: 'text';
  content: string;
}

interface SelectModal extends ModalBase {
  type: 'select';
  content: string;
  items: [any, string][];
  current?: any;
}

interface InputModal extends ModalBase {
  type: 'input';
  content: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
}

interface PlaylistModal extends ModalBase {
  type: 'playlist';
  videoId: string;
  promise?: Evoke<void>;
}

interface LinkModal extends ModalBase {
  type: 'link';
  content: string;
  link: string;
  image: string;
}
