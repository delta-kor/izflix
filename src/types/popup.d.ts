interface PopupBase {
  message: string;
  duration?: number;
}

interface ErrorPopup extends PopupBase {
  type: 'error';
}

type Popup = ErrorPopup;
