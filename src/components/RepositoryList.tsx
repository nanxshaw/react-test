import React, { useEffect, useState } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { getRepositories, Repository } from '../api/githubApi';

interface RepositoryListProps {
  username: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ username }) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      const repositories = await getRepositories(username);
      setRepos(repositories);
      setLoading(false);
    };

    fetchRepositories();
  }, [username]);

  if (loading) {
    return <div>Loading repositories...</div>;
  }

  return (
    <div>
      {repos.length === 0 ? (
        <p>No repositories found</p>
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{repo.name}</h3>
            <p>{repo.description || 'No description'}</p>
            <p className="text-gray-500">
              <StarOutlined className="inline text-yellow-500" /> {repo.stargazers_count}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RepositoryList;
