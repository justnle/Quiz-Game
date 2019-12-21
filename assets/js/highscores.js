$(document).ready(function() {
  var highScoresObject = localStorage.getItem('highScores');

  initHighScorePage();

  function initHighScorePage() {
    displayHighScores();
    clearHighScores();
    goBack();
  }

  function displayHighScores() {
    if (highScoresObject !== null) {
      var scoreInitials = localStorage.getItem('highScores');
      var getScoreInitials = JSON.parse(scoreInitials);
      var highScoreKeys = Object.keys(getScoreInitials);
      var highScoreValues = Object.values(getScoreInitials);
      var numberOfHighScores = Object.keys(getScoreInitials).length;

      for (var i = 0; i < numberOfHighScores; i++) {
        var whichHighScoreKey = highScoreKeys[i];
        var whichHighScoreValue = highScoreValues[i];
        var highScoreList = $('<li></li>').text(
          whichHighScoreKey + ' - ' + whichHighScoreValue
        );
        highScoreList.addClass(
          'list-group-item list-group-item-action list-group-item-dark'
        );
        $('#high-score-names').append(highScoreList);
      }
    }
  }

  function goBack() {
    $('#back-button').on('click', function() {
      location.href = 'index.html';
    });
  }

  function clearHighScores() {
    $('#clear-button').on('click', function() {
      localStorage.clear();
      location.reload();
    });
  }
});
