const MobileLimit = 767;

const MobileQuery = `@media (max-width: ${MobileLimit}px)`;
const PcQuery = `@media (min-width: ${MobileLimit + 1}px)`;

const Color = {
  WHITE: '#ffffff',
};

const HideOverflow = `overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;`;

export { MobileLimit, MobileQuery, PcQuery, Color, HideOverflow };
