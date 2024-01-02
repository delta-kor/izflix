export function getMemberColor(member: string): string {
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

export function getMemberName(member: string): string {
  switch (member) {
    case 'eunbi':
      return '은비';
    case 'sakura':
      return '사쿠라';
    case 'hyewon':
      return '혜원';
    case 'yena':
      return '예나';
    case 'chaeyeon':
      return '채연';
    case 'chaewon':
      return '채원';
    case 'minju':
      return '민주';
    case 'nako':
      return '나코';
    case 'hitomi':
      return '히토미';
    case 'yuri':
      return '유리';
    case 'yujin':
      return '유진';
    case 'wonyoung':
      return '원영';
    case 'izone':
    default:
      return '';
  }
}

export const MemberList = [
  'eunbi',
  'sakura',
  'hyewon',
  'yena',
  'chaeyeon',
  'chaewon',
  'minju',
  'nako',
  'hitomi',
  'yuri',
  'yujin',
  'wonyoung',
];
