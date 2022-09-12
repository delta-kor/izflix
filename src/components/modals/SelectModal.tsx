import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const Selector = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    gap: 4px;
  }

  ${PcQuery} {
    gap: 8px;
  }
`;

const Item = styled.div<{ $active: boolean }>`
  ${Text.BODY_1};
  height: unset;

  color: ${Color.WHITE};
  background: ${({ $active }) => ($active ? Color.GRAY : Color.DARK_GRAY)};
  border-radius: 4px;
  transition: background 0.2s;
  cursor: pointer;

  ${MobileQuery} {
    padding: 12px 16px;
  }

  ${PcQuery} {
    padding: 14px 16px;
  }
`;

interface Props extends ModalProps<{ selected: string }> {
  content: string;
  items: [string, string][];
  current?: string;
  onUpdate?: (selected: string) => void;
}

const SelectModal: React.FC<Props> = ({
  content,
  items,
  current,
  onUpdate,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<string>(current || items[0][0]);

  useEffect(() => {
    onUpdate && onUpdate(selected);
  }, [selected]);

  const handleSubmit = () => {
    onSubmit && onSubmit({ selected });
  };

  return (
    <ModalBase>
      <Layout>
        <Content>{t(content)}</Content>
        <Selector>
          {items.map(([value, label]) => (
            <Item $active={selected === value} onClick={() => setSelected(value)} key={value}>
              {label}
            </Item>
          ))}
        </Selector>
        <ModalAction onSubmit={handleSubmit} onCancel={onCancel} submit cancel />
      </Layout>
    </ModalBase>
  );
};

export default SelectModal;
