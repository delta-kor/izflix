const MobileLimit = 767;

const MobileQuery = `@media (max-width: ${MobileLimit}px)`;
const PcQuery = `@media (min-width: ${MobileLimit + 1}px)`;

const Color = {
  WHITE: '#ffffff',
};

export { MobileLimit, MobileQuery, PcQuery, Color };
