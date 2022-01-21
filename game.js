let buttonColours = ['red', 'blue', 'green', 'yellow']

let gamePattern = []
let userClickedPattern = []

let level = 0
let started = false

function nextSequence() {
    userClickedPattern = []
    level ++;
    $('#level-title').text('Level ' + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour)

}

$('.btn').click(function () {
    let userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function playSound(name) {
    let audioElement = new Audio(`../sounds/${name}.mp3`)
    audioElement.play()
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed')
    setTimeout(() => {
        $(`#${currentColour}`).removeClass('pressed')
    }, 100);
}
 
$(document).on('keypress', function() {
    if (!started) {
        $('#level-title').text('Level ' + level)
        nextSequence()
        started = true
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success')
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()    
            }, 1000);
        }
    } else {
        $('body').addClass('game-over')
        setTimeout(function() {
            $('body').removeClass('game-over')
        }, 600);
        $('h1').text('Game Over, Press Any Key to Restart')
        console.log('Wrong')
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}

