class UI 
{
    constructor()
    {
        this.renderUI = null
        this.fps = 20
        this.highScore = null
    }
    setupUI(snake)
    {
        this.cleanUI()
        let itr = snake.head
        while(itr)
        {
            const b = document.createElement('div')
            b.className = 'box'
            b.style.top = `${itr.posY}px`
            b.style.left = `${itr.posX}px`
            $pane.appendChild(b)
            itr = itr.prev
        }
        const b = document.createElement('div')
        b.className = 'box'
        b.style.top = `${snake.food.posY}px`
        b.style.left = `${snake.food.posX}px`
        $pane.appendChild(b)

    }
    newGame(snake)
    {
        $msg.style.display = 'none'
        snake.start()
        this.renderUI = setInterval(() => {
            this.setupUI(snake)
        },1000/this.fps)
    }
    cleanUI()
    {
        Array.from($pane.children).forEach(child => {
            if(child.id === 'msg') return
            $pane.removeChild(child)
        })
    }
    scoreUpdater(newScore)
    {
        $scorePanal.childNodes[0].nodeValue = newScore
    }
    endGame(snake)
    {
        const score = snake.length*10-10
        $msg.style.display = 'flex'
        $message.innerText = this.highScore && this.highScore < score ? 'High Score!' : 'Game Over!'
        $score.innerText = score
        $start.innerText = 'Restart'
        this.highScore = this.highScore<score ? score : this.highScore
        clearInterval(this.renderUI)
    }
}
