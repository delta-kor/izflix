import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import { getMemberColor } from '../../services/member';

const MembersList = styled.div`
  display: flex;
  align-items: center;
`;

const CircleItem = styled.div<{ $color: string }>`
  border-radius: 100%;
  border: 3px solid ${Color.BACKGROUND};
  background: ${({ $color }) => $color};
  color: ${Color.WHITE};
  text-align: center;

  ${MobileQuery} {
    margin: 0 -8px 0 0;
    width: 20px;
    height: 20px;
    line-height: 15px;
    font-size: 10px;
    font-weight: 700;
  }

  ${PcQuery} {
    margin: 0 -10px 0 0;
    width: 24px;
    height: 24px;
    line-height: 18px;
    font-size: 12px;
  }
`;

interface Props {
  members: string[];
  info?: boolean;
}

const MemberCircle: React.FC<Props> = ({ members, info }) => {
  if (info)
    return (
      <MembersList>
        {members.map(member => (
          <CircleItem key={member} $color={getMemberColor(member)} />
        ))}
      </MembersList>
    );

  return (
    <MembersList>
      {members.slice(0, 4).map(member => (
        <CircleItem key={member} $color={getMemberColor(member)} />
      ))}
      {members.length > 5 && (
        <CircleItem $color={getMemberColor('izone')}>+{members.length - 4}</CircleItem>
      )}
    </MembersList>
  );
};

export default MemberCircle;
