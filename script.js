const $start = document.getElementById('start-btn')
const $message = document.getElementById('message')
const $score = document.getElementById('score')
const $msg = document.getElementById('msg')
const $pane = document.getElementById('pane')

const ui = new UI()


$start.addEventListener('click', event => {
    const snake = new Snake()
    ui.newGame(snake)
    document.onkeydown = e => {
        switch(e.keyCode)
        {
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
    
})
