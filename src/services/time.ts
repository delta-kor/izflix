export function getDate(number: number): string {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  return `${year}년 ${month}월 ${dayOfMonth}일`;
}

export function getDuration(number: number): string {
  const minutes = (number / 60) | 0;
  const seconds = number - minutes * 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
