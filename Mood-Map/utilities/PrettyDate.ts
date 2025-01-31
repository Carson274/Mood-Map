import { CustomDate } from '../types';

const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];
const suffixes = ["st", "nd", "rd", "th"]

export function PrettyDate(date: Date): CustomDate {
  const customDate: CustomDate = {
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    month: months[date.getMonth()],
    day: date.getDate(),
    suffix: suffixes[date.getDate() - 1] || suffixes[3],
    year: date.getFullYear(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
  }

  return customDate;
}