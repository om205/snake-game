class Box {
    constructor(type,x,y,back,front) {
        this.posX = x
        this.posY = y
        this.type = type
        this.prev = back ? back : null
        this.next = front ? front : null
    }
    moveUp(step,len,wall)
    {
        if(this.posY <= 0)
        {
            if(wall) throw 'hit'
            else this.posY = len
        }
        else this.posY -= step
    }
    moveDown(step,len,wall)
    {
        if(this.posY >= len)
        {
            if(wall) throw 'hit'
            else this.posY = 0
        }
        else this.posY += step
    }
    moveLeft(step,len,wall)
    {
        if(this.posX <= 0)
        {
            if(wall) throw 'hit'
            else this.posX = len
        }
        else this.posX -= step
    }
    moveRight(step,len,wall)
    {
        if(this.posX >= len)
        {
            if(wall) throw 'hit'
            else this.posX = 0
        }
        else this.posX += step
    }
    move(steps,dir,wall)
    {
        // to optimize the game we can calculate the height and width of pane only at start of game but it might create some issue
        const paneStyle = getComputedStyle($pane)
        const [h,w] = [parseInt(paneStyle.height)-10,parseInt(paneStyle.width)-10]
        switch(dir)
        {
            case 2:
                this.moveDown(steps,h,wall)
                break;
            case 4:
                this.moveLeft(steps,w,wall)
                break;
            case 6:
                this.moveRight(steps,w,wall)
                break;
            case 8:
                this.moveUp(steps,h,wall)
                break;
        }
    }
}


class Snake {
    constructor()
    {
        this.head = new Box('body',100,100,null,null)
        this.tail = null
        this.length = 1
        this.speed = 5
        this.hitWall = false
        this.food = new Box('food',150,100,null,null)
        this.direction = 6
        this.movement = null
        // this.turnPoints = []
    }
    move() 
    {
        const { posX, posY } = this.head
        try {
            this.head.move(10,this.direction,this.hitWall)
        } catch (err) {
            if(err === 'hit')
            return this.stop()
        }
        if(this.tail)
        {
            this.tail.posX = posX
            this.tail.posY = posY
            this.tail.prev = this.head.prev
            this.head.prev.next = this.tail
            this.tail = this.tail.next
            this.head.prev = this.tail.prev
            this.tail.prev.next = this.head
            this.tail.prev = null
        }
        const x_start = this.head.posX - 5
        const x_end = x_start + 10
        const y_start = this.head.posY -5
        const y_end = y_start + 10
        let itr = this.head
        while(itr = itr.prev)
        {
            if((itr.posX > x_start && itr.posX < x_end)&&(itr.posY > y_start && itr.posY < y_end))
            return this.stop()
        }
        if((this.food.posX > x_start && this.food.posX < x_end)&&(this.food.posY > y_start && this.food.posY < y_end))
        {
            if(this.speed < 100)
            this.speed += 2
            clearInterval(this.movement)
            this.movement = setInterval(()=>this.move(),1000/this.speed)
            this.grow()
            this.placefood()
        }
    }
    start()
    {
        this.movement = setInterval(()=>this.move(),1000/this.speed)
    }
    stop()
    {
        clearInterval(this.movement)
        clearInterval(this.speed_ctrl)
        ui.endGame(this)
    }
    turn(dir)
    {
        const currDir = this.direction
        if((currDir == 2 && dir == 8)||(currDir == 8 && dir == 2)||(currDir == 4 && dir == 6)||(currDir == 6 && dir == 4)) return
        this.direction = dir
        // this.turnPoints.push([this.head.posX, this.head.posY, dir])
    }
    placefood()
    {
        const paneStyle = getComputedStyle($pane)
        const [h,w] = [parseInt(paneStyle.height)-10,parseInt(paneStyle.width)-10]
        const randX = Math.random() * w
        const randY = Math.random() * h
        this.food.posX = randX
        this.food.posY = randY
    }
    grow()
    {
        this.length++
        ui.scoreUpdater(this.length*10-10)
        if(this.tail)
        {
            const { posX, posY, next } = this.tail
            const [ prevX, prevY ] = [next.posX,next.posY]
            const [ diffX, diffY ] = [prevX-posX, prevY-posY]
            const [ offX, offY ] = diffX == 0 ? (diffY>0 ? [0,-10] : [0,10]) : (diffX>0 ? [-10,0] : [10,0])
            const newBox = new Box('body',posX+offX, posY+offY, null, this.tail)
            this.tail.prev = newBox
            this.tail = newBox
        }
        else {
            const { posX, posY } = this.head
            const dir = this.direction
            const [ offX, offY ] = dir==2 ? [0,-10] : dir==4 ? [10,0] : dir==8 ? [0,10] : [-10,0]
            const newBox = new Box('body',posX+offX, posY+offY, null, this.head)
            this.head.prev = newBox
            this.tail = newBox
        }
    }
}