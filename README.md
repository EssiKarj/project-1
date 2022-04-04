# Monster Crossing - Project 1

This is not only the first project that I created at General Assembly Software Engineering Immersive course but also the very first coding project I have ever done.
 
 
![App Screenshot](https://imgur.com/yNUbd0D.png)
## Deployment
 
The project is deployed in GitHub, [click here](https://essikarj.github.io/project-1/) to play.
 
 
## Technologies used
 
**Frontend:** JavaScript, HTML5, CSS
 
 
 
## Features
 
- Browser-friendly
- CSS Grid play area
- Hand-drawn characters and backgrounds
 
 
## Brief
 
In 7 days, the task was to build a game only using JavaScript, HTML and CSS.
I wanted to create my own game that mixes logic from Pac-Man and Frogger.
 
The aim of the game is to collect keys and avoid getting eaten by monsters. The game also has forest areas where the player can be safe from the monsters but if you're not particularly lucky, you might still lose a life by the mysteries that lurk in there.
 
## Process and key dates
 
- Day 1 - Planning
- Day 2-4 - Have MVP done
- Day 5-6 - Styling and adding extra features
- Day 7 - Polishing code and adding sound
 
 
#### Day 1:
 
First things first, planning. I started with figuring out what the MVP would be and what extra features the game could have.
I was so inspired by the CSS lessons we had on the course prior that I knew I needed to schedule enough time to make the game visually appealing and fun to play with.
 
*Wireframe:*
 
![Wireframe](https://i.imgur.com/qQ5npEO.png)
 
*Grid:*
 
![Grid wireframe](https://i.imgur.com/KP8JQ0e.png)
 
#### Day 2-4:
 
MVP was to have working functionality for a player, a key, the forest area and at least one monster roaming on the grid without going to the forest.
 
With this plan, I was set to start with creating the play area with a for loop where I appended divs to a larger parent div. \
I then quickly found out once I added the forest areas as background to selected divs that the character div would override the background image and would only display one and not both.
Therefore I ended up adding another layer of divs to these cells which would allow the forest image to stay on whilst the character would move freely on top.
 
![Code snippet- grid](https://i.imgur.com/0KpnRlp.png)
 
Then came the movement logic by adding listeners for each arrow key and using the key code values to determine movement on the grid and not past it.
 
![Code snippet - movement](https://i.imgur.com/Ob7MSJg.png)
 
I was able to use the movingCharacter() function as a blueprint for the monster movement with the addition of a general randomizer function and setInterval() to allow monsters move with the mind of their own.
 
By the end of day 3, I was finished with my MVP so I set myself to add another monster. \
First I tried abstracting the monster movement to be reusable but soon faced a bug where both monsters would move in sync the same way or one of them would fail to remove the class and leave a trail of the movements. I fixed it by adding a function for each monster separately, but it is something I would like to revisit later on.
 
Last piece of logic to the game was to add a feature where each time a character would enter a forest area cell, a randomiser function would run and deduct a life if that randomizer returned the value of 1.
 
 
 
#### Day 5-6
 
I scheduled two days for styling with CSS as I wanted to make sure the game would look great and personalised for the theme.
 
I knew from the beginning that I was going to struggle to find imagery for the characters I had in mind so I ended up drawing them myself with Procreate.
This actually then gave me the freedom to add the menu and grid shapes as well to make the classic CSS look more modern.
 
The biggest struggle during the styling days was the sand-colored background on the playgrid that I ended up redoing multiple times over for being too dark or too similar with other features that made the game unreadable.
 
 
#### Day 7 - Hand-in day
 
This was the last day and also the hand-in day so I wanted to spend the extra time left by cleaning up any unused code and adding sounds to some of the actions in the game.
 
 
## Bugs

One of the biggest bugs during this project was when I tried abstracting the function for the monster movement. I wanted to make it more general so I could later on easily add more monsters but in the refactoring phase. The way I first went about it caused the function to create a series of other bugs and issues that eventually I had to leave as it originally was due to time constraints.

## Wins

Once I had my div with a red background (aka the first character prototype) moving, or in this case swapping classes, on the play grid, I couldn't have been happier. It was my first time building something that wasn’t a variation of ‘Hello World’ or a sweet console.log so needless to say it was great.


## Future Features
 
- Responsive for mobile
- Levels of difficulty
- CSS Animations to have more impact in the design
- Refactoring Monster movement functions to only one reusable function

## Key Learnings

The key things I learnt was to schedule time for each part of the project throughout the week, like for instance save two days for styling and finishing MVP by day x. This really helped me to break down the tasks and also the brief sounded less intimidating as it initially seemed after I had a clear plan of what to do and when. 

Another thing was to make functions as simple as possible. This allowed me to have reusable functions and also have more readable code.
