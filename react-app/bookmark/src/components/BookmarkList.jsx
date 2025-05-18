import BookmarkItem from './BookmarkItem';

export default function BookmarkList({ bookmarks, onDelete, onEdit }) {
  if (!bookmarks || !bookmarks.length) return <p className="text-gray-500">No bookmarks yet</p>;

  return (
    <ul className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
