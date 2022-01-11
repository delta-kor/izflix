const MobileLimit = 767;

const MobileQuery = `@media (max-width: ${MobileLimit}px)`;
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

export { MobileLimit, MobileQuery, PcQuery, Color, HideOverflow };
