type ModalData = SelectModalData;

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
