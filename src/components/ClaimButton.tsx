import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { userAPI } from '../services/api';

interface ClaimButtonProps {
  selectedUser: any;
  onPointsClaimed: () => void;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ selectedUser, onPointsClaimed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClaim = async () => {
    if (!selectedUser) {
      alert('Please select a player first!');
      return;
    }

    setIsLoading(true);
    setIsAnimating(true);

    try {
      const response = await userAPI.claimPoints(selectedUser._id);
      
      // Show success message with points earned
      setTimeout(() => {
        alert(response.data.message);
        onPointsClaimed();
        setIsAnimating(false);
      }, 1000);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error claiming points');
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClaim}
      disabled={!selectedUser || isLoading}
      className={`
        relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
        text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl
        transition-all duration-300 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${isAnimating ? 'animate-pulse scale-105' : ''}
        overflow-hidden
      `}
    >
      <div className="flex items-center justify-center space-x-3">
        {isLoading ? (
          <>
            <Sparkles className="w-6 h-6 animate-spin" />
            <span>Claiming...</span>
          </>
        ) : (
          <>
            <Gift className="w-6 h-6" />
            <span>Claim Daily Reward</span>
          </>
        )}
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
};

export default ClaimButton;