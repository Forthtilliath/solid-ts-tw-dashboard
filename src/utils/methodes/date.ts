export function setDay(diff: number) {
  const date = new Date();
  date.setDate(date.getDate() + diff);

  return date;
}

export function setYear(diff: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + diff);

  return date;
}