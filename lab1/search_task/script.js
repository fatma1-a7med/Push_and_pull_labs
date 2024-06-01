        document.addEventListener("DOMContentLoaded", function() {
            load_data();

            document.getElementById('search_text').addEventListener('keyup', function() {
                var search = this.value;
                if (search !== '') {
                    load_data(search);
                } else {
                    load_data();
                }
            });
        });

        function load_data(query = '') {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "fetch.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById('result').innerHTML = xhr.responseText;
                }
            };

            xhr.send("query=" + encodeURIComponent(query));
        }
