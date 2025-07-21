import React from 'react';
import { Crown, Star, Award } from 'lucide-react';

interface TopThreeWinnersProps {
  winners: any[];
}

const TopThreeWinners: React.FC<TopThreeWinnersProps> = ({ winners }) => {
  const maskPoints = (points: number) => {
    const pointsStr = points.toString();
    if (pointsStr.length <= 2) return pointsStr;
    const first = pointsStr[0];
    const last = pointsStr[pointsStr.length - 1];
    const middle = '*'.repeat(Math.max(pointsStr.length - 2, 1));
    return `${first}${middle}${last}`;
  };

  const getCrownIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />;
      case 2:
        return <Award className="w-7 h-7 text-gray-400 drop-shadow-lg" />;
      case 3:
        return <Star className="w-6 h-6 text-amber-600 drop-shadow-lg" />;
      default:
        return null;
    }
  };

  const getCardClasses = (rank: number) => {
    const baseClasses = "relative p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 transform";
    switch (rank) {
      case 1:
        return `${baseClasses} bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 border-4 border-yellow-500 animate-pulse`;
      case 2:
        return `${baseClasses} bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border-4 border-gray-500`;
      case 3:
        return `${baseClasses} bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 border-4 border-amber-500`;
      default:
        return `${baseClasses} bg-white`;
    }
  };

  const getWingsEffect = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="absolute -top-2 -left-2 -right-2 h-16 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 rounded-t-2xl opacity-30 animate-pulse" />
      );
    }
    return null;
  };

  if (winners.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((rank) => (
          <div key={rank} className="relative p-6 rounded-2xl bg-white/50 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[1, 2, 3].map((rank) => {
        const winner = winners.find(w => w.rank === rank);
        
        if (!winner) {
          return (
            <div key={rank} className="relative p-6 rounded-2xl bg-white/50 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {getCrownIcon(rank)}
                </div>
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                <p className="text-gray-500 font-medium">#{rank} Position</p>
                <p className="text-gray-400 text-sm">No player yet</p>
              </div>
            </div>
          );
        }

        return (
          <div key={winner._id} className={getCardClasses(rank)}>
            {getWingsEffect(rank)}
            
            <div className="relative z-10 text-center">
              {/* Crown/Award Icon */}
              <div className="flex justify-center mb-2">
                {getCrownIcon(rank)}
              </div>
              
              {/* Rank Badge */}
              <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                #{rank}
              </div>
              
              {/* Avatar */}
              <div className="relative mb-4">
                <img
                  src={winner.avatarUrl}
                  alt={winner.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                />
                {rank === 1 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-800" />
                  </div>
                )}
              </div>
              
              {/* Name */}
              <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
                {winner.name}
              </h3>
              
              {/* Masked Points */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-inner">
                <p className="text-2xl font-bold text-purple-700">
                  {maskPoints(winner.totalPoints)}
                </p>
                <p className="text-sm text-gray-600">points</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopThreeWinners;