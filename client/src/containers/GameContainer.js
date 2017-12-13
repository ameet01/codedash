import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Game from '../components/Game/Game';

let javascript1 = `const Auth = ({component: Component, path, auth}) => (
  <Route exact path={path} render={(props) => (
      !auth ? (
        <Component {...props} />
      ) : (
        <Redirect to='/lobby' />
      )
    )} />
);`;
let javascript2 = `setTimeout("document.bgColor='white'", 1000)
setTimeout("document.bgColor='lightpink'", 1500)
setTimeout("document.bgColor = 'pink'", 2000)
setTimeout("document.bgColor =  'deeppink'", 2500)
setTimeout("document.bgColor = 'red'", 3000)
setTimeout("document.bgColor = 'tomato'", 3500)
setTimeout("document.bgColor = 'darkred'", 4000)`;
let javascript3 = `function makeSub(a,b) {
subsent = sent.substring(a,b) ;
return subsent;
}

function newMake() {
a = a + 3;
b = a + siz
makeSub(a,b);
return subsent
}


function doIt() {
for (var i = 1; i <= slen ; i++) {
setTimeout("document.z.textdisplay.value = newMake()", i*300);
setTimeout("window.status = newMake()", i*300);
}
}`;
let javascript4 = `class Session extends Component {
  constructor(props) {
    super(props);
    this.state={username: "", password: "", error: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/register', {username: this.state.username, password: this.state.password})
    .then(() => this.props.fetchUser()).then(() => this.setState({error: ''}))
    .then(() => this.props.history.push('/lobby'))
    .catch(error => { this.setState({error: 'Invalid Credentials'}); });
  }`;
let javascript5 = `export const EXPRESS_TEST_START = "EXPRESS_TEST_START";
export const expressTestStart = () => {
    return { type: EXPRESS_TEST_START };
};

export const EXPRESS_TEST_RESULTS = "EXPRESS_TEST_RESULTS";
export const expressTestResults = (data) => {
    return { type: EXPRESS_TEST_RESULTS, data };
};

export const EXPRESS_TEST_ERROR = "EXPRESS_TEST_ERROR";
export const expressTestError = (data) => {
    return { type: EXPRESS_TEST_ERROR, data };
};`;
let javascript6 = `const Routes = () => {
  return (
    <Router>
      <div className="app-container">
        <Route path="/" component={NavBarContainer} />
        <Route exact path="/" component={SplashContainer} />
        <Route exact path="/signup" component={SessionContainer} />
        <Route exact path="/lobby" component={LobbyContainer} />
        <Route exact path="/lobby/:language" component={LobbyContainer} />
        <Route exact path="/game" component={GameContainer} />
        <Route exact path="/game/:language" component={GameContainer} />
        <Route path="/" component={Footer} />
      </div>
    </Router>
  );
};`;

let ruby1 = `key.each { | k, v |
    if ct == 8 then
        print "\n   "
        ct = 0
    else
        print ", "
    end
    ct = ct + 1
    print "#{v} => #{k}"
}
print "\n\n"
`;
let ruby2 = `class List
  # Nodes for the linked list.
  class Node
    # Get the last facility which scans to the end of the list.
    include Follower

    def initialize(d, n = nil)
      @val = d
      @next = n
    end
    attr_reader :next, :val
    attr_writer :next
  end

  # Get the printing facility.
  include Printer

  # Create the list with its first node.
  def initialize(first)
    @head = Node.new(first)
  end`;
let ruby3 = `for i in (1..4)
    print i," "
end
print "\n"

for i in (1...4)
    print i," "
end
print "\n"

# Running through a list (which is what they do).
items = [ 'Mark', 12, 'goobers', 18.45 ]
for it in items
    print it, " "
end
print "\n"

# Go through the legal subscript values of an array.
for i in (0...items.length)
    print items[0..i].join(" "), "\n"
end
`;
let ruby4 = `# Class names must be capitalized.  Technically, it's a constant.
class Fred

  # The initialize method is the constructor.  The @val is
  # an object value.
  def initialize(v)
    @val = v
  end

  # Set it and get it.
  def set(v)
    @val = v
  end

  def get
    return @val
  end
end`;
let ruby5 = `class TwoLabs < TkFrame
  # Switch button colors.
  def cswap
    # Swap each color between the two buttons.
    for loc in ['background', 'foreground', 'activebackground']
      c = @swapbut.cget(loc)
      @swapbut.configure(loc => @stopbut.cget(loc))
      @stopbut.configure(loc => c)
    end
  end

  def initialize
    super
    @swapbut = TkButton.new(self, 'command' => proc { self.cswap } ) {
      text "Swap"
      background '#EECCCC'
      activebackground '#FFEEEE'
      foreground '#990000'
      pack('side' => 'top', 'fill' => 'both')
    }

    # Another button
    @stopbut = TkButton.new(self) {
      text "Exit"
      background '#CCEECC'
      activebackground '#EEFFEE'
      foreground '#009900'
      command { exit }
      pack('side' => 'bottom',  'fill' => 'both')
    }
  end`;
let ruby6 = `capitals = {
:sindh  => 'Karachi',
:punjab => 'Lahore'
}
capitals[:westbengal] = 'Kolkata'
capitals[:karnataka] = 'Bengaluru'`;

let java1 = ``;
let java2 = ``;
let java3 = ``;
let java4 = ``;
let java5 = ``;
let java6 = ``;

let python1 = ``;
let python2 = ``;
let python3 = ``;
let python4 = ``;
let python5 = ``;
let python6 = ``;

let cplusplus1 = ``;
let cplusplus2 = ``;
let cplusplus3 = ``;
let cplusplus4 = ``;
let cplusplus5 = ``;
let cplusplus6 = ``;

let css1 = ``;
let css2 = ``;
let css3 = ``;
let css4 = ``;
let css5 = ``;
let css6 = ``;

let html1 = ``;
let html2 = `<!DOCTYPE html>
<html>
<body>

<h2>JavaScript Variables</h2>

<p id="demo"></p>

<script>
var price1 = 5;
var price2 = 6;
var total = price1 + price2;
document.getElementById("demo").innerHTML =
"The total is: " + total;
</script>

</body>
</html>
`;
let html3 = ``;
let html4 = ``;
let html5 = ``;
let html6 = ``;

const LANGUAGES = {
  'javascript': [
    javascript1, javascript2, javascript3, javascript4, javascript5, javascript6
  ],
  'ruby': [
    ruby1, ruby2, ruby3, ruby4, ruby5, ruby6
  ],
  'java': [
    java1, java2, java3, java4, java5, java6
  ],
  'python': [
    python1, python2, python3, python4, python5, python6
  ],
  'c++': [
    cplusplus1, cplusplus2, cplusplus3, cplusplus4, cplusplus5, cplusplus6
  ],
  'css': [
    css1, css2, css3, css4, css5, css6
  ],
  'html': [
    html1, html2, html3, html4, html5, html6
  ]
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    languages: LANGUAGES
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
