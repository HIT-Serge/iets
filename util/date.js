export function getFormattedDate(dateString) {
  // // console.log('formatDate', dateString)
  if (!dateString) {
    return '';
  }
  let date = new Date(dateString);
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
