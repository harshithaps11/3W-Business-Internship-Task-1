import React, { useEffect, useState } from 'react';
import { historyAPI } from '../services/api';

interface ClaimHistoryProps {
  refreshKey: number;
}

const ClaimHistory: React.FC<ClaimHistoryProps> = ({ refreshKey }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [refreshKey]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await historyAPI.getHistory(1, 20);
      setHistory(response.data.history);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Claim History</h3>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="text-center text-gray-500">No claim history yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-purple-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {history.map((item: any) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <img src={item.userId.avatarUrl} alt={item.userId.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-medium text-gray-800">{item.userId.name}</span>
                  </td>
                  <td className="px-4 py-2 font-bold text-purple-700">+{item.pointsClaimed}</td>
                  <td className="px-4 py-2 text-gray-500 text-sm">{new Date(item.claimedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClaimHistory; 