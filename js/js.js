       
let line = document.getElementById("line");
let setka = document.getElementById("setka");
let contextLine = line.getContext("2d");
let contextSetka = setka.getContext("2d");

for (let xs = 0; xs < 1000; xs += 50) {
    contextSetka.moveTo(xs, 0);
    contextSetka.lineTo(xs, 1000);
}

for (let ys = 0; ys < 1000; ys += 50) {
    contextSetka.moveTo(0, ys);
    contextSetka.lineTo(1000, ys);
}

contextSetka.strokeStyle = "#888";
contextSetka.stroke();

let x = 0;


setInterval(function () {

    class httpGetAjax {
        static httpGet(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = function () {
                    if (this.status == 200) {
                        resolve(this.response);
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };

                xhr.onerror = function () {
                    reject(new Error("Network Error"));
                };

                xhr.send();
            });
        }
    }
    ;

    httpGetAjax.httpGet("http://dev.stearling.net/api/point")
            .then(
                    response => {
                        let data = JSON.parse(response);
                        console.log(data.y);
                        let y = data.y;
                        if (x > 1000) {
                            contextLine.clearRect(0, 0, line.width, line.height);
                            x = 0;
                            contextLine.beginPath();

                        } else {
                            contextLine.lineTo(x, (500 - (y * 5)));
                            contextLine.strokeStyle = "red";
                            contextLine.stroke();

                            x = x + 50;
                        }
                    }
            )


            .catch(error => {
                console.log(error);
            });

}, 40)