export function compareDays(firstDate: Date, secondDate: Date) {
  if (
    firstDate.getDate() === secondDate.getDate() &&
    firstDate.getMonth() === secondDate.getMonth()
  ) {
    return true;
  }

  return false;
}
