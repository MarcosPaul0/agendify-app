export function formatTimeDisplay(time: Date) {
  return Intl.DateTimeFormat('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'UTC',
  }).format(time);
}
