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
- [ ] Filter rooms for specific language

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
- **Database: PostgreSQL**
- **Frontend: React**
- **Other: Websockets**

### Challenges
- Displaying indicators to users typing through the code. Every single letter would have to be its own separate HTML element, and they would need to be constantly updated with different selectors in order to style them.
- Allowing players to play and race at the exact same time using Websockets.

## Things we accomplished this weekend
- Watched a node.js/express/react tutorial
- Implemented a Node application and incorporated Express/PostgreSQL/React that has very basic routing/implementation when displayed on our server.
- Looked up auth, having a lot of trouble implementing it.

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
* Splash/About Us Page Design

## Implementation Timeline

**Monday Dec 11th**
- Make sure to have fully functional node app with express and postgres (Ameet)
- Implement authentication system on backend and frontend (Ameet)
- Start react views (Vickie)

**Tuesday Dec 12th**
- Start creating splash page with session forms (Vickie)
- Start building single user gameplay (Vickie & Ameet)

**Wednesday Dec 13th**
- Start implementing algorithm to turn code snippets into html elements that users can traverse (Vickie & Ameet)
- Create database schema and routes for users/rooms/statistics (Ameet)

**Thursday Dec 14th**
- Further improve on algorithm to turn code snippets into html elements that users can traverse (Vickie & Ameet)
- Start working on indicators on the code when users traverse it, like errors, and correct letters.

**Friday Dec 15th**
- Implement websockets for rooms and start building the logic for users joining another user's room to play

**Saturday Dec 16th**
- Further improve on websockets

**Sunday Dec 17th**
- Final touches to styling
