<?php
class Bookmark
{
    private $conn;
    public $id;
    public $title;
    public $link;
    public $date_added;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readAll()
    {
        $query = "SELECT * FROM bookmarks ORDER BY date_added DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne()
    {
        $query = "SELECT * FROM bookmarks WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->title = $row['title'];
            $this->link = $row['link'];
            $this->date_added = $row['date_added'];
        }
    }

    public function create()
    {
        $query = "INSERT INTO bookmarks SET title=:title, link=:link, date_added=:date_added";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':date_added', $this->date_added);
        return $stmt->execute();
    }

    public function update()
    {
        $query = "UPDATE bookmarks SET title = :title, link = :link WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':id', $this->id);
        return $stmt->execute();
    }

    public function delete()
    {
        $query = "DELETE FROM bookmarks WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        return $stmt->execute();
    }
}
?>
