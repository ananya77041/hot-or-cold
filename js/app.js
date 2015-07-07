$(document).ready(function(){

	// Hot/Cold Logic
	var hotCold = function(guess, goal, prev) {
		var diff = Math.abs(guess-goal);

		if (prev !== undefined) {
			if (diff == 0) return "You win!";
			var prevDiff = Math.abs(prev-goal);
			if (prevDiff > diff) return "Getting hotter!"
			else return "Getting colder..."
		}

		if (diff == 0) {
			return "You win!";
		}
		else if (diff > 50) {
			return "Ice cold!";
		}
		else if (diff > 30) {
			return "Cold!";
		}
		else if (diff > 20) {
			return "Warm!";
		}
		else if (diff > 10) {
			return "Hot!";
		}
		else {
			return "Very Hot!";
		};
	};

// Generate goal number
var newGoal = function() {
	return Math.floor((Math.random() * 100) + 1);
};

var goal = newGoal();

/*--- Display information modal box ---*/
$(".what").click(function(){
	$(".overlay").fadeIn(1000);

});

/*--- Hide information modal box ---*/
$("a.close").click(function(){
	$(".overlay").fadeOut(1000);
});

  	// Make a guess
  	$('#guessButton').click(function(e) {
  		e.preventDefault();
  		// Get and clear value of input
  		var guess = $('#userGuess').val();
  		if (guess < 0 || guess > 100) {
  			$('#feedback').text('Invalid guess!');
  			$('#userGuess').val('');
  		};

  		// Process feedback
  		if (+($('#count').text()) == 0) {
  			var feedback = hotCold(guess, goal);
  		}
  		else {
  			var prev = $('#guessList').children().last().text();
  			var feedback = hotCold(guess, goal, prev);
  		}
  		$('#feedback').text(feedback);

  		// Add guess to list
  		$('#guessList').append(
  			$('<li></li>')
  			.text(+guess)
  			);
  		$('#userGuess').val('');

  		// Increment guess count
  		var newCount = +($('#count').text()) + 1;
  		$('#count').text(newCount);
  	});

  	// New Game
  	$('.new').click(function() {
  		// Remove all guesses
  		$('#guessList').empty();

  		// Clear feedback
  		$('#feedback').text('Make your Guess!');

  		// Reset guess counter
  		$('#count').text('0');

  		// Generate new goal
  		goal = newGoal();
  	})

  });




