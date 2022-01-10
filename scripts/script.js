function init() {

  //Variables global scope
  const startingPosition = 90
  let characterPosition = startingPosition

  let charNum = 'characterOneClass'

  const monsterOneStart = 3
  let monsterOnePosition = monsterOneStart
  const monsterTwoStart = 65
  let monsterTwoPosition = monsterTwoStart

  let keyPosition

  let lives = 5
  let keys = 0
  let keyAmount = keys + 5

  const characters = document.querySelectorAll('.characters')

  const gameGrid = document.querySelector('.gamegrid')
  const width = 10
  const cellCount = width * width
  const cellArray = []

  let forestCells = [7, 8, 9, 16, 17, 18, 27, 46, 55, 56, 57, 67, 68, 69, 78, 79, 80, 70, 71, 60, 61, 62, 50, 51, 41, 95, 96, 84, , 11, 12, 2]

  const movementNums = [1, -1, 10, -10]

  // Creates the grid and stores each cell in to cellArray 
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
    placeMonster(monsterOneStart)
    placeMonster(monsterTwoStart)
    placeCharacter(startingPosition)
    keyPlacement()
    setInterval(() => {
      moveMonsterOne()
      moveMonsterTwo()
    }, 1000)

  }


  // Adds character to the grid and accepts position as the argument
  const placeCharacter = (position) => {
    //const character = document.createElement('img')
    //character.src = `./images/char${charNum}.jpg`
    //character.id = 'character'
    //cellArray[position].appendChild(character)
    //cellArray[position].classList.add('characterClass')
    const charChild = cellArray[position].childNodes[0]
    charChild.classList.add(charNum)
  }

  // Removes character from the grid
  const removeChar = (position) => {
    //if (cellArray[position].hasChildNodes()) {
    //cellArray[position].removeChild(cellArray[position].querySelector('#character'))
    //}
    cellArray[position].childNodes[0].classList.remove(charNum)
  }

  //Creates forest area in the grid
  const createForest = () => {
    cellArray.map((cell, index) => {
      if (forestCells.includes(index)) cell.classList.add('forestClass')
    })
  }

  // places monster(s) on the grid
  const placeMonster = (position) => {
    //if (position === monsterOnePosition) {
    //  const oneMonster = document.createElement('img')
    //  oneMonster.src = "./images/monster1.jpg"
    //  oneMonster.id = "oneMonster"
    //  cellArray[position].appendChild(oneMonster)
    //} else {
    //  const twoMonster = document.createElement('img')
    //  twoMonster.src = "./images/monster2.jpg"
    //  twoMonster.id = "twoMonster"
    //  cellArray[position].appendChild(twoMonster)
    //}
    const monsterChild = cellArray[position].childNodes[0]
    if (position === monsterOnePosition) {
      monsterChild.classList.add('monsterOneClass')
    } else {
      monsterChild.classList.add('monsterTwoClass')
    }

  }

  // removes the monsterClass from previous cell
  const removeMonster = (position) => {
    //if (cellArray[position].hasChildNodes()) {
    //if (position === monsterOnePosition) {
    //  cellArray[position].removeChild(cellArray[position].querySelector('#oneMonster'))
    //} else {
    //  cellArray[position].removeChild(cellArray[position].querySelector('#twoMonster'))
    //}
    //}
    if (position === monsterOnePosition) {
      cellArray[position].childNodes[0].classList.remove('monsterOneClass')
    } else {
      cellArray[position].childNodes[0].classList.remove('monsterTwoClass')
    }
  }

  const keyPlacement = () => {
    keyPosition = randomizer(cellCount - 1)
    if (keyPosition === characterPosition) {
      keyPlacement()
    }
    //const keyImage = document.createElement('img')
    //keyImage.src = "./images/key.jpg"
    //keyImage.id = "keyImage"
    //cellArray[keyPosition].appendChild(keyImage)
    cellArray[keyPosition].childNodes[0].classList.add('keyClass')
  }

  // Randomizer function to reuse in various places
  const randomizer = (limit) => {
    return Math.floor(Math.random() * limit)
  }

  const resetGame = () => {
    lives = 5
    keys = 0
    document.getElementById('lives').innerText = lives
    document.getElementById('keys').innerText = keys
    removeMonster(monsterOnePosition)
    removeMonster(monsterTwoPosition)
    removeChar(characterPosition)
    placeCharacter(startingPosition)
    characterPosition = startingPosition
    monsterOnePosition = monsterOneStart
    monsterTwoPosition = monsterTwoStart

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
      console.log('oops')
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
        document.getElementById('lives').innerText = lives
        if (lives === 0) {
          resetGame()
        }
      }
    }

    // Condition for if character clashes with Monsters
    if (monsterOnePosition === characterPosition || monsterTwoPosition === characterPosition) {
      lives--
      document.getElementById('lives').innerText = lives
      if (lives === 0) {
        resetGame()
      }
    }

    // Condition for collecting keys
    if (keyPosition === characterPosition) {
      //cellArray[keyPosition].removeChild(cellArray[position].querySelector('#keyImage'))
      cellArray[keyPosition].childNodes[0].classList.remove('keyClass')
      console.log('got it')
      keyPlacement()
      keys++
      document.getElementById('keys').innerText = keys
      if (keys === 5) {
        resetGame()
      }
    }

    placeCharacter(characterPosition)
  }

  // Event listener for keyboard keys
  characters.forEach(i => i.addEventListener('click', () => {
    if (characterPosition === startingPosition) {
      removeChar(characterPosition)
      console.log('choosing?', i.classList)
      if (i.id === 'char3') {
        charNum = 'characterThreeClass'
      } else if (i.id === 'char2') {
        charNum = 'characterTwoClass'
      } else {
        charNum = 'characterOneClass'
      }
      placeCharacter(characterPosition)
    }
  }))


  document.addEventListener('keydown', movingCharacter)

  createGrid()

  document.getElementById('lives').innerText = lives
  document.getElementById('keys').innerText = keys

}

window.addEventListener('DOMContentLoaded', init)