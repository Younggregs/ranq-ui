import { TimeLeft } from "./interfaces";

const timeRemaining = (endDate: Date) => {
    let difference = +endDate - +new Date();

    let timeLeft: TimeLeft = {
      days: "",
      hours: "",
      minutes: "",
      seconds: ""
    };
  
    if (difference > 0) {
      timeLeft = {
        days: `${Math.floor(difference / (1000 * 60 * 60 * 24))}d.`,
        hours: `${Math.floor((difference / (1000 * 60 * 60)) % 24)}h.`,
        minutes: `${Math.floor((difference / 1000 / 60) % 60)}m.`,
        seconds: `${Math.floor((difference / 1000) % 60)}s.`,
      };
    }
  
    return timeLeft;
  }

  export default timeRemaining;