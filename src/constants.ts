const KoreanConstant = {
  NOT_FOUND: '페이지를 찾을 수 없어요',
};

function GetConstant(key: ConstantKey): string {
  return KoreanConstant[key];
}

export type ConstantKey = keyof typeof KoreanConstant;
export default GetConstant;
