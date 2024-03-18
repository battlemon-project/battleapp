import { PropsWithChildren, useEffect, useState } from "react";

function pad(num: number, totalLength: number) {
  return String(num).padStart(totalLength, '0');
}

const Timer = ({ deadline, onFinished, isDays }: PropsWithChildren<{ deadline: string | number, isDays?: boolean, onFinished: () => any }>) => {
  const countdown = typeof deadline == 'number' ? deadline - Date.now() : Date.parse(deadline) - Date.now();
  const [finished, setFinished] = useState(false);
  const [days, setDays] = useState(Math.floor(countdown / (1000 * 60 * 60 * 24)));
  const [hours, setHours] = useState(Math.floor((countdown / (1000 * 60 * 60)) % 24));
  const [minutes, setMinutes] = useState(Math.floor((countdown / 1000 / 60) % 60));
  const [seconds, setSeconds] = useState(Math.floor((countdown / 1000) % 60));

  const getTime = (dl: string | number) => {
    const time = typeof dl == 'number' ? dl - Date.now() : Date.parse(dl) - Date.now();
    if (time < 0) {
      setFinished(true)
      return
    }
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    if (finished) {
      onFinished()
      return;
    }
    const interval = setInterval(() => getTime(deadline), 1000);
    
    return () => {
      clearInterval(interval)
    }
  }, [finished]);

  return (
    <>{isDays ? <>
      {days} days {pad(hours, 2)}h {pad(minutes, 2)}m {pad(seconds, 2)}s
     </> : <>
      {pad((days*24)+hours, 2)}:{pad(minutes, 2)}:{pad(seconds, 2)}
    </>}</>
  );
};

export default Timer;