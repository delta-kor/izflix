import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { Color, MobileQuery, ModalWidth, PcQuery, Text } from '../../styles';
import ModalAction from '../molecules/ModalAction';
import ModalBase, { ModalProps } from './ModalBase';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${ModalWidth};
  max-width: 360px;

  ${MobileQuery} {
    gap: 12px;
  }

  ${PcQuery} {
    gap: 16px;
  }
`;

const Content = styled.div`
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.HEADLINE_3};
  }

  ${PcQuery} {
    ${Text.HEADLINE_2};
  }
`;

const Input = styled.input`
  color: ${Color.WHITE};
  font-weight: 700;
  border: none;
  border-radius: 8px;
  background: ${Color.GRAY};

  ${MobileQuery} {
    padding: 14px 20px;
    font-size: 16px;
  }

  ${PcQuery} {
    padding: 16px 20px;
    font-size: 18px;
  }

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
          onFocus={e => e.target.select()}
          autoFocus
          spellCheck={false}
          autoComplete={'off'}
        />
        <ModalAction onSubmit={handleSubmit} onCancel={onCancel} submit cancel />
      </Layout>
    </ModalBase>
  );
};

export default InputModal;
