export function sanitizeData(data: string) {
  return data.replace(/ -_.,/g, '');
}
