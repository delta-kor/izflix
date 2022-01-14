import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Color, Ease } from '../../styles';
import { Mobile, Pc } from '../tools/MediaQuery';

const MobileLayout = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 72px;
  background: ${Color.BACKGROUND};
  justify-content: center;
  align-items: center;
  z-index: 20;

  & > * {
    margin: 0 48px 0 0;

    :last-child {
      margin: 0;
    }
  }
`;

const Icon = styled.svg`
  box-sizing: content-box;
  padding: 16px;
  width: 24px;
  height: 24px;

  & > path {
    transition: fill 0.2s;
  }
`;

const PcLayout = styled(motion.div)`
  display: flex;
  margin: 0 auto;
  width: 480px;
  height: 64px;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 0 48px 0 0;

    :last-child {
      margin: 0;
    }
  }
`;

const MenuItem = styled.div<{ active: boolean }>`
  display: inline-block;

  padding: 4px 4px 2px 4px;
  background-image: linear-gradient(${Color.WHITE}, ${Color.WHITE});
  background-position: 0 100%;
  background-size: 0% 2px;
  background-repeat: no-repeat;

  font-weight: normal;
  font-size: 28px;
  text-align: center;
  user-select: none;
  cursor: pointer;

  transition: background-size 0.2s, background-position 0s 0.2s;

  ${({ active }) =>
    active &&
    `
      background-position: 100% 100%;
      background-size: 100% 2px;
    `}
`;

const Navigator = () => {
  const location = useLocation();

  let active: number = 0;
  switch (location.pathname) {
    case '/':
      active = 0;
      break;
    case '/music':
      active = 1;
      break;
    case '/category':
      active = 2;
      break;
  }

  return (
    <>
      <Mobile>
        <MobileLayout>
          <Link to="/">
            <Icon>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M21.66 10.25L12.66 2.25002C12.4775 2.0897 12.2429 2.00128 12 2.00128C11.7571 2.00128 11.5225 2.0897 11.34 2.25002L2.34 10.25C2.18703 10.3853 2.07916 10.5642 2.0309 10.7627C1.98263 10.9611 1.99627 11.1696 2.07 11.36C2.14252 11.548 2.2701 11.7096 2.43605 11.8238C2.60199 11.938 2.79856 11.9994 3 12H4V21C4 21.2652 4.10535 21.5196 4.29289 21.7071C4.48043 21.8947 4.73478 22 5 22H19C19.2652 22 19.5196 21.8947 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21V12H21C21.2014 11.9994 21.398 11.938 21.5639 11.8238C21.7299 11.7096 21.8575 11.548 21.93 11.36C22.0037 11.1696 22.0174 10.9611 21.9691 10.7627C21.9208 10.5642 21.813 10.3853 21.66 10.25V10.25ZM13 20H11V17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17V20ZM18 20H15V17C15 16.2044 14.6839 15.4413 14.1213 14.8787C13.5587 14.3161 12.7956 14 12 14C11.2043 14 10.4413 14.3161 9.87868 14.8787C9.31607 15.4413 9 16.2044 9 17V20H6V12H18V20ZM5.63 10L12 4.34002L18.37 10H5.63Z"
                fill={active === 0 ? Color.PRIMARY : Color.GRAY}
              />
            </Icon>
          </Link>
          <Link to="/music">
            <Icon>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M21.65 2.24003C21.541 2.14648 21.4131 2.07752 21.2751 2.03783C21.137 1.99814 20.992 1.98866 20.85 2.01003L7.85 4.01003C7.61326 4.04595 7.39727 4.16562 7.24129 4.34729C7.0853 4.52897 6.99969 4.76058 7 5.00003V15.35C6.53277 15.1218 6.01999 15.0022 5.5 15C4.80777 15 4.13108 15.2053 3.55551 15.5899C2.97993 15.9745 2.53133 16.5211 2.26642 17.1606C2.00152 17.8002 1.9322 18.5039 2.06725 19.1828C2.2023 19.8618 2.53564 20.4854 3.02513 20.9749C3.51461 21.4644 4.13825 21.7977 4.81719 21.9328C5.49612 22.0678 6.19985 21.9985 6.83939 21.7336C7.47894 21.4687 8.02556 21.0201 8.41015 20.4445C8.79473 19.869 9 19.1923 9 18.5V10.86L20 9.17003V13.35C19.5328 13.1218 19.02 13.0022 18.5 13C17.8078 13 17.1311 13.2053 16.5555 13.5899C15.9799 13.9745 15.5313 14.5211 15.2664 15.1606C15.0015 15.8002 14.9322 16.5039 15.0673 17.1828C15.2023 17.8618 15.5356 18.4854 16.0251 18.9749C16.5146 19.4644 17.1383 19.7977 17.8172 19.9328C18.4961 20.0678 19.1999 19.9985 19.8394 19.7336C20.4789 19.4687 21.0256 19.0201 21.4101 18.4445C21.7947 17.869 22 17.1923 22 16.5V3.00003C22 2.85559 21.9687 2.71286 21.9083 2.58166C21.8479 2.45047 21.7598 2.33391 21.65 2.24003V2.24003ZM5.5 20C5.20333 20 4.91332 19.9121 4.66665 19.7472C4.41997 19.5824 4.22771 19.3481 4.11418 19.0741C4.00065 18.8 3.97095 18.4984 4.02882 18.2074C4.0867 17.9164 4.22956 17.6491 4.43934 17.4394C4.64912 17.2296 4.91639 17.0867 5.20737 17.0289C5.49834 16.971 5.79994 17.0007 6.07403 17.1142C6.34812 17.2277 6.58238 17.42 6.74721 17.6667C6.91203 17.9133 7 18.2034 7 18.5C7 18.8979 6.84197 19.2794 6.56066 19.5607C6.27936 19.842 5.89783 20 5.5 20ZM18.5 18C18.2033 18 17.9133 17.9121 17.6666 17.7472C17.42 17.5824 17.2277 17.3481 17.1142 17.0741C17.0007 16.8 16.9709 16.4984 17.0288 16.2074C17.0867 15.9164 17.2296 15.6491 17.4393 15.4394C17.6491 15.2296 17.9164 15.0867 18.2074 15.0289C18.4983 14.971 18.7999 15.0007 19.074 15.1142C19.3481 15.2277 19.5824 15.42 19.7472 15.6667C19.912 15.9133 20 16.2034 20 16.5C20 16.8979 19.842 17.2794 19.5607 17.5607C19.2794 17.842 18.8978 18 18.5 18ZM20 7.14003L9 8.83003V5.83003L20 4.17003V7.14003Z"
                fill={active === 1 ? Color.PRIMARY : Color.GRAY}
              />
            </Icon>
          </Link>
          <Link to="/category">
            <Icon>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M7.5 8H21.5C22.1 8 22.5 7.6 22.5 7C22.5 6.4 22.1 6 21.5 6H7.5C6.9 6 6.5 6.4 6.5 7C6.5 7.6 6.9 8 7.5 8ZM21.5 11H11.5C10.9 11 10.5 11.4 10.5 12C10.5 12.6 10.9 13 11.5 13H21.5C22.1 13 22.5 12.6 22.5 12C22.5 11.4 22.1 11 21.5 11ZM21.5 16H15.5C14.9 16 14.5 16.4 14.5 17C14.5 17.6 14.9 18 15.5 18H21.5C22.1 18 22.5 17.6 22.5 17C22.5 16.4 22.1 16 21.5 16ZM3.5 6C2.9 6 2.5 6.4 2.5 7C2.5 7.6 2.9 8 3.5 8C4.1 8 4.5 7.6 4.5 7C4.5 6.4 4.1 6 3.5 6ZM7.5 11C6.9 11 6.5 11.4 6.5 12C6.5 12.6 6.9 13 7.5 13C8.1 13 8.5 12.6 8.5 12C8.5 11.4 8.1 11 7.5 11ZM11.5 16C10.9 16 10.5 16.4 10.5 17C10.5 17.6 10.9 18 11.5 18C12.1 18 12.5 17.6 12.5 17C12.5 16.4 12.1 16 11.5 16Z"
                fill={active === 2 ? Color.PRIMARY : Color.GRAY}
              />
            </Icon>
          </Link>
        </MobileLayout>
      </Mobile>
      <Pc>
        <PcLayout
          layoutId="navigator"
          transition={{ duration: 0.5, ease: Ease }}
        >
          <Link to="/">
            <MenuItem active={active === 0}>HOME</MenuItem>
          </Link>
          <Link to="/music">
            <MenuItem active={active === 1}>MUSIC</MenuItem>
          </Link>
          <Link to="/category">
            <MenuItem active={active === 2}>CATEGORY</MenuItem>
          </Link>
        </PcLayout>
      </Pc>
    </>
  );
};

export default Navigator;
