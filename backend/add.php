<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$title = $data["title"];
$year = $data["year"];
$poster = $data["poster"];
$imdbID = $data["imdbID"];
$rating = $data["rating"] ?? null;
$notes = $data["notes"] ?? "";

$sql = "SELECT * FROM favorites WHERE imdbID='$imdbID'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Movie already in favorites";
} else {
    $sql = "INSERT INTO favorites (title, year, poster, imdbID, rating, notes)
            VALUES ('$title', '$year', '$poster', '$imdbID', '$rating', '$notes')";

    if ($conn->query($sql) === TRUE) {
        echo "Added successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}