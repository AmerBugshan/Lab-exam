import { useState, useEffect } from 'react';

export default function BookmarkForm({ onSubmit, editing, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setLink(editing.link);
    } else {
      setTitle('');
      setLink('');
    }
    setError('');
  }, [editing]);

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!link.trim()) {
      setError('Link is required');
      return false;
    }

    try {
      new URL(link);
    } catch (e) {
      setError('Please enter a valid URL (including http:// or https://)');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookmark = editing
      ? { id: editing.id, title, link }
      : { title, link };

    onSubmit(bookmark);
    if (!editing) {
      setTitle('');
      setLink('');
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="mb-4 text-lg font-semibold">{editing ? 'Edit Bookmark' : 'Add Bookmark'}</h2>

      {error && <div className="p-2 mb-3 text-red-700 bg-red-100 rounded">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter website title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-medium">URL</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        <div className="flex">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            {editing ? 'Update' : 'Add'} Bookmark
          </button>

          {editing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 ml-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
