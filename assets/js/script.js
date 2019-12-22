var questionNum = 0;
var highScores = {};
var quizChoices = $('#question-choices');
var quizTitle = $('#question-title');
var userSuccess = $('#user-answer');
var timerContainer = $('#timer-container');
var quizLength;
var seconds;

$(document).ready(function() {
  quizLength = questions.length;

  startQuiz();

  function countdownTimer() {
    seconds = quizLength * 15;

    function timerInterval() {
      timerContainer.html('<b>Time</b>: ' + seconds);
      seconds--;

      if (questionNum === quizLength) {
        clearInterval(timer);
        return seconds;
      } else if (seconds < 0) {
        seconds = 0;
        timerContainer.html('<b>Time</b>: ' + seconds);
        clearInterval(timer);
        highScorePage(seconds);
        return seconds;
      }
    }
    var timer = setInterval(timerInterval, 1000);
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

  function displayQuestion() {
    if (questionNum < quizLength) {
      var questionTitle = questions[questionNum].question;
      var questionChoices = questions[questionNum].choices;

      quizChoices.html('');
      quizTitle.html('<h3>' + questionTitle + '</h3>');

      for (var i = 0; i < questionChoices.length; i++) {
        var choice = questionChoices[i];
        var choiceList = $('<li></li>').text(choice);
        choiceList.addClass(
          'list-group-item list-group-item-action list-group-item-dark'
        );
        choiceList.attr('data-index', i);
        quizChoices.append(choiceList);
      }
    }
  }

  function chooseAnswer() {
    quizChoices.click(function(event) {
      quizChoices.html('');
      var userChoice = event.target.dataset.index;
      var questionAnswer = questions[questionNum].answer;

      questionNum++;

      if (userChoice === questionAnswer) {
        showCorrect();
      } else {
        showWrong();
      }

      if (questionNum === quizLength) {
        console.log('second');
        highScorePage(seconds);
      } else {
        displayQuestion();
      }
    });
  }

  function highScorePage(score) {
    userSuccess
      .show()
      .delay(300)
      .fadeOut();
    quizTitle.html('<h3>All done!</h3>');
    quizChoices.html('');

    var initialsLabel = $('<label>').text('Enter Initials:');
    var initialsInput = $('<input type="name">').attr({
      id: 'high-score-name',
      class: 'form-control my-3'
    });
    var submitButton = $('<button type="submit">').text('Submit');
    var finalScoreInfo = $("<div id='final-score'></div>").html(
      'Your final score is: <b>' + score + '</b>'
    );
    submitButton.attr('id', 'high-score-submit');
    submitButton.addClass('btn btn-primary');

    $('#high-score-container').prepend(finalScoreInfo);
    $('#high-score-info').append(initialsLabel);
    $('#high-score-info').append(initialsInput);
    $('#high-score-info').append(submitButton);

    submitHighScore(score);
  }

  function submitHighScore(submitScore) {
    $('#high-score-submit').on('click', function(event) {
      event.preventDefault();

      var submitInitials = $('#high-score-name')
        .val()
        .trim();

      if (submitInitials === '') {
        return;
      }

      var existing = localStorage.getItem('highScores');
      existing = existing ? JSON.parse(existing) : {};
      existing[submitInitials] = submitScore;
      localStorage.setItem('highScores', JSON.stringify(existing));
      location.href = 'highscores.html';
    });
  }

  function showWrong() {
    seconds = seconds - 10;
    userSuccess.show();
    userSuccess
      .text('Wrong!')
      .delay(300)
      .fadeOut();
  }

  function showCorrect() {
    userSuccess.show();
    userSuccess
      .text('Correct!')
      .delay(300)
      .fadeOut();
  }
});


