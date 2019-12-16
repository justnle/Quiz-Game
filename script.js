// variables
var questionNum = 0;

// start the quiz by showing the question and hiding intro
$('#start-button').on('click', function () {
    $('#quiz-intro').hide();
    displayQuestion();
});

// displays the question by changing the title and choices
function displayQuestion() {
    var questionTitle = questions[questionNum].question;
    var questionChoices = questions[questionNum].choices;

    $('#questions-choices').html('');
    $('#question-title').html('<h3>' + questionTitle + '</h3>');

    for (var i = 0; i < questionChoices.length; i++) {
        var choice = questionChoices[i];
        var choiceList = $('<li></li>').text(choice);
        choiceList.attr('data-index', i);
        $('#question-choices').append(choiceList);
    }
}

// allows user to choose answers
$('#question-choices').click(function (event) {
    $('#question-choices').html('');
    var userChoice = event.target.dataset.index;
    var questionAnswer = questions[questionNum].answer;
    questionNum++;

    if (userChoice === questionAnswer) {
        alert('correct!');
        displayQuestion();
    } else if (questionNum === 5) {
        $('#question-title').html('<h3> you are done </h3>');
        alert('you are done!');
        return;
    } else {
        alert('incorrect!');
        displayQuestion();
    }
});