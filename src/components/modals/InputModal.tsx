import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { Color, ModalWidth, Text } from '../../styles';
import ModalAction from '../molecules/ModalAction';
import ModalBase, { ModalProps } from './ModalBase';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: ${ModalWidth};
  max-width: 360px;
`;

const Content = styled.div`
  color: ${Color.WHITE};
  ${Text.SUBTITLE_1};
`;

const Input = styled.input`
  padding: 16px 24px;
  color: ${Color.WHITE};
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  background: ${Color.GRAY};

  &::placeholder {
    color: ${Color.WHITE};
    font-weight: 400;
    opacity: 0.3;
  }
`;

interface Props extends ModalProps<{ nickname: string }> {
  content: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
}

const InputModal: React.FC<Props> = ({
  content,
  value,
  placeholder,
  maxLength,
  onSubmit,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(value ?? '');

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit({ nickname: inputValue });
  };

  return (
    <ModalBase>
      <Layout>
        <Content>{content}</Content>
        <Input
          type={'text'}
          value={inputValue}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSubmit();
          }}
          autoFocus
        />
        <ModalAction onSubmit={handleSubmit} onCancel={onCancel} submit cancel />
      </Layout>
    </ModalBase>
  );
};

export default InputModal;
