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

interface LoadingPopup extends PopupBase {
  type: 'loading';
}

type Popup = ErrorPopup | SuccessPopup | LoadingPopup;
