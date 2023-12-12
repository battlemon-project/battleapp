import { PropsWithChildren, useEffect, useState } from "react";

function pad(num: number, totalLength: number) {
  return String(num).padStart(totalLength, '0');
}

const Timer = ({ deadline }: PropsWithChildren<{ deadline: string }>) => {
  const countdown = Date.parse(deadline) - Date.now();
  const [days, setDays] = useState(Math.floor(countdown / (1000 * 60 * 60 * 24)));
  const [hours, setHours] = useState(Math.floor((countdown / (1000 * 60 * 60)) % 24));
  const [minutes, setMinutes] = useState(Math.floor((countdown / 1000 / 60) % 60));
  const [seconds, setSeconds] = useState(Math.floor((countdown / 1000) % 60));

  const getTime = (dl: string) => {
    const time = Date.parse(dl) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setInterval(() => getTime(deadline), 1000);
  }, []);

  return (
    <>
      {pad((days*24)+hours, 2)}:{pad(minutes, 2)}:{pad(seconds, 2)}
    </>
  );
};

export default Timer;