const MobileLimit = 767;
const TabletLimit = 1080;

const MobileQuery = `@media (max-width: ${MobileLimit}px)`;
const TabletQuery = `@media (min-width: ${
  MobileLimit + 1
}px) and (max-width: ${TabletLimit}px)`;
const PcQuery = `@media (min-width: ${MobileLimit + 1}px)`;

const Color = {
  WHITE: '#FFFFFF',
  PRIMARY: '#556FE5',
  GRAY: '#454B6B',
  DARK_GRAY: '#161A36',
  BACKGROUND: '#070D2D',
};

const HideOverflow = `overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;`;

export {
  MobileLimit,
  TabletLimit,
  MobileQuery,
  TabletQuery,
  PcQuery,
  Color,
  HideOverflow,
};
