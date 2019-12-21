// variables
var questionNum = 0;
var highScores = {};

$(document).ready(function() {
  startQuiz();

  function countdownTimer() {
    let seconds = questions.length * 15;

    function timerInterval() {
      $('#timer-container').html('<b>Time</b>: ' + seconds);
      seconds--;
      $('#timer-container').attr('data-value', seconds);

      if (questionNum === 5) {
        clearInterval(timer);
        var timeRemaining = seconds + 1;
        $('#timer-container').attr('data-value', timeRemaining);
      }
      if (seconds < 0) {
        clearInterval(timer);
        highScorePage('0');
      }
    }
    let timer = setInterval(timerInterval, 1000);
    timerInterval();
  }

  function startQuiz() {
    $('#start-button').on('click', function() {
      $('#quiz-intro').hide();
      countdownTimer();
      chooseAnswer();
      displayQuestion();
    });
  }

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
  function chooseAnswer() {
    $('#question-choices').click(function(event) {
      $('#question-choices').html('');
      let userChoice = event.target.dataset.index;
      var questionAnswer = questions[questionNum].answer;

      questionNum++;

      if (questionNum === 5 && userChoice === questionAnswer) {
        showCorrect();
        highScorePage($('#timer-container').data('value'));
      } else if (questionNum === 5 && userChoice !== questionAnswer) {
        showWrong();
        highScorePage($('#timer-container').data('value'));
      } else if (userChoice === questionAnswer) {
        displayQuestion();
        $('#userAnswer').show();
        showCorrect();
      } else {
        displayQuestion();
        $('#userAnswer').show();
        showWrong();
      }
    });
  }

  function highScorePage(score) {
    // $('#userAnswer').empty();
    $('#question-title').html('<h3>All done!</h3>');
    $('#question-choices').html('');

    let initialsLabel = $('<label>').text('Enter Initials:');
    let initialsInput = $('<input type="name">').attr({
      id: 'high-score-name',
      class: 'form-control'
    });
    let submitButton = $('<button type="submit">').text('Submit');
    let finalScoreInfo = $("<div id='final-score'></div>").html(
      'Your final score is: <b>' + score + '</b>'
    );
    submitButton.attr('id', 'high-score-submit');
    submitButton.addClass('btn btn-primary');

    $('#high-score-container').prepend(finalScoreInfo);
    $('#high-score-info').append(initialsLabel);
    $('#high-score-info').append(initialsInput);
    $('#high-score-info').append(submitButton);

    submitHighScore();
  }

  function submitHighScore() {
    $('#high-score-submit').on('click', function(event) {
      event.preventDefault();

      var submitInitials = $('#high-score-name')
        .val()
        .trim();

      if (submitInitials === '') {
        return;
      }
      let existing = localStorage.getItem('highScores');
      existing = existing ? JSON.parse(existing) : {};
      existing[submitInitials] = $('#timer-container').data('value');
      localStorage.setItem('highScores', JSON.stringify(existing));
      location.href = 'highscores.html';
    });
  }

  // function wrongAnswer() {
  //   console.log($('#timer').data('value') + ' subtract 10');
  // }

  // function clear() {
  //   $('#question-title, #question-choices').empty();
  // }

  function showWrong() {
    $('#userAnswer').text('Wrong!').delay(300).fadeOut();
  }

  function showCorrect() {
    $('#userAnswer').text('Correct!').delay(300).fadeOut();
  }
});

// decrease time for incorrect answers
// fix high score page to be a list, append each accordingly
// make it look nicer
// clean up code
// make userAnswer display on high score page