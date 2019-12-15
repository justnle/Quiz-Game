// variables
var questionNum = 0;

// timer function

// high score submit function

// quiz function

$('#start-button').on('click', function() {
    $('#quiz-intro').hide();
    $('#question-choices').html('');

    var questionTitle = questions[questionNum].question;
    var questionChoices = questions[questionNum].choices;
    var questionAnswer = questions[questionNum].answer;

    console.log(questionAnswer);
    
    $('#question-title').html('<h2>' + questionTitle + '</h2>');

    for (var i = 0; i < questionChoices.length; i++) {
        var choice = questionChoices[i];

        var choiceList = $('<li></li>').text(choice);
        choiceList.attr('data-index', i);
        $('#question-choices').append(choiceList);

        // $('#question-choices').append('<li>' + questionChoices[i] + '</li>');

    }

    questionNum++;

    $('#question-choices').click(function(event) {
        var userChoice = event.target.dataset.index;
        console.log(userChoice);

        if (userChoice === questionAnswer) {
            alert('correct!');
        } else {
            alert('incorrect!');
        }
    });

    // $('#question-choices').on('click', function() {


    // });

    while (questionNum === 5) {
        questionNum = 0;
        alert('You are all done!');
    }
});

// function userChoice() {

// }