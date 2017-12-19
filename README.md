<img src="https://github.com/ameet01/codedash/blob/master/docs/header.png" />

By: [Ameet Vadhia](https://github.com/ameet01), [Vickie Chen](https://github.com/PhishyFish)

##### Check out the live [Application](http://www.code-dash.net//)!



## About

Code Dash is an interactive, real-time multiplayer typing speed game for coders.

Users can choose from several different languages, challenge a friend by creating a room, and race to see who is the better typer! Users can also see their opponent's cursor in real time to increase the heat of the battle.

## Instructions

To start a single-player game, select the desired language and click "Create Room". A timer will immediately appear and count down from 5 seconds, after which the game starts. After typing in the code snippet, your typing statistics will appear, showing your typing speed, time elapsed, and accuracy for this game.

To start a multiplayer game, join an existing room or create a new room by selecting the desired language and Multiplayer mode. As soon as two players are in a room, a timer will count down from 10 seconds. Be the first to finish typing the entire snippet correctly to win the game. You can compare your progress to your opponent's by viewing the progress bar on the top right or viewing their cursor in blue directly on the snippet.

## Technologies
- **Backend:** Node.js/Express
- **Database:** MongoDB
- **Frontend:** React/Redux
- **Websockets:** Socket.IO

## Technical Challenges

- The biggest challenge for us was applying the logic to create a smooth typing interface for the player. There cannot be any frustration and everything needs to flow extremely well, including hitting errors, being able to go backward, and being able to hit enter and go to the next line. By using React lifecycle methods coupled with strong logic and state variables, we were able to create a fluid user experience.

- The next biggest challenge for us was multiplayer mode. Integrating Socket.IO, however, made our lives as developers much easier, and we were able to add some neat features:
  * Real-time movement of your opponent's cursor as they're typing
  * Rooms on the lobby page showing up in real time as they're created

## Features

### Update Opponent Cursor During Game

<img src="https://github.com/ameet01/codedash/blob/master/docs/cursor.gif" />

To implement this feature, I use [Socket.IO](https://socket.io/) to open a subscription in our backend, which receives the pointer of the current user and send it to the other user.

- I first send the current cursor pointer to my backend from the frontend on every keypress:
```javascript
socket.emit('cursor', { pointer: this.state.pointer, game: this.gameId });
```

- I then take the cursor pointer in the backend and broadcast it to the specific game's ID, which will instantly send data down to only the other player in the game.
```javascript
socket.on('cursor', function(data) {
    socket.join(data.game);
    socket.broadcast.to(data.game).emit('update opponent cursor', data.pointer);
});
```
- Lastly, I take the pointer in the frontend, and update a state variable called opponentPointer, which is ultimately used to display the opponent's cursor during the game.
```javascript
socket.on('update opponent cursor', (pointer) => this.setState({opponentPointer: pointer}));
```

### Syntax Highlighting

Syntax highlighting is made possible through the [react-syntax-highlight](https://www.npmjs.com/package/react-syntax-highlight) package. This tool gives us a preformatted `<pre><code>` block with syntax highlighting for the designated code snippet.

A second `<pre><code>` block is nested inside the enclosing `<div>`. In order to display the players' currently typed characters on top of the highlighted snippet, we set `highlight` to `position: relative` and `codeArea` to `position: absolute`. Characters in `codeArea` are given `color: hsla(0, 0%, 0%, 0.3)` and changed to `color: transparent` as the player types each in correctly, revealing the highlighted syntax underneath.

```jsx
highlight = <div className="code-area bottom">
  <Highlight
    lang={`${lang}`}
    value={`${this.code}`}
  />
  {codeArea}
</div>;

codeArea = <div className="code-area top">
  <pre id="pre">
    {lineNumbers}
    <code className="code" style={codeStyle}>
      {// character display logic}
    </code>
  </pre>
</div>
```

### Future plans

* Allow for up to four simultaneous players
* Increase number of available coding languages
* More in-depth user statistics
* Add leaderboard
