# Code Typing Project

## Background

The purpose of this application is to create a website where a user can login and take typing tests in code, and has the ability to choose from a multitude of programming languages. There are websites that exist that do exactly this, like [typing.io](https://typing.io/); however, we would like to implement a multiplayer mode where a user can create a "room", and another user can join that room. Both players can then race each other at the same time.

## Functionality & MVPs

- [ ] Create typing test for single player
- [ ] Create rooms for two players to race each other
- [ ] Create authentication system to make user accounts
- [ ] Statistics after each gameplay (WPM, accuracy, time elapsed)
- [ ] Indicators during typing
  * Red cursor when incorrect
  * Green cursor when correct
  * Enter symbol to show when to add new line

Bonus:
- [ ] Logs history of players games
- [ ] Private rooms with passwords
- [ ] Let more than two users in a room race
- [ ] Filter rooms for specific language

## Wireframes

- Splash Page
<img src="https://github.com/ameet01/flexproject/blob/master/wireframes/splash.png?raw=true" alt="splash" width="600">

- Auth Page
<img src="https://github.com/ameet01/flexproject/blob/master/wireframes/login.png?raw=true" alt="login" width="600">

- Room Page
<img src="https://github.com/ameet01/flexproject/blob/master/wireframes/rooms.png?raw=true" alt="rooms lobby" width="600">
  * Modal for creating the room, single player or multiplayer, pick language
  <img src="https://raw.githubusercontent.com/ameet01/flexproject/master/wireframes/create-rooms.png?raw=true" alt="create room modal" width="600">

- Race Page
<img src="https://github.com/ameet01/flexproject/blob/master/wireframes/race.png?raw=true" alt="race endgame" width="600">

- About Us Page
<img src="https://github.com/ameet01/flexproject/blob/master/wireframes/about.png?raw=true" alt="about us" width="600">

## Technologies & Technical Challenges

### Technologies
- **Backend: Node.js/Express**
- **Database: PostgreSQL**
- **Frontend: React**
- **Other: Websockets**

### Challenges
- Displaying indicators to users typing through the code. Every single letter would have to be its own separate HTML element, and they would need to be constantly updated with different selectors in order to style them.
- Allowing players to play and race at the exact same time using websockets.

## Things we accomplished this weekend
- Watched a Node.js/Express/React tutorial
- Implemented a Node application and incorporated Express/PostgreSQL/React that has very basic routing/implementation when displayed on our server.
- Looked up auth, having a lot of trouble implementing it.

## Group Members & Work Breakdown

Our group consists of two members: [Ameet Vadhia](https://github.com/ameet01) and [Vickie Chen](https://github.com/PhishyFish).

Ameet's primary responsibilities will be:

- Implementing authentication system
- Implementing websockets for two users to play against each other
- Implementing statistics in the database to log and display at end of a game

Vickie's primary responsibilities will be:

- Figuring out how to efficiently use HTML elements with the code for users to type
- Implementing colors/indicators when a user is typing
- Designing Splash/About Us pages

## Implementation Timeline

**Monday, Dec 11<sup>th</sup>**
- Make sure to have fully functional Node app with Express and PostgreSQL (Ameet)
- Implement authentication system on backend and frontend (Ameet)
- Start React views (Vickie)

**Tuesday, Dec 12<sup>th</sup>**
- Start creating splash page with session forms (Vickie)
- Start building single user gameplay (Vickie & Ameet)

**Wednesday, Dec 13<sup>th</sup>**
- Start implementing algorithm to turn code snippets into HTML elements that users can traverse (Vickie & Ameet)
- Create database schema and routes for users/rooms/statistics (Ameet)

**Thursday, Dec 14<sup>th</sup>**
- Further improve on algorithm to turn code snippets into HTML elements that users can traverse (Vickie & Ameet)
- Start working on indicators on the code when users traverse it, e.g. errors and correct letters

**Friday, Dec 15<sup>th</sup>**
- Implement websockets for rooms and start building the logic for users joining another user's room to play

**Saturday, Dec 16<sup>th</sup>**
- Further improve on websockets

**Sunday, Dec 17<sup>th</sup>**
- Final touches to styling
