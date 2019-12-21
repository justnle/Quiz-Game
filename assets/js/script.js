var questionNum = 0;
var highScores = {};
var quizChoices = $('#question-choices');
var quizTitle = $('#question-title');
var userSuccess = $('#user-answer');
var timerContainer = $('#timer-container');
var wrongAnswer = 0;
var deductTime = 0;
var timerScore = 0;

$(document).ready(function() {
  startQuiz();

  function countdownTimer() {
    let seconds = questions.length * 15;
    
    function timerInterval() {
      seconds = seconds - deductTime;
      deductTime = 0;
      timerContainer.html('<b>Time</b>: ' + seconds);
      seconds--;
      timerContainer.attr('data-value', seconds + 1);

      if (questionNum === 5) {
        clearInterval(timer);
        var timeRemaining = seconds + 1;
        timerContainer.attr('data-value', timeRemaining);
      }
      if (seconds < 0 && questionNum < 5) {
        clearInterval(timer);
        timerContainer.html('<b>Time</b>: 0');
        highScorePage(0);
      }
      if (seconds < 0) {
        clearInterval(timer);
        timerContainer.html('<b>Time</b>: 0');
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

    quizChoices.html('');
    quizTitle.html('<h3>' + questionTitle + '</h3>');

    for (var i = 0; i < questionChoices.length; i++) {
      var choice = questionChoices[i];
      var choiceList = $('<li></li>').text(choice);
      choiceList.addClass('list-group-item list-group-item-action list-group-item-dark');
      choiceList.attr('data-index', i);
      quizChoices.append(choiceList);
    }
  }

  // allows user to choose answers
  function chooseAnswer() {
    quizChoices.click(function(event) {
      quizChoices.html('');
      let userChoice = event.target.dataset.index;
      var questionAnswer = questions[questionNum].answer;

      questionNum++;

      if (questionNum === 5 && userChoice === questionAnswer) {
        timerScore = timerContainer.data('value');
        showCorrect();
        highScorePage(timerScore);
        return timerScore;
      } else if (questionNum === 5 && userChoice !== questionAnswer && $('#timer-container').data('value') -11 < 0) {
        $('#timer-container').attr('data-value', 0);
        timerScore = timerContainer.data('value');
        showWrong();
        highScorePage(0);
        return timerScore;
      } else if (questionNum === 5 && userChoice !== questionAnswer) {
        timerScore = timerContainer.data('value') - 11;
        showWrong();
        highScorePage(timerScore);
        return timerScore;
      } else if (userChoice === questionAnswer) {
        displayQuestion();
        userSuccess.show();
        showCorrect();
      } else {
        displayQuestion();
        userSuccess.show();
        showWrong();
      }
    });
  }

  function highScorePage(score) {
    userSuccess.show().delay(300).fadeOut();
    quizTitle.html('<h3>All done!</h3>');
    quizChoices.html('');

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
      existing[submitInitials] = timerScore;
      localStorage.setItem('highScores', JSON.stringify(existing));
      location.href = 'highscores.html';
    });
  }

  function showWrong() {
    wrongAnswer++;
    deductTime = wrongAnswer * 10 / wrongAnswer;
    userSuccess.text('Wrong!').delay(300).fadeOut();
    return deductTime;
  }

  function showCorrect() {
    userSuccess.text('Correct!').delay(300).fadeOut();
  }
});