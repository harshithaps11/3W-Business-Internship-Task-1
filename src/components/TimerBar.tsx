import React, { useState, useEffect } from 'react';
import { Clock, RotateCcw } from 'lucide-react';

const TimerBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reset timer
          return 24 * 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const totalSeconds = 24 * 60 * 60;
    const progressPercent = (timeLeft / totalSeconds) * 100;
    setProgress(progressPercent);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <RotateCcw className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-gray-800">Daily Reset</span>
        </div>
        <div className="flex items-center space-x-2 text-purple-600">
          <Clock className="w-5 h-5" />
          <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-600 mt-2 text-center">
        Leaderboard resets in {Math.ceil(timeLeft / 3600)} hours
      </p>
    </div>
  );
};

export default TimerBar;