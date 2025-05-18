import React from 'react';

export default function BookmarkSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="bookmark-search">
      <label htmlFor="search">Search Bookmarks</label>
      <input
        id="search"
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
