export function setDay(diff: number) {
  const date = new Date();
  date.setDate(date.getDate() + diff);

  return date;
}

export function setMonth(diff: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + diff);

  return date;
}

export function setYear(diff: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + diff);

  return date;
}