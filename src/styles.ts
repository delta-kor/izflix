const MobileLimit = 767;
const TabletLimit = 1080;

const MobileQuery = `@media (max-width: ${MobileLimit}px)`;
const TabletQuery = `@media (min-width: ${MobileLimit + 1}px) and (max-width: ${TabletLimit}px)`;
const PcQuery = `@media (min-width: ${MobileLimit + 1}px)`;

const PcStretchLimitInner = 1240;
const PcStretchLimitOuter = PcStretchLimitInner + 132 * 2;

const MobileSideMargin = 24;
const VideoPageAdditionalMargin = -8;

const MobileTopMargin = 80;
const PcTopMargin = 100;
const PcLeftMargin = 112;

const Color = {
  BLACK: '#272928',
  WHITE: '#FFFFFF',
  PRIMARY: '#556FE5',
  GRAY: '#454B6B',
  DARK_GRAY: '#161A36',
  BACKGROUND: '#070D2D',
  RED: '#E55555',
  TRANSPARENT: 'transparent',
};

const Text = {
  HEADLINE_1: `font-size: 24px; font-weight: 800; height: 28px; line-height: 28px;`,
  HEADLINE_2: `font-size: 20px; font-weight: 800; height: 24px; line-height: 24px;`,
  HEADLINE_3: `font-size: 18px; font-weight: 700; height: 22px; line-height: 22px;`,
  SUBTITLE_1: `font-size: 16px; font-weight: 700; height: 20px; line-height: 20px;`,
  SUBTITLE_2: `font-size: 14px; font-weight: 700; height: 18px; line-height: 18px;`,
  BODY_1: `font-size: 16px; font-weight: 400; height: 20px; line-height: 20px;`,
  BODY_2: `font-size: 14px; font-weight: 400; height: 18px; line-height: 18px;`,
  BODY_3: `font-size: 12px; font-weight: 400; height: 14px; line-height: 14px;`,
  CAPTION: `font-size:12px; font-weight: 400;`,
  EX_HEADLINE_1: `font-size: 30px; font-weight: 800; height: 36px; line-height: 36px;`,
  EX_SUBTITLE_1: `font-size: 20px; font-weight: 700; height: 24px; line-height: 24px;`,
  EX_BODY_1: `font-size: 18px; font-weight: 400; height: 22px; line-height: 22px;`,
  EX_CAPTION: `font-size: 18px; font-weight: 400;`,
};

const Placeholder = {
  HEADLINE_1: `height: 28px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  HEADLINE_2: `height: 24px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  HEADLINE_3: `height: 22px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  SUBTITLE_1: `height: 20px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  SUBTITLE_2: `height: 18px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  BODY_1: `height: 20px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  BODY_2: `height: 18px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  BODY_3: `height: 14px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  EX_BODY_1: `height: 22px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  EX_HEADLINE_1: `height: 36px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
  EX_SUBTITLE_1: `height: 24px; background: ${Color.DARK_GRAY}; border-radius: 4px;`,
};

const Ease = [0.04, 0.62, 0.23, 0.98];
const EaseReverse = [0.76, 0.02, 0.42, 0.8];

const HideOverflow = `overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;`;

const PcInnerPadding = `max(32px, calc((100vw - ${PcLeftMargin}px - ${PcStretchLimitInner}px) / 2))`;

const ModalWidthLarge = 'calc(min(100vw - 80px, 420px))';
const ModalWidthSmall = 'calc(min(100vw - 80px, 360px))';

const HideScrollbar = '&::-webkit-scrollbar { display: none; }';

export {
  MobileLimit,
  TabletLimit,
  MobileQuery,
  PcQuery,
  TabletQuery,
  PcStretchLimitInner,
  PcStretchLimitOuter,
  MobileSideMargin,
  VideoPageAdditionalMargin,
  MobileTopMargin,
  PcTopMargin,
  PcLeftMargin,
  Color,
  Text,
  Placeholder,
  Ease,
  EaseReverse,
  HideOverflow,
  PcInnerPadding,
  ModalWidthLarge,
  ModalWidthSmall,
  HideScrollbar,
};
