<?php

$connect = mysqli_connect("localhost", "root", "", "register_Ajax");

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['delete_id'])) {
    $delete_id = mysqli_real_escape_string($connect, $_POST['delete_id']);
    $query = "DELETE FROM tb_user WHERE id='$delete_id'";
    if (mysqli_query($connect, $query)) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . mysqli_error($connect);
    }
} else {
    $query = "SELECT * FROM tb_user ORDER BY id";
    $result = mysqli_query($connect, $query);

    if (mysqli_num_rows($result) > 0) {
        echo '
        <div class="table-responsive">
            <table class="table table-bordered">
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Action</th>
                </tr>
        ';
        while ($row = mysqli_fetch_array($result)) {
            echo '
            <tr>
                <td>'.$row["id"].'</td>
                <td>'.$row["name"].'</td>
                <td>'.$row["username"].'</td>
                <td><button class="btn btn-danger delete-btn" data-id="'.$row["id"].'">Delete</button></td>
            </tr>
            ';
        }
        echo '</table></div>';
    } else {
        echo '<h3 class="container alert alert-danger">No records found</h3>';
    }
}

mysqli_close($connect);

?>
