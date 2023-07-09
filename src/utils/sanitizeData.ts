/* eslint-disable no-useless-escape */
export function sanitizeData(data: string) {
  return data.replace(/[ \-\_\.,]/g, '');
}
