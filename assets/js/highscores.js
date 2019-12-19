$(document).ready(function() {
    // for (var i = 0; i < )
    var scoreInitials = localStorage.getItem('highScores');
    var getScoreInitials = JSON.parse(scoreInitials);
    $('#high-score-names').append(Object.keys(getScoreInitials)[0]);

});

// var existingHighScores = localStorage.getItem('high-scores');
// console.log(existingHighScores);

// change to a real url later
$('#back-button').on('click', function() {
    location.href = 'index.html';
});

$('#clear-button').on('click', function() {
    localStorage.clear();
    location.reload();
});