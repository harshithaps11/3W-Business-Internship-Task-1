import React from 'react';
import { Gift } from 'lucide-react';

const RewardsButton: React.FC = () => {
  return (
    <button className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50">
      <Gift className="w-6 h-6" />
    </button>
  );
};

export default RewardsButton;