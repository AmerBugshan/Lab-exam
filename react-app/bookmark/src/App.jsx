import { useState, useEffect } from 'react';
import BookmarkList from './components/BookmarkList';
import BookmarkForm from './components/BookmarkForm';
import BookmarkSearch from './components/BookmarkSearch';
import './App.css';

// API base URL
const API_BASE = 'http://localhost:8000/api';

export default function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  // <--- Add search state

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/readAll.php`);

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.message && data.message.includes('No bookmarks found')) {
        setBookmarks([]);
      } else {
        setBookmarks(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError('Could not load bookmarks. Please check your server connection.');
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookmarks by search term (case insensitive)
  const filteredBookmarks = bookmarks.filter((bm) =>
    bm.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (bookmark) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookmark),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error creating bookmark');
      }

      await fetchBookmarks();
    } catch (err) {
      setError(`Failed to create bookmark: ${err.message}`);
    }
  };

  const handleUpdate = async (bookmark) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookmark),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error updating bookmark');
      }

      setEditing(null);
      await fetchBookmarks();
    } catch (err) {
      setError(`Failed to update bookmark: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    if (!window.confirm('Are you sure you want to delete this bookmark?')) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error deleting bookmark');
      }

      await fetchBookmarks();
    } catch (err) {
      setError(`Failed to delete bookmark: ${err.message}`);
    }
  };

  const handleEdit = (bookmark) => {
    setEditing(bookmark);
  };

  return (
    <div className="app-container">
      <h1>Bookmark Manager</h1>

      {error && (
        <div className="error-box" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Search bar */}
      <BookmarkSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <BookmarkForm
        onSubmit={editing ? handleUpdate : handleCreate}
        editing={editing}
        cancelEdit={() => setEditing(null)}
      />

      {loading ? (
        <div className="loading-text">Loading bookmarks...</div>
      ) : (
        <BookmarkList
          bookmarks={filteredBookmarks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
