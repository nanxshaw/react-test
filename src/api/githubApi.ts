import axios from 'axios';

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL;

export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export interface User {
  login: string;
  id: number;
  avatar_url: string;
}

export const searchUsers = async (query: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/users?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
