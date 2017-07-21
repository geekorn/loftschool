var request = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr. open('GET', url, true);
        xhr.addEventListener('load', function() {

            if (xhr.status > 400) {
                reject('не удалось загрузить файл');
            } else {
                var data = JSON.parse(xhr.responseText);

                resolve(data);
            }
        });
        xhr.send();
    })
};
