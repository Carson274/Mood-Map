export interface Mood {
  mood: number;
  description: string;
  timestamp: Date;
}

export interface Quote {
  quote: string;
  author: string;
  timestamp: Date;
}

export interface CustomDate {
  weekday: String;
  month: String;
  day: Number;
  suffix: String;
  year: Number;
  time: String;
}