<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$db = $database->connect();

$bookmark = new Bookmark($db);

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->id) ||
    empty($data->title) ||
    empty($data->link)
) {
    http_response_code(400);
    echo json_encode(['message' => 'ID, Title and Link are required']);
    exit;
}

$bookmark->id = intval($data->id);
$bookmark->title = htmlspecialchars(strip_tags($data->title));
$bookmark->link = filter_var($data->link, FILTER_SANITIZE_URL);

if ($bookmark->update()) {
    echo json_encode(['message' => 'Bookmark updated']);
} else {
    http_response_code(503);
    echo json_encode(['message' => 'Unable to update bookmark']);
}
?>
