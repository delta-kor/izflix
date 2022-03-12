export function getDate(number: number): string {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  return `${year}년 ${month}월 ${dayOfMonth}일`;
}

export function getDuration(number: number, is4K: boolean = false): string {
  const minutes = (number / 60) | 0;
  const seconds = number - minutes * 60;
  const result = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return is4K ? `4K | ${result}` : result;
}
