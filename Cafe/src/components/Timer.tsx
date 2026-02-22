import { useEffect, useRef, useState } from "react";

interface TimerState {
  startTime: number | null;
  pausedSeconds: number;
  isRunning: boolean;
}

const STORAGE_KEY = "timerState";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const getState = (): TimerState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : { startTime: null, pausedSeconds: 0, isRunning: false };
  };

  const setState = (state: TimerState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const start = () => {
    const state = getState();
    if (state.isRunning) return;

    const newState: TimerState = {
      ...state,
      startTime: Date.now() - state.pausedSeconds * 1000,
      isRunning: true,
    };

    setState(newState);
    run();
  };

  const pause = () => {
    const state = getState();
    if (!state.isRunning || !state.startTime) return;

    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);

    setState({
      startTime: null,
      pausedSeconds: elapsed,
      isRunning: false,
    });

    stop();
    setSeconds(elapsed);
  };

  const reset = () => {
    stop();
    setState({ startTime: null, pausedSeconds: 0, isRunning: false });
    setSeconds(0);
  };

  const run = () => {
    stop();
    intervalRef.current = window.setInterval(() => {
      const state = getState();
      if (!state.isRunning || !state.startTime) return;

      const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      setSeconds(elapsed);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const state = getState();
    if (state.isRunning && state.startTime) {
      run();
      const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      setSeconds(elapsed);
    } else {
      setSeconds(state.pausedSeconds);
    }

    return stop;
  }, []);

  const format = (s: number) => {
    const hrs = String(Math.floor(s / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <h1>Reading Space 🌿</h1>
      <div style={{ fontSize: 48, marginBottom: 20 }}>
        {format(seconds)}
      </div>
      <button onClick={start}>▶</button>
      <button onClick={pause} style={{ margin: "0 10px" }}>
        ⏸
      </button>
      <button onClick={reset}>⟲</button>
    </div>
  );
}
