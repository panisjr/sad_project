<?php
// Replace with your database connection details
$servername = "localhost";
$username = "root";
$password = "";
$database = "webdev";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the insertion of a new branch
if (isset($_POST['submit'])) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);

    $sql = "INSERT INTO customers (name,address) VALUES ('$name','$address')";

    $query_run = mysqli_query($conn, $sql);
    if ($query_run) {
        $_SESSION['message'] = "Student Created Successfully";
        header("Location: customers.php");
        exit(0);
    } else {
        $_SESSION['message'] = "Student Not Created";
        header("Location: customers.php");
        exit(0);
    }
}
