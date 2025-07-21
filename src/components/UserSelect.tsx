import React, { useState, useEffect } from 'react';
import { User, Plus, UserPlus, Trash2 } from 'lucide-react';
import { userAPI } from '../services/api';

interface UserSelectProps {
  selectedUser: any;
  onUserSelect: (user: any) => void;
  onUserAdded: () => void;
  onUserDeleted: () => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ selectedUser, onUserSelect, onUserAdded, onUserDeleted }) => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    setIsLoading(true);
    try {
      const response = await userAPI.addUser({ name: newUserName.trim() });
      setUsers([...users, response.data]);
      setNewUserName('');
      setShowAddForm(false);
      setIsOpen(false);
      onUserAdded();
      alert(`User "${response.data.name}" added successfully!`);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error adding user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userAPI.deleteUser(userId);
        setUsers(users.filter((user: any) => user._id !== userId));
        onUserDeleted();
        alert('User deleted successfully!');
      } catch (error: any) {
        alert(error.response?.data?.error || 'Error deleting user');
      }
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-purple-300 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <div className="flex items-center space-x-3">
          {selectedUser ? (
            <>
              <img
                src={selectedUser.avatarUrl}
                alt={selectedUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium text-gray-800">{selectedUser.name}</span>
            </>
          ) : (
            <>
              <User className="w-8 h-8 text-purple-500" />
              <span className="text-gray-600">Select a player</span>
            </>
          )}
        </div>
        <div className="text-purple-500 transform transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl border-2 border-purple-200 shadow-2xl z-50 max-h-64 overflow-y-auto">
          <div className="p-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-purple-50 rounded-lg transition-colors duration-200 text-purple-600 font-medium"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add New Player</span>
            </button>
            
            {showAddForm && (
              <form onSubmit={handleAddUser} className="mt-2 p-3 bg-purple-50 rounded-lg">
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter player name"
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  autoFocus
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading || !newUserName.trim()}
                    className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 text-sm"
                  >
                    {isLoading ? 'Adding...' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            
            {/* Search input */}
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search player name..."
              className="w-full mt-2 mb-2 px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            
            <div className="border-t border-purple-200 mt-2 pt-2">
              {filteredUsers.map((user: any) => (
                <div key={user._id} className="flex items-center space-x-3 px-3 py-2 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                  <button
                    onClick={() => {
                      onUserSelect(user);
                      setIsOpen(false);
                    }}
                    className="flex-grow flex items-center space-x-3 text-left"
                  >
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-800 font-medium">{user.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">{user.totalPoints} pts</span>
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)} className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="text-center text-gray-400 py-2">No users found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelect;