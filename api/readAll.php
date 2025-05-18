<?php
// Allow only GET method
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Headers for CORS and JSON response


include_once '../db/Database.php';
include_once '../models/Bookmark.php';

// Database connection
$database = new Database();
$db = $database->connect();

// Instantiate Bookmark model
$bookmark = new Bookmark($db);

// Fetch bookmarks
$result = $bookmark->readAll();
$num = $result->rowCount();


if ($num > 0) {
    $bookmarks_arr = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $bookmark_item = [
            'id' => $id,
            'title' => $title,
            'link' => $link,
            'date_added' => $date_added,
        ];
        $bookmarks_arr[] = $bookmark_item;
    }
    echo json_encode($bookmarks_arr);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'No bookmarks found']);
}
?>
