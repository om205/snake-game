const $start = document.getElementById('start-btn')
const $message = document.getElementById('message')
const $score = document.getElementById('score')
const $msg = document.getElementById('msg')
const $pane = document.getElementById('pane')

const ui = new UI()

$start.addEventListener('click', event => {
    const snake = new Snake()
    ui.newGame(snake)
    //dekstop arrow key controls
    document.onkeydown = e => {
        switch (e.keyCode) {
            case 37:
                snake.turn(4)
                break
            case 38:
                snake.turn(8)
                break
            case 39:
                snake.turn(6)
                break
            case 40:
                snake.turn(2)
                break
        }
    }
    //mobile swipe controls
    let xDown = null
    let yDown = null

    document.addEventListener('touchstart', evt => {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }, false)

    document.addEventListener('touchmove', evt => {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                snake.turn(4)
            } else {
                snake.turn(6)
            }
        } else {
            if (yDiff > 0) {
                snake.turn(8)
            } else {
                snake.turn(2)
            }
        }
        xDown = null;
        yDown = null;
    }, false);

})
