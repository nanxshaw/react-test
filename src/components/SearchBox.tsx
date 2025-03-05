import React from 'react';

interface SearchBoxProps {
  query: string;
  onSearch: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ query, onSearch, onChange, onKeyPress }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Enter username"
        value={query}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className="p-2 rounded-md border border-gray-300"
      />
      <button
        onClick={onSearch}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
