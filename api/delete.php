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

if (empty($data->id)) {
    http_response_code(400);
    echo json_encode(['message' => 'ID is required']);
    exit;
}

$bookmark->id = intval($data->id);

if ($bookmark->delete()) {
    echo json_encode(['message' => 'Bookmark deleted']);
} else {
    http_response_code(503);
    echo json_encode(['message' => 'Unable to delete bookmark']);
}
?>
