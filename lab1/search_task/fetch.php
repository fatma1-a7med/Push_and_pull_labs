<?php

$connect = mysqli_connect("localhost", "root", "", "register_Ajax");

$output = '';
if(isset($_POST["query"]))
{
 $search = mysqli_real_escape_string($connect, $_POST["query"]);
 $query = "
  SELECT * FROM tb_user
  WHERE name LIKE '%".$search."%'
  OR username LIKE '%".$search."%' 
 ";
}
else
{
 $query = "
  SELECT * FROM tb_user ORDER BY id
 ";
}
$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0)
{
 $output .= '
  <div class="table-responsive">
   <table class="table table-bordered">
    <tr>
     <th>User id</th>
     <th>Full name</th>
     <th>Username</th>
     
    </tr>
 ';
 while($row = mysqli_fetch_array($result))
 {
  $output .= '
   <tr>
    <td>'.$row["id"].'</td>
    <td>'.$row["name"].'</td>
    <td>'.$row["username"].'</td>
  
   </tr>
  ';
 }
 echo $output;
}
else
{
 echo '<h3 class="container alert alert-danger"> Not founded</h3>';
}

?>