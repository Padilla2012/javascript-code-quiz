 // Questions about javascript
var questions = [
    {
        title: "Javascript is a_____ language.",
        choices: ["object-oriented", "object-base", "procedural", "none of the above"],
        answer: "object-oriented"
    },
    {
        title: "How can a data type be declare.",
        choices: ["const", "var", "let", "constant"],
        answer: "const"
    },
    {
        title: "Which of the following can be use to display data in javascript",
        choices: ["document.write", "console.log", "window.alert", "all of the above"],
        answer: "all of the above"
    },

];
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 50;
var holdInterval = 0;
var penalty = 5;
var ulCreate = document.createElement("ul");

timer.addEventListener("click",function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "time is up";
            }
        },1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionsIndex.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < question.length; i++) {
        var userQuestion =questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "correct: " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "wrong: " + questions[questionIndex].answer;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "you are done" + " " + "you have" + score + "/" + questions.length + "correct";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You are Finish"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "your score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("nothing entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("scores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allscores", newScore);
            window.location.replace("./scores.html");
        }
    });

}


