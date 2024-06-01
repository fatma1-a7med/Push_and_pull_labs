<?php
require 'function.php';

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  </head>
  <body>
    <div class="container w-50 my-5">
        <h3>Register</h3>
        <form autocomplete="off" action="" method="post">
          <input type="hidden" id="action" value="register">
          <label for="">Full Name</label>
          <input type="text" id="name" value="" class="form-control" placeholder="Enter your fullname"> <br>
          <label for="">Username</label>
          <input type="text" id="username" value="" class="form-control" placeholder="Enter your username"> <br>
          <label for="">Password</label>
          <input type="password" id="password" value="" class="form-control" placeholder="Enter your password"> <br>
          <button type="button" onclick="submitData();" class="btn btn-info text-light">Register</button>
        </form>
    </div>
    
  <script src="./script.js"></script>
  
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  </body>
</html>
