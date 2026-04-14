<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$imdbID = $data["imdbID"];

$sql = "DELETE FROM favorites WHERE imdbID='$imdbID'";

if ($conn->query($sql) === TRUE) {
    echo "Deleted successfully";
} else {
    echo "Error: " . $conn->error;
}
?>