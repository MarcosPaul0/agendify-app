export function formatTime(time: Date) {
  return time.toLocaleTimeString().replace(/:\d{2} [A-Z]+/gi, '');
}
