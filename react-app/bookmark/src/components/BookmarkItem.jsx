export default function BookmarkItem({ bookmark, onDelete, onEdit }) {
  return (
    <li className="bookmark-item">
      <a
        href={bookmark.link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:text-blue-800 break-all"
      >
        {bookmark.title}
      </a>
      <div>
        <button
          onClick={() => onEdit(bookmark)}
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 edit-btn"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(bookmark.id)}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 delete-btn"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
