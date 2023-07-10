export function formatTime(time: Date) {
  return Intl.DateTimeFormat('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(time);
}
