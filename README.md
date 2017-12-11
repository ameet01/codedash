# Code Typing Project

## Background

The purpose of this application is to create a website where a user can login and take typing tests in code, and has the ability to choose from a multitude of programming languages. There are websites that exist that do exactly this, like Typing.io, however we would like to implement a multiplayer mode where a user can create a "room", and another user can join that room. Both players can then race each other at the same time.

## Functionality & MVPs

- [ ] Create typing test for single player
- [ ] Create rooms for two players to race each other
- [ ] Create authentication system to make user accounts
- [ ] Statistics after each gameplay (WPM, accuracy, time elapsed)
- [ ] Indicators during Typing
 - Red cursor when incorrect
 - Green cursor when correct
 - Enter symbol to show when to click Enter

Bonus:
- [ ] Logs history of players games
- [ ] Private rooms with passwords
- [ ] Let more than 2 users in a room race

## Wireframes

- Splash Page

- Auth Page

- Room Page

- Race Page
 - Modal for creating the room, singleplayer or multieplayer, pick language

- About us page

## Technologies & Technical Challenges

### Technologies
- **Backend: Node.js/Express**
- **Database: MongoDB**
- **Frontend: React**
- **Other: Websockets**

### Challenges
- Displaying indicators to users typing through the code. Every single letter would have to be its own separate HTML element, and they would need to be constantly updated with different selectors in order to style them.
- Allowing players to play and race at the exact same time using Websockets.

## Things we accomplished this weekend
- We have started a basic Node application and incorporated Express/MongoDB/React that has very basic routing/implementation when displayed on our server.

## Group Members & Work Breakdown

Our group consists of two members, Ameet Vadhia and Vickie Chen.

Ameet's primary responsibilities will be:

* Implement Authentication system
* Implement websockets for two users to play against each other
* Implementing statistics in the database to log and display at end of a game

Vickie's primary responsibilities will be:

Researching and setting up the Chrome extension infrastructure
* Figure out how to efficiently use HTML elements with the code for users to type
* Implement colors/indicators when a user is typing
* Splash Page Design

## Implementation Timeline

**Monday Dec 11th**
- Implement authentication system on backend and frontend

**Tuesday Dec 12th**
-

**Wednesday Dec 13th**

**Thursday Dec 14th**

**Friday Dec 15th**

**Saturday Dec 16th**

**Sunday Dec 17th**
