// variables
var questionNum = 0;

// start the quiz by showing the question and hiding intro
$('#start-button').on('click', function() {
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
$('#question-choices').click(function(event) {
  $('#question-choices').html('');
  var userChoice = event.target.dataset.index;
  var questionAnswer = questions[questionNum].answer;
  questionNum++;

  if (questionNum === 5) {
    highScore();
    return;
  } else if (userChoice === questionAnswer) {
    displayQuestion();
    alert('correct!');
  } else {
    displayQuestion();
    alert('incorrect!');
  }
});

function highScore() {
  $('#question-title').html('<h3>All done!</h3>');
  $('#question-choices').html('');

  var initialsLabel = $('<label>').text('Enter Initials:');
  var initialsInput = $('<input type="name">').attr({
    id: 'high-score-name',
    class: 'form-control'
  });
  var submitButton = $('<button type="submit">').text('Submit');
  var finalScoreInfo = $("<div id='final-score'></div>").text(
    'Your final score is: TIME REMAINING'
  );

  submitButton.addClass('btn btn-primary');

  $('#high-score-container').prepend(finalScoreInfo);
  $('#high-score-info').append(initialsLabel);
  $('#high-score-info').append(initialsInput);
  $('#high-score-info').append(submitButton);
}
