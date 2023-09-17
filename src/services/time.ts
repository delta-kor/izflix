export function getDate(number: number, language: string): string {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  switch (language) {
    case 'en':
      return `${month}/${dayOfMonth}/${year}`;
    case 'ko':
      return `${year}년 ${month}월 ${dayOfMonth}일`;
    case 'dot':
      return `${year}. ${month}. ${dayOfMonth}.`;
    default:
      return `${month}/${dayOfMonth}/${year}`;
  }
}

function padNumber(number: number): string {
  return number.toString().padStart(2, '0');
}

export function getDuration(number: number, properties: VideoProperty[] = []): string {
  number = Math.round(number);
  const minutes = ((number / 60) | 0) % 60;
  const seconds = number - ((number / 60) | 0) * 60;
  const hours = (number / 60 / 60) | 0;

  let result = hours
    ? `${hours}:${padNumber(minutes)}:${padNumber(seconds)}`
    : `${minutes}:${padNumber(seconds)}`;
  properties.includes('4k') && (result = '4K | ' + result);
  properties.includes('cc') && (result = 'CC | ' + result);

  return result;
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

export function dateToKey(date: Date): string {
  const year = date.getFullYear().toString().slice(2, 4);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}
