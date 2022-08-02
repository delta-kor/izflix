const MobileLimit = 767;
const TabletLimit = 1080;

const MobileQuery = `@media (max-width: ${MobileLimit}px)`;
const TabletQuery = `@media (min-width: ${MobileLimit + 1}px) and (max-width: ${TabletLimit}px)`;
const PcQuery = `@media (min-width: ${MobileLimit + 1}px)`;

const PcStretchLimitInner = 1240;
const PcStretchLimitOuter = PcStretchLimitInner + 132 * 2;

const MobileTopMargin = 80;
const PcTopMargin = 100;
const PcLeftMargin = 112;

const Color = {
  WHITE: '#FFFFFF',
  PRIMARY: '#556FE5',
  GRAY: '#454B6B',
  DARK_GRAY: '#161A36',
  BACKGROUND: '#070D2D',
  TRANSPARENT: 'transparent',

  GRAY_HOVER: '#606895',
  GRAY_ACTIVE: '#969BBB',
};

const Text = {
  HEADLINE_1: `font-size: 24px; font-weight: 800;`,
  HEADLINE_2: `font-size: 20px; font-weight: 800;`,
  HEADLINE_3: `font-size: 18px; font-weight: 700;`,
  SUBTITLE_1: `font-size: 16px; font-weight: 700;`,
  SUBTITLE_2: `font-size: 14px; font-weight: 700;`,
  BODY_1: `font-size: 16px; font-weight: 400;`,
  BODY_2: `font-size: 14px; font-weight: 400;`,
  BODY_3: `font-size: 12px; font-weight: 400;`,
  CAPTION: `font-size:12px; font-weight: 400;`,
  EX_HEADLINE_1: `font-size: 30px; font-weight: 800;`,
  EX_SUBTITLE_1: `font-size: 20px; font-weight: 700;`,
  EX_CAPTION: `font-size: 18px; font-weight: 400;`,
};

const Ease = [0.04, 0.62, 0.23, 0.98];

const HideOverflow = `overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;`;

const PcInnerPadding = `max(132px, calc((100vw - ${PcLeftMargin}px - ${PcStretchLimitInner}px) / 2))`;

const HideScrollbar = '&::-webkit-scrollbar { display: none; }';

export {
  MobileLimit,
  TabletLimit,
  MobileQuery,
  PcQuery,
  TabletQuery,
  PcStretchLimitInner,
  PcStretchLimitOuter,
  MobileTopMargin,
  PcTopMargin,
  PcLeftMargin,
  Color,
  Text,
  Ease,
  HideOverflow,
  PcInnerPadding,
  HideScrollbar,
};
