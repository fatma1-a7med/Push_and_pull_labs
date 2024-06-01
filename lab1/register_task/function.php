<?php
session_start();
$conn = mysqli_connect("localhost", "root", "", "register_Ajax");


if(isset($_POST["action"])){
  if($_POST["action"] == "register"){
    register();
  }
}

function register(){
  global $conn;

  $name = $_POST["name"];
  $username = $_POST["username"];
  $password = $_POST["password"];

  if(empty($name) || empty($username) || empty($password)){
    echo "Please Fill Out The Form!";
    exit;
  }

  $user = mysqli_query($conn, "SELECT * FROM tb_user WHERE username = '$username'");
  if(mysqli_num_rows($user) > 0){
    echo "Username Has Already Taken";
    exit;
  }

  $query = "INSERT INTO tb_user VALUES('', '$name', '$username', '$password')";
  mysqli_query($conn, $query);
  echo "User added to databse Successfully, check your database";
}

