<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$db = $database->connect();

$bookmark = new Bookmark($db);

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid ID']);
    exit;
}

$bookmark->id = $id;
$bookmark->readOne();

if ($bookmark->title != null) {
    echo json_encode([
        'id' => $bookmark->id,
        'title' => $bookmark->title,
        'link' => $bookmark->link,
        'date_added' => $bookmark->date_added,
    ]);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Bookmark not found']);
}
?>
