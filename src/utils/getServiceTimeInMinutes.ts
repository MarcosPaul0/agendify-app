export function getServiceTimeInMinutes(duration: string) {
  const values = duration.split(':');

  return Number(values[0]) * 60 + Number(values[1]);
}
