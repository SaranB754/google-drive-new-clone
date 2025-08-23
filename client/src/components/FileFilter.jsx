import React from 'react';

export default function FileFilter({ search, setSearch }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="your file names"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-300 rounded-l px-3 py-2"
      />
      <button className="bg-gray-900 text-white px-4 py-2 rounded-r">
        Search
      </button>
    </div>
  );
}
