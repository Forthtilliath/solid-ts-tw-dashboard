const MS_PER_DAY = 24 * 60 * 60 * 1000;

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

export function daysBetween(date1: Date, date2: Date): number {
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  const daysDifference = Math.ceil(timeDifference / MS_PER_DAY);
  return daysDifference;
}
