import { m, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { MobileQuery, PcQuery, Color, Text, ModalWidthSmall } from '../../styles';
import SmoothBox from '../atoms/SmoothBox';
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

const Selector = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    gap: 6px;
  }

  ${PcQuery} {
    gap: 8px;
  }
`;

const Item = styled(SmoothBox)<{ $active: boolean }>`
  & > .content {
    ${Text.BODY_1};
    height: unset;

    color: ${Color.WHITE};
    background: ${({ $active }) => ($active ? Color.GRAY : Color.GRAY + '1F')};
    border-radius: 4px;

    transition: background 0.2s;
    cursor: pointer;

    ${MobileQuery} {
      padding: 10px 16px;
    }

    ${PcQuery} {
      padding: 12px 16px;
    }
  }
`;

interface Props {
  modal: SelectModal;
  respond: ModalRespondFunction;
}

const SelectModal: React.FC<Props> = ({ modal, respond }) => {
  const { t } = useTranslation();
  const device = useDevice();

  const [selected, setSelected] = useState<any>(modal.current || modal.items[0][0]);

  const handleRespond: ModalRespondFunction = result => {
    if (result.type === 'ok') respond({ type: 'select', selected });
    else respond(result);
  };

  return (
    <ModalBase>
      <Layout>
        <Content>{t(modal.content)}</Content>
        <Selector>
          {modal.items.map(([value, label]) => (
            <Item
              $active={selected === value}
              hover={device === 'pc' ? 1.02 : 1.04}
              tap={device === 'pc' ? 0.98 : 0.96}
              onClick={() => setSelected(value)}
              key={value}
            >
              {label}
            </Item>
          ))}
        </Selector>
        <ModalAction respond={handleRespond} ok cancel />
      </Layout>
    </ModalBase>
  );
};

export default SelectModal;
