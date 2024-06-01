
document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("registrationForm").addEventListener("submit", function(event) {
                event.preventDefault();
                submitData();
            });
        });

     function submitData() {
            var data = {
                name: document.getElementById("name").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                action: "register"
            };

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "function.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var response = xhr.responseText;
                    alert(response);
                    if (response === "User added to databse Successfully, check your database") {
                        window.location.reload();
                    }
                }
            };

            xhr.send(encodeFormData(data));
        }

    function encodeFormData(data) {
            var encodedString = '';
            for (var key in data) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }
            return encodedString;
    }