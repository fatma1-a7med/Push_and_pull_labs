$(document).ready(function() {
    function doPolling(lastModified) {
        $.ajax({
            url: "http://localhost:3000/data",
            method: "GET",
            data: {
                lastModified: lastModified
            },
            success: function(data) {
                console.log(data);
                $('#content').append('<pre>' + data.data + '</pre><hr style="color: red">');
                doPolling(data.serverTime);
            },
            error: function() {
                $('#content').append('<h1 style="color: red">Error getting data</h1><hr style="color: red">');
                doPolling(0);
            }
        });
    }

    doPolling(0);
});
