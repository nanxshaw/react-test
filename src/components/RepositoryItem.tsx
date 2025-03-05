import React from 'react';
import { Repository } from '../api/githubApi';

interface RepositoryItemProps {
  repo: Repository;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo }) => {
  return (
    <div className="p-5 border border-gray-300 rounded-lg shadow-sm hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium text-gray-800">{repo.name}</div>
        <div className="text-sm text-gray-500">{repo.stargazers_count} ⭐</div>
      </div>
      <p className="text-gray-600 mt-2">{repo.description || 'No description available.'}</p>
    </div>
  );
};

export default RepositoryItem;
