import React, { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import RepositoryList from './components/RepositoryList';
import { User, searchUsers } from './api/githubApi';
import { Button, Input } from 'antd';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = async () => {
    setLoading(true);
    const users = await searchUsers(searchQuery);
    setUserList(users);
    setLoading(false);
  };

  const handleUserSelect = (username: string) => {
    if (selectedUser === username) {
      setSelectedUser(null);
    } else {
      setSelectedUser(username);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full space-y-6">
        <h1 className="text-4xl text-center font-semibold text-gray-800 mb-4">GitHub Repositories Explorer</h1>
        <div className="flex justify-center space-x-2">
          <Input
            type="text"
            placeholder="Enter username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-1/3"
          />
          <Button
            onClick={handleSearch}
            type="primary"
            className="ml-2"
          >
            Search
          </Button>
        </div>
        {loading && <div className="text-center">Loading...</div>}
        {userList.length > 0 && (
          <ul className="space-y-2">
            {userList.map((user) => (
              <li key={user.id}>
                <div className="group">
                  <Button
                    onClick={() => handleUserSelect(user.login)}
                    className="w-full text-left p-2 bg-gray-200 p-4 py-6 hover:bg-gray-300 rounded-lg transition duration-300 flex justify-between items-center"
                    type="default"
                    icon={selectedUser === user.login ? <UpOutlined /> : <DownOutlined />}
                  >
                    <span className="flex-1 text-left">{user.login}</span>
                  </Button>
                  {selectedUser === user.login && (
                    <div className="mt-2 space-y-2">
                      <RepositoryList username={user.login} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
