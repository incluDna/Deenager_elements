// elapsed = now - startTime
//เก็บเวลา ณ ตอนนั้นเอา แล้วมาลบ เพื่อโชว์เวลาเป็นชม:นาที:วิ

const startTimer = () => {
  const startTime = Date.now();
  localStorage.setItem("startTime", startTime);
};

const getElapsedTime = () => {
  const startTime = localStorage.getItem("startTime");
  if (!startTime) return 0;
  return Math.floor((Date.now() - startTime) / 1000);
};
