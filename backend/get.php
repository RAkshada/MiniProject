<?php
include "db.php";

$sql = "SELECT * FROM favorites";
$result = $conn->query($sql);

$movies = [];

while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
?>