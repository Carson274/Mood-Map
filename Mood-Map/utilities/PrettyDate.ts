const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];
const suffixes = ["st", "nd", "rd", "th"]

export function PrettyDate(date: Date): string {
  const month = date.getMonth();
  const day = date.getDate();
  const suffix = suffixes[day] || suffixes[3];
  return `${months[month]} ${day}${suffix}`;
}