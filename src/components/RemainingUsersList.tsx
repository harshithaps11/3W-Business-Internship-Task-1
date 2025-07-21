import React from 'react';
import { Trophy, Medal } from 'lucide-react';

interface RemainingUsersListProps {
  users: any[];
}

const RemainingUsersList: React.FC<RemainingUsersListProps> = ({ users }) => {
  const maskPoints = (points: number) => {
    const pointsStr = points.toString();
    if (pointsStr.length <= 2) return pointsStr;
    const first = pointsStr[0];
    const last = pointsStr[pointsStr.length - 1];
    const middle = '*'.repeat(Math.max(pointsStr.length - 2, 1));
    return `${first}${middle}${last}`;
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 10) {
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    }
    return <Medal className="w-5 h-5 text-gray-400" />;
  };

  const getRankBadgeClasses = (rank: number) => {
    if (rank <= 5) {
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
    } else if (rank <= 10) {
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
    }
    return "bg-gray-200 text-gray-700";
  };

  if (users.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Other Players
        </h3>
        <div className="text-center text-gray-500 py-8">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No other players yet!</p>
          <p className="text-sm">Be the first to join the competition.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <span>Leaderboard</span>
      </h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {/* Rank Badge */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${getRankBadgeClasses(user.rank)} shadow-lg`}>
              #{user.rank}
            </div>
            
            {/* Rank Icon */}
            <div className="flex-shrink-0">
              {getRankIcon(user.rank)}
            </div>
            
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 truncate">
                {user.name}
              </h4>
              <p className="text-sm text-gray-600">
                Rank #{user.rank}
              </p>
            </div>
            
            {/* Masked Points */}
            <div className="flex-shrink-0 text-right">
              <div className="bg-purple-100 px-3 py-1 rounded-full">
                <span className="font-bold text-purple-700 text-lg">
                  {maskPoints(user.totalPoints)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemainingUsersList;