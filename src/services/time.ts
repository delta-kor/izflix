export function getDate(number: number): string {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  return `${year}년 ${month}월 ${dayOfMonth}일`;
}

function padNumber(number: number): string {
  return number.toString().padStart(2, '0');
}

export function getDuration(number: number, is4K: boolean = false): string {
  const minutes = ((number / 60) | 0) % 60;
  const seconds = number - ((number / 60) | 0) * 60;
  const hours = (number / 60 / 60) | 0;
  const result = hours
    ? `${hours}:${padNumber(minutes)}:${padNumber(seconds)}`
    : `${minutes}:${padNumber(seconds)}`;
  return is4K ? `4K | ${result}` : result;
}
