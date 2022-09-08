interface PopupBase {
  message: string;
  duration?: number;
}

interface ErrorPopup extends PopupBase {
  type: 'error';
}

interface SuccessPopup extends PopupBase {
  type: 'success';
}

type Popup = ErrorPopup | SuccessPopup;
