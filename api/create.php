<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Headers

header('Content-Type: application/json');


include_once '../db/Database.php';
include_once '../models/Bookmark.php';

// Instantiate a Database object & connect
$database = new Database();
$dbConnection = $database->connect();

// Instantiate Bookmark object
$bookmark = new Bookmark($dbConnection);

// Get the HTTP POST request JSON body
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['title']) || !isset($data['link'])) {
    http_response_code(422);
    echo json_encode([
        'message' => 'Error: Missing required parameters title or link in the JSON body.'
    ]);
    return;
}

// Set properties
$bookmark->title = $data['title'];
$bookmark->link = $data['link'];
$bookmark->date_added = date('Y-m-d H:i:s');

// Create Bookmark
if ($bookmark->create()) {
    echo json_encode(['message' => 'Bookmark was created']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Error: Bookmark was not created']);
}
