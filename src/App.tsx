import React, { useState, useEffect } from 'react';
import UserSelect from './components/UserSelect';
import ClaimButton from './components/ClaimButton';
import TopThreeWinners from './components/TopThreeWinners';
import RemainingUsersList from './components/RemainingUsersList';
import TimerBar from './components/TimerBar';
import Tabs from './components/Tabs';
import RewardsButton from './components/RewardsButton';
import ClaimHistory from './components/ClaimHistory';
import { leaderboardAPI } from './services/api';
import { Trophy, Sparkles } from 'lucide-react';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const response = await leaderboardAPI.getLeaderboard();
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
  };

  const handlePointsClaimed = () => {
    fetchLeaderboard();
    setHistoryRefreshKey((k) => k + 1);
    // Update selected user's points if needed
    if (selectedUser) {
      const updatedUser = leaderboard.find((user: any) => user._id === selectedUser._id);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  };

  const handleUserAdded = () => {
    fetchLeaderboard();
  };

  const handleUserDeleted = () => {
    fetchLeaderboard();
    setHistoryRefreshKey((k) => k + 1);
    setSelectedUser(null); // Clear selected user
  };

  const topThree = leaderboard.filter((user: any) => user.rank <= 3);
  const remainingUsers = leaderboard.filter((user: any) => user.rank > 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <RewardsButton />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600 text-lg">
            Compete with players and climb to the top!
          </p>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Timer */}
        <TimerBar />

        {/* User Selection and Claim */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <UserSelect
            selectedUser={selectedUser}
            onUserSelect={handleUserSelect}
            onUserAdded={handleUserAdded}
            onUserDeleted={handleUserDeleted}
          />
          <ClaimButton
            selectedUser={selectedUser}
            onPointsClaimed={handlePointsClaimed}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        ) : (
          <>
            {/* Top Three Winners */}
            <TopThreeWinners winners={topThree} />

            {/* Remaining Users List */}
            <RemainingUsersList users={remainingUsers} />

            {/* Claim History */}
            <ClaimHistory refreshKey={historyRefreshKey} />
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>🏆 Keep playing to reach the top! 🏆</p>
        </div>
      </div>
    </div>
  );
}

export default App;