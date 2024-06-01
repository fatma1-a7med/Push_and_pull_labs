document.addEventListener("DOMContentLoaded", function() {
    load_data();

    function load_data() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "fetch.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById('result').innerHTML = xhr.responseText;
                attachDeleteHandlers();
            }
        };

        xhr.send();
    }

    function attachDeleteHandlers() {
        var deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var delete_id = this.getAttribute('data-id');
                delete_record(delete_id);
            });
        });
    }

    function delete_record(delete_id) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "fetch.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert(xhr.responseText);
                load_data();
            }
        };

        xhr.send("delete_id=" + encodeURIComponent(delete_id));
    }
});