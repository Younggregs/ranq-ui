"use client";
import * as React from "react";
import { Grid } from "../lib/mui"
import timeRemaining from "../lib/time-remaining";
import { TimeLeft } from "../lib/interfaces";

export default function Countdown ({createdAt, duration, durationS}: {createdAt: Date, duration: string, durationS: number}) {
    const endDate = new Date(createdAt);
    endDate.setSeconds(endDate.getSeconds() + durationS);
    const [timeLeft, setTimeLeft] = React.useState(timeRemaining(endDate));
    
    timeLeft as TimeLeft;

    React.useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(timeRemaining(endDate));
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents: any = [];
    
    Object.keys(timeLeft as TimeLeft).forEach((interval: any) => {
        timerComponents.push(
            <span>
            {!timeLeft[interval as keyof TimeLeft]? (
                0
            ): (
                timeLeft[interval as keyof TimeLeft]
            )}
            </span>
        );
    });

    return (
        <Grid>
            <div>
                {timerComponents.length  ? timerComponents :
                    window.location.reload()
                }
            </div>
        </Grid>
        )

}