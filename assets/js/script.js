// variables
var questionNum = 0;
var highScores = {};

$(document).ready(function() {

  function countdownTimer() {
    let seconds = questions.length * 15;

    function timerInterval() {
      $('#timer').text('Time: ' + seconds);
      seconds--;
      $('#timer').attr('data-value', seconds);
      
      if (questionNum === 5) {
        clearInterval(timer);
        var timeRemaining = seconds + 1;
        $('#timer').attr('data-value', timeRemaining);
      }
      if (seconds < 0) {
        clearInterval(timer);
        highScorePage('0');
      }
    }
    let timer = setInterval(timerInterval, 1000);
    timerInterval();
  }
  
  // start the quiz by showing the question and hiding intro
  $('#start-button').on('click', function() {
    $('#quiz-intro').hide();
    countdownTimer();
    chooseAnswer();
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
  // $('#question-choices').click(function(event) {
  //   $('#question-choices').html('');
  //   let userChoice = event.target.dataset.index;
  //   var questionAnswer = questions[questionNum].answer;

  //   questionNum++;

  //   if (questionNum === 5) {
  //     highScorePage();
  //     return;
  //   } else if (userChoice === questionAnswer) {
  //     displayQuestion();
  //     alert('correct!');
  //   } else {
  //     displayQuestion();
  //     alert('incorrect!');
  //   }
  // });

  function chooseAnswer() {
    $('#question-choices').click(function(event) {
      $('#question-choices').html('');
      let userChoice = event.target.dataset.index;
      var questionAnswer = questions[questionNum].answer;

      questionNum++;

      if (questionNum === 5) {
        highScorePage($('#timer').data('value'));
      } else if (userChoice === questionAnswer) {
        displayQuestion();
        alert('correct!');
      } else {
        // wrongAnswer();
        displayQuestion();
        alert('incorrect!');
      }
    });
  }
  
  function highScorePage(score) {
    $('#question-title').html('<h3>All done!</h3>');
    $('#question-choices').html('');
    
    let initialsLabel = $('<label>').text('Enter Initials:');
    let initialsInput = $('<input type="name">').attr({
      id: 'high-score-name',
      class: 'form-control'
    });
    let submitButton = $('<button type="submit">').text('Submit');
    let finalScoreInfo = $("<div id='final-score'></div>").text(
      'Your final score is: ' + score
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
      existing[submitInitials] = $('#timer').data('value');
      localStorage.setItem('highScores', JSON.stringify(existing));
      location.href = 'highscores.html';
    });
  }

  // function wrongAnswer() {
  //   console.log($('#timer').data('value') + ' subtract 10');
  // }

  function clear() {
    $('#question-title, #question-choices').empty();
  }
});

// show incorrect and correct answers on the bottom and fade out
// decrease time for incorrect answers
// fix high score page to be a list, append each accordingly
// make it look nicer
// clean up code