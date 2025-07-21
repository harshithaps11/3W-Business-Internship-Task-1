import React from 'react';
import { Calendar, CalendarDays } from 'lucide-react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'monthly', label: 'Monthly', icon: CalendarDays },
  ];

  return (
    <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;