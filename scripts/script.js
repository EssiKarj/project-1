function init() {

  //Variables global scope
  let gameInProgress = false

  const startingPosition = 90
  let characterPosition = startingPosition
  let charNum = 'characterOneClass'

  const monsterOneStart = 3
  let monsterOnePosition = monsterOneStart
  const monsterTwoStart = 65
  let monsterTwoPosition = monsterTwoStart
  let monsterInterval

  let keyPosition

  let lives = 5
  let keys = 0
  let keyAmount = keys + 5

  const startButton = document.querySelector('#start-button')

  const gameMessageBox = document.getElementById('game-message')

  const characters = document.querySelectorAll('.characters')
  const charLives = document.querySelector('#characterLives')

  const audioFile = document.querySelector('audio')

  const gameGrid = document.querySelector('.gamegrid')
  const width = 10
  const cellCount = width * width
  const cellArray = []

  const forestCells = [7, 8, 9, 23, 16, 17, 18, 27, 46, 55, 56, 57, 67, 68, 69, 78, 79, 80, 70, 71, 60, 61, 62, 50, 51, 41, 95, 96, 84, , 11, 12, 2]
  const sandCells = [0, 1, 10, 49, 58, 59, 93, 94]

  const movementNums = [1, -1, 10, -10]


  // Creates the grid and stores each cell in to cellArray 
  // Creates another set of cells or divs inside the existing cells to allow easy character movement with classes
  // Includes functions that place character, monsters and key on to the grid
  const createGrid = () => {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      const innerCell = document.createElement('div')
      innerCell.classList.add('innerCell')
      //cell.innerText = i
      cell.appendChild(innerCell)
      gameGrid.appendChild(cell)
      cellArray.push(cell)
    }

    createForest()
    createSand()
    keyPlacement()
    placeCharacter(startingPosition)
    //monsterInterval()
  }

  //Starts the game once start button has been pressed
  const startGame = () => {
    if (gameMessageBox.style.display === 'block') {
      gameMessageBox.style.display = 'none'
    }
    if (startButton.disabled === false) {
      startButton.disabled = true
      placeMonster(monsterOneStart)
      placeMonster(monsterTwoStart)
    }
    setMonsterInterval()
    gameInProgress = true
  }

  // Interval to allow monster movements
  const setMonsterInterval = () => {
    monsterInterval = setInterval(() => {
      moveMonsterOne()
      moveMonsterTwo()
    }, 1000)
  }


  // Adds character to the grid and accepts position as the argument
  const placeCharacter = (position) => {
    const charChild = cellArray[position].childNodes[0]
    charChild.classList.add(charNum)
  }

  // Removes character from the grid
  const removeChar = (position) => {
    cellArray[position].childNodes[0].classList.remove(charNum)
  }

  //Creates forest area in the grid
  const createForest = () => {
    cellArray.map((cell, index) => {
      if (forestCells.includes(index)) cell.classList.add('forestClass')
    })
  }

  //Creates sand areas in the grid
  const createSand = () => {
    cellArray.map((cell, index) => {
      if (sandCells.includes(index)) cell.classList.add('sandClass')
    })
  }

  // places monster(s) on the grid
  const placeMonster = (position) => {
    const monsterChild = cellArray[position].childNodes[0]
    if (position === monsterOnePosition) {
      monsterChild.classList.add('monsterOneClass')
    } else {
      monsterChild.classList.add('monsterTwoClass')
    }

    if (monsterOnePosition === characterPosition || monsterTwoPosition === characterPosition) {
      lives--
      audioFile.src = './sounds/monster-noise.wav'
      audioFile.play()
      document.getElementById('lives').innerText = lives
      if (lives === 0) {
        gameMessageBox.style.display = 'block'
        gameMessageBox.innerText = 'GAME OVER'
        gameInProgress = false
        resetGame()
      }
    }

  }

  // removes the monsterClass from previous cell
  const removeMonster = (position) => {
    if (position === monsterOnePosition) {
      cellArray[position].childNodes[0].classList.remove('monsterOneClass')
    } else {
      cellArray[position].childNodes[0].classList.remove('monsterTwoClass')
    }
  }

  //Places key in the grid within a random cell
  const keyPlacement = () => {
    keyPosition = randomizer(cellCount - 1)
    if (keyPosition === characterPosition) {
      keyPlacement()
    }
    cellArray[keyPosition].childNodes[0].classList.add('keyClass')
  }

  // Randomizer function to reuse in various places
  const randomizer = (limit) => {
    return Math.floor(Math.random() * limit)
  }

  // Reset function to start again, triggered in game ending situations
  const resetGame = () => {
    gameInProgress = false
    lives = 5
    keys = 0
    document.getElementById('lives').innerText = lives
    document.getElementById('keys').innerText = keys
    removeMonster(monsterOnePosition)
    removeMonster(monsterTwoPosition)
    removeChar(characterPosition)
    placeCharacter(startingPosition)
    //keyPlacement()
    characterPosition = startingPosition
    monsterOnePosition = monsterOneStart
    monsterTwoPosition = monsterTwoStart
    startButton.disabled = false
    clearInterval(monsterInterval)
  }

  // function that randomly moves the position of the monster with condition to not enter forest areas
  const moveMonsterOne = () => {
    let direction = movementNums[randomizer(4)]
    let tempPosition = direction + monsterOnePosition

    if (tempPosition < 0 || tempPosition > 99) {
      moveMonsterOne()
    } else if (direction === 1 && monsterOnePosition % width === 9) {
      moveMonsterOne()
    } else if (direction === -1 && monsterOnePosition % width === 0) {
      moveMonsterOne()
    } else if (forestCells.includes(tempPosition) || monsterTwoPosition === tempPosition) {
      moveMonsterOne()
    } else {
      removeMonster(monsterOnePosition)
      monsterOnePosition = tempPosition
      placeMonster(monsterOnePosition)
    }
  }

  // function that randomly moves the position of the monster with condition to not enter forest areas
  const moveMonsterTwo = () => {
    let direction = movementNums[randomizer(4)]
    let tempPosition = direction + monsterTwoPosition

    if (tempPosition < 0 || tempPosition > 99) {
      moveMonsterTwo()
    } else if (direction === 1 && monsterTwoPosition % width === 9) {
      moveMonsterTwo()
    } else if (direction === -1 && monsterTwoPosition % width === 0) {
      moveMonsterTwo()
    } else if (forestCells.includes(tempPosition) || monsterOnePosition === tempPosition) {
      moveMonsterTwo()
    } else {
      removeMonster(monsterTwoPosition)
      monsterTwoPosition = tempPosition
      placeMonster(monsterTwoPosition)
    }
  }

  //Function that takes character position and increments it or decrements according to key buttons pressed
  const movingCharacter = (event) => {
    const keyButton = event.keyCode
    const right = 39
    const left = 37
    const up = 38
    const down = 40

    if (!gameInProgress) return

    removeChar(characterPosition)

    if (keyButton === right && characterPosition % width !== width - 1) {
      characterPosition++
    } else if (keyButton === left && characterPosition % width !== 0) {
      characterPosition--
    } else if (keyButton === up && characterPosition >= width) {
      characterPosition -= width
    } else if (keyButton === down && characterPosition + width <= 99) {
      characterPosition += width
    }

    // Condition for forest area to remove a live if randomizer value is 1
    if (forestCells.includes(characterPosition)) {
      let forestRandom = randomizer(3)
      console.log('in forest')
      if (forestRandom === 1) {
        lives--
        audioFile.src = './sounds/forest-life-lost.wav'
        audioFile.play()
        document.getElementById('lives').innerText = lives
        //cellArray[characterPosition].classList.add('pulse')
        if (lives === 0) {
          gameMessageBox.style.display = 'block'
          gameMessageBox.innerText = 'GAME OVER'
          resetGame()
        }
      }
    }

    // Condition for if character clashes with Monsters
    if (monsterOnePosition === characterPosition || monsterTwoPosition === characterPosition) {
      lives--
      audioFile.src = './sounds/monster-noise.wav'
      audioFile.play()
      document.getElementById('lives').innerText = lives
      if (lives === 0) {
        gameMessageBox.style.display = 'block'
        gameMessageBox.innerText = 'GAME OVER'
        resetGame()
      }
    }

    // Condition for collecting keys
    if (keyPosition === characterPosition) {
      cellArray[keyPosition].childNodes[0].classList.remove('keyClass')
      console.log('got it')
      keyPlacement()
      keys++
      audioFile.src = './sounds/key-noise.wav'
      audioFile.play()
      document.getElementById('keys').innerText = keys
      if (keys === 5) {
        gameMessageBox.style.display = 'block'
        gameMessageBox.innerText = 'YOU WON!'
        audioFile.src = './sounds/win-noise.wav'
        audioFile.play()
        resetGame()
      }
    }

    placeCharacter(characterPosition)
  }

  // Event listener for keyboard keys
  characters.forEach(i => i.addEventListener('click', () => {
    if (characterPosition === startingPosition) {
      removeChar(characterPosition)
      charLives.classList.remove(charNum)

      if (i.id === 'char3') {
        charNum = 'characterThreeClass'
      } else if (i.id === 'char2') {
        charNum = 'characterTwoClass'
      } else {
        charNum = 'characterOneClass'
      }

      charLives.classList.add(charNum)
      placeCharacter(characterPosition)
    }
  }))


  document.addEventListener('keydown', movingCharacter)

  createGrid()

  document.getElementById('lives').innerText = lives
  document.getElementById('keys').innerText = keys

  startButton.addEventListener('click', startGame)

}

window.addEventListener('DOMContentLoaded', init)