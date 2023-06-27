import { TimeLeft } from "./interfaces";

const timeRemaining = (endDate: Date) => {
    let difference = +endDate - +new Date();

    let timeLeft: TimeLeft = {
      days: "",
      hours: "",
      minutes: "",
      seconds: 0
    };
  
    if (difference > 0) {
      timeLeft = {
        days: `${Math.floor(difference / (1000 * 60 * 60 * 24))}:`,
        hours: `${Math.floor((difference / (1000 * 60 * 60)) % 24)}:`,
        minutes: `${Math.floor((difference / 1000 / 60) % 60)}:`,
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
  
    return timeLeft;
  }

  export default timeRemaining;