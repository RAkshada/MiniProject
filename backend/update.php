<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$imdbID = $data["imdbID"];
$rating = $data["rating"];
$notes = $data["notes"];

$sql = "UPDATE favorites 
        SET rating='$rating', notes='$notes' 
        WHERE imdbID='$imdbID'";

if ($conn->query($sql) === TRUE) {
    echo "Updated successfully";
} else {
    echo "Error: " . $conn->error;
}
?>