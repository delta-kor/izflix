function getDate(number: number) {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  return `${year}년 ${month}월 ${dayOfMonth}일`;
}

export default getDate;
