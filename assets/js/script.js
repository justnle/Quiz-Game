var questionNum = 0;
var highScores = {};
var quizChoices = $('#question-choices');
var quizTitle = $('#question-title');
var userSuccess = $('#user-answer');
var timerContainer = $('#timer-container');
var wrongAnswer = 0;
var deductTime = 0;
var timerScore = 0;
var quizLength;
var seconds;

$(document).ready(function() {
  quizLength = questions.length;
  
  startQuiz();
  
  function countdownTimer() {
    // seconds = quizLength * 15;
    seconds = 50;
    
    function timerInterval() {
      seconds = seconds - deductTime;
      deductTime = 0;
      timerContainer.html('<b>Time</b>: ' + seconds);
      seconds--;
      timerContainer.attr('data-value', seconds + 1);

      // case 1: when quizNum = quizLength, clear interval, show highscorepage with seconds as score
      // case 2: when quizNum != quizLength & seconds <= 0, show highscorepage with 0 score (ran out of time in userAnswer):
      // case 3: when quizNum = quizLength, & seconds < 0, show highscorepage with 0 score

      if (questionNum === quizLength) {
        clearInterval(timer);
        highScorePage(seconds);
        return;
      }
      // if (questionNum === quizLength && seconds < 0) {
      //   seconds = 0;
      //   clearInterval(timer);
      //   timerContainer.attr('data-value', seconds);
      //   timerContainer.html('<b>Time</b>: ' + seconds);
      //   return seconds;
      // } 
      // if (seconds < 0 && questionNum < quizLength) {
      //   console.log('culprit 2');
      //   clearInterval(timer);
      //   seconds = 0;
      //   timerContainer.html('<b>Time</b>: 0');
      //   highScorePage(seconds);
      //   return seconds;
      // }
      // if (seconds < 0) {
      //   console.log('culprit 3');
      //   seconds = 0;
      //   clearInterval(timer);
      //   timerContainer.html('<b>Time</b>: 0');
      //   return seconds;
      // }

      // if (quizNum !== quizLength && seconds <= 0) {
      //   clearInterval(timer);
      // }
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
      var userChoice = event.target.dataset.index;
      var questionAnswer = questions[questionNum].answer;

      questionNum++;

      // do this while questionNum != quizLength
      // case 1: if userchoice = useranswer display correct, show next
      // case 2: if userchoice != useranswer display incorrect, show next

      if (userChoice === questionAnswer) {
        showCorrect();
        displayQuestion();
      } else {
        showWrong();
        displayQuestion();
      }

      if (questionNum === quizLength) {
        console.log(questionNum);
        console.log(quizLength);
        highScorePage(seconds);
      }

      // if (questionNum === quizLength && userChoice === questionAnswer) {
      //   timerContainer.html('<b>Time</b>: ' + seconds);
      //   console.log('not this one');
      //   showCorrect();
      //   highScorePage(seconds);
      //   return seconds;
      // } else if (questionNum === quizLength && userChoice !== questionAnswer && $('#timer-container').data('value') -11 < 0) {
      //   seconds = 0;
        
      //   $('#timer-container').attr('data-value', seconds);
      //   // timerScore = 0;
      //   showWrong();
      //   highScorePage(seconds);
      //   timerContainer.html('<b>Time</b>: ' + 0);
      //   console.log('FIX THIS ISSUE!!!!!');
      //   return seconds;
      // } else if (questionNum === quizLength && userChoice !== questionAnswer) {
      //   // idk wtf this case is.. last question and wrong answer..
      //   // timerScore = timerContainer.data('value') - 10;
      //   showWrong();
      //   highScorePage(seconds);
      //   console.log('am i doing this right');
      //   return seconds;
      // } else if (userChoice === questionAnswer) {
      //   displayQuestion();
      //   userSuccess.show();
      //   showCorrect();
      // } else {
      //   console.log('doubt I am here');
      //   displayQuestion();
      //   userSuccess.show();
      //   showWrong();
      // }
    });
  }

  function highScorePage(score) {
    userSuccess.show().delay(300).fadeOut();
    quizTitle.html('<h3>All done!</h3>');
    quizChoices.html('');

    var initialsLabel = $('<label>').text('Enter Initials:');
    var initialsInput = $('<input type="name">').attr({
      id: 'high-score-name',
      class: 'form-control'
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
    wrongAnswer++;
    deductTime = wrongAnswer * 10 / wrongAnswer;
    userSuccess.text('Wrong!').delay(300).fadeOut();
    return deductTime;
  }

  function showCorrect() {
    userSuccess.text('Correct!').delay(300).fadeOut();
  }
});

// DRY THIS CODE OUT!!!!!!!!!!!!!!
// make <b>Time:</b> part of the HTML right away, then modify the HTML with jquery to represent the time remaining

// fix footer overlapping...