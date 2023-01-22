// Create an array to store the colors
var buttonColors = ['red', 'blue', 'green', 'yellow'];

// Create an array to store the sequence over time
var gamePattern = [];

// Create an array to store user click patterns
var userClickedPattern = [];

// Create a boolean to track if the game is active
var gameActive = false;

// Create an int to track the level
var level = 0;

// Create function to get the next random sequence
function nextSequence() {
    // Increase the level counter and set the game header
    level++;
    $('h1').text('Level ' + level);

    // Reset the user's pattern
    userClickedPattern = [];

    // Generate the random number
    var random_num = Math.floor(Math.random() * 4);
    console.log(random_num);

    // Grab the color for the number
    var randomChosenColor = buttonColors[random_num];
    console.log(randomChosenColor);

    // Play its sound
    playSound(randomChosenColor);

    // Choose the button with the same color
    console.log($('.' + randomChosenColor));
    $('.' + randomChosenColor).fadeOut(200).fadeIn(200);

    // Add this to the game pattern
    gamePattern.push(randomChosenColor);
    console.log('Game Pattern: ' + gamePattern);
}

// Function to play a sound based on selected color
function playSound(name) {
    // Get the sound for the selected color and play it
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Function to animate user clicks
function animatePress(currentColor) {
    // Add the pressed effect
    $('.' + currentColor).addClass('pressed');

    // Remove the pressed effect after 100 ms
    setTimeout(function() {
        $('.' + currentColor).removeClass('pressed');
    }, 100);
}

// Function to check the answer
function checkAnswer(turn) {
    console.log(userClickedPattern);
    console.log(gamePattern);

    // Check if the most recent answer is correct
    if (userClickedPattern[turn] === gamePattern[turn]) {
        console.log('Passed!');
        
        // Check if the sequence is complete
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); 
            }, 1000);
        }
    } else {
        console.log('Failed...');

        // Go to game over
        gameOver();
    }
}

// Function to declare game over
function gameOver() {
    // Played the fail sound
    var failSound = new Audio('sounds/wrong.mp3');
    failSound.play();

    // Apply the game over style
    $('body').addClass('game-over');
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 200);

    // Change the header to say game over
    $('h1').text('Game Over at Level ' + (level - 1) + ', Press Any Key to Restart');

    // Trigger start over
    startOver();
}

// Function to start the game over
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = []
    gameActive = false;
}

// Create a listener for button clicks
$('.btn').click(function() {
    // Store the selected color
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    // Play a sound and animate the button press
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    // Check the answer
    checkAnswer(userClickedPattern.length - 1);
})

// Create a listener for a key press
$(document).keypress(function() {
    // Check for the game being active
    if (gameActive === false) {
        // Set the game start to true
        gameActive = true;
        
        // Get the first sequence
        nextSequence();

        // Set the game header to the level
        $('h1').text('Level ' + level);
    }
})