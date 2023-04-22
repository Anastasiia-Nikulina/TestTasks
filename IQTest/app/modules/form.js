export class Form {

    testForm = document.forms.testForm;
    nextBtn = document.getElementById("nextBtn"); 
    current = 1;

    constructor() {
        if (this.testForm) {
            this.testForm.addEventListener('input', function (event) {
                this.nextBtn.classList.add("button-next__yellow"); { }
            });

            this.testForm.addEventListener("submit", (event) => {
                event.preventDefault();
                console.log(JSON.stringify(Object.fromEntries(new FormData(testForm))));

                const xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", "https://swapi.dev/api/people/1/", false);
                xmlHttp.send();
                const jsonResponse = JSON.parse(xmlHttp.responseText);
                
                const userInfo = document.createElement("div");
                const finalPage = document.querySelector(".final");
                finalPage.appendChild(userInfo);
                userInfo.className = "user-info";

                for (const [key, value] of Object.entries(jsonResponse)) {
                    let infoLine = document.createElement("p");
                    infoLine.innerText = `${key}: ${value}`;
                    userInfo.append(infoLine);
                }
            });


            this.nextBtn.addEventListener("click", (event) => {
                event.preventDefault();
                const questArray = Array.from(this.testForm.getElementsByClassName("test-question"));
                let currentValue = testForm[`q${this.current}`].value;

                if (this.validateAnswer(currentValue)) {
                    switch (this.current) {

                        case questArray.length:
                            const resultPage = document.querySelector(".test-results");
                            const finalPage = document.querySelector(".final");
                            questArray[this.current - 1].style.display = "none";
                            this.nextBtn.style.display = "none";
                            resultPage.style.display = "block";
                            const progressContainer = document.querySelector(".progress-container");
                            progressContainer.style.display = "none";

                            setTimeout(() => {
                                const resultHeader = document.querySelector(".h1-results");
                                resultHeader.innerText = "готово!";
                                const footer = document.querySelector(".footer");
                                footer.style.display = "block";
                                resultHeader.style.fontSize = "20px";             
                                resultPage.style.display = "none";
                                finalPage.style.display = "block";
                                this.countdown("timer", 10, 0);
                            }, 5000);

                            break;

                        default:
                            this.increaseProgress();
                            questArray[this.current - 1].style.display = "none";
                            questArray[this.current].style.display = "flex";
                            this.current = this.current + 1;
                            this.nextBtn.classList.remove("button-next__yellow");
                    }
                }
            });
        }
    };

    validateAnswer(checkInput) {

        if (!checkInput) {
            alert("Выберите один из вариантов");
            return false;
        } else {
            return true;
        }
    };

    countdown(elementName, minutes, seconds) {
        let element, endTime, hours, mins, msLeft, time;
        function twoDigits(n) {
            return (n <= 9 ? "0" + n : n);
        }
        function updateTimer() {
            msLeft = endTime - (+new Date);
            if (msLeft < 1000) {
                element.innerHTML = "00:00";
            } else {
                time = new Date(msLeft);
                hours = time.getUTCHours();
                mins = time.getUTCMinutes();
                element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
                setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
            }
        }
        element = document.getElementById(elementName);
        endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
        updateTimer();
    };

    increaseProgress() {
        let progressBar = document.querySelector(".progress");
        progressBar.style.width = `${this.current * 10}%`;
    };

};