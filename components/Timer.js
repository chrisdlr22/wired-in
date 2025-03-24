import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(25 * 60); // Default: 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      alert("Time's up! 🎉"); // Alert when timer ends
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center bg-red-500 text-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Custom Timer</h2>
      <div className="text-5xl font-bold mb-4">{formatTime(time)}</div>
      
      <div className="flex gap-4 mb-4">
        <button 
          className="bg-gray-200 text-black px-3 py-1 rounded"
          onClick={() => setTime((prev) => Math.min(prev + 300, 120 * 60))}
        >
          +5 min
        </button>
        <button 
          className="bg-gray-200 text-black px-3 py-1 rounded"
          onClick={() => setTime((prev) => Math.max(prev - 300, 300))}
        >
          -5 min
        </button>
      </div>

      <div className="flex gap-4">
        <button 
          className="bg-white text-red-500 px-6 py-2 rounded"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button 
          className="bg-gray-300 text-black px-6 py-2 rounded"
          onClick={() => { setIsRunning(false); setTime(25 * 60); }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}