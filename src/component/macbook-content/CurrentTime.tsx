import { useEffect, useState, useMemo } from "react";

const CurrentTime: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // 1 min

    return () => clearInterval(intervalId);
  }, []);

  const currentTime = useMemo(() => {
    const dayString: Array<string> = ['일','월','화','수','목','금','토'];
    const dateString = `${time.getMonth()+1}월 ${time.getDate()}일 (${dayString[time.getDay()]})`;
    const timeString = `${(time.getHours() < 12) ? '오전' : '오후'} 
    ${(time.getHours() <= 12) ? time.getHours() : time.getHours() - 12}:${time.getMinutes().toString().padStart(2, '0')}`
    return `${dateString} ${timeString}`
  }, [time]);
  
  return (
    <div className="macbook-time">{currentTime}</div>
  )
}

export default CurrentTime;