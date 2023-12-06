export default function getMemberColor(member: string): string {
  switch (member) {
    case 'eunbi':
      return '#BBB0DC';
    case 'sakura':
      return '#F1D2E7';
    case 'hyewon':
      return '#DB706C';
    case 'yena':
      return '#FCF695';
    case 'chaeyeon':
      return '#A7E0E1';
    case 'chaewon':
      return '#CEE5D5';
    case 'minju':
      return '#F2F2F2';
    case 'nako':
      return '#B7D3E9';
    case 'hitomi':
      return '#F1C3AA';
    case 'yuri':
      return '#F3AA51';
    case 'yujin':
      return '#567ACE';
    case 'wonyoung':
      return '#D9598C';
    case 'izone':
    default:
      return '#E94F97';
  }
}
