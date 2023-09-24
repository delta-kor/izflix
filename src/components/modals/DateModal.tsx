import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { MobileQuery, PcQuery, Color, Text, ModalWidthSmall } from '../../styles';
import ModalAction from './ModalAction';
import ModalBase from './ModalBase';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${ModalWidthSmall};
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

interface Props {
  modal: DateMoal;
  respond: ModalRespondFunction;
}

const DateModal: React.FC<Props> = ({ modal, respond }) => {
  const [inputValue, setInputValue] = useState(modal.value ?? '');

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
  };

  const handleRespond: ModalRespondFunction = result => {
    if (result.type === 'ok') respond({ type: 'date', value: inputValue });
    else respond(result);
  };

  return (
    <ModalBase>
      <Layout>
        <Content>{modal.content}</Content>
        <Input
          type={'date'}
          value={inputValue}
          placeholder={modal.placeholder}
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key === 'Enter') handleRespond({ type: 'ok' });
          }}
          onFocus={e => e.target.select()}
          autoFocus
          spellCheck={false}
          autoComplete={'off'}
        />
        <ModalAction respond={handleRespond} ok cancel />
      </Layout>
    </ModalBase>
  );
};

export default DateModal;
