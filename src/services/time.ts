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
  number = Math.round(number);
  const minutes = ((number / 60) | 0) % 60;
  const seconds = number - ((number / 60) | 0) * 60;
  const hours = (number / 60 / 60) | 0;
  const result = hours
    ? `${hours}:${padNumber(minutes)}:${padNumber(seconds)}`
    : `${minutes}:${padNumber(seconds)}`;
  return is4K ? `4K | ${result}` : result;
}

export function getHumanDuration(number: number): string {
  number = Math.round(number);

  if (number < 60) {
    return `${number}초`;
  }

  if (number < 60 * 60) {
    const minutes = (number / 60) | 0;
    const seconds = number % 60;
    return seconds === 0 ? `${minutes}분` : `${minutes}분 ${seconds}초`;
  }

  const hours = (number / 3600) | 0;
  const minutes = ((number % 3600) / 60) | 0;
  const seconds = (number % 3600) % 60 | 0;

  let result: string = '';
  result += `${hours}시간`;

  if (minutes) result += ` ${minutes}분`;
  if (seconds) result += ` ${seconds}초`;

  return result;
}

export function getMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}. ${month}.`;
}
