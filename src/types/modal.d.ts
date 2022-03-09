type ModalData = SelectModalData | ShareModalData | InfoModalData;

interface SelectModalData {
  type: 'select';
  title: string;
  submit?: string;
  content: SelectModalContent[];
  default: any;
}

interface SelectModalContent {
  id: any;
  text: string;
}

interface ShareModalData {
  type: 'share';
  id: string;
}

interface InfoModalData {
  type: 'info';
  title: string;
  description: string;
}
