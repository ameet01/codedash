import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Game from '../components/Game/MultiGame';

let javascript1 = `const Auth = ({component: Component, path, auth}) => (\n`
//   <Route exact path={path} render={(props) => (
//     !auth ? (
//       <Component {...props} />
//     ) : (
//       <Redirect to='/lobby' />
//     )
//   )} />
// );
;
let javascript2 = `setTimeout("document.bgColor='white'", 1000)
setTimeout("document.bgColor='lightpink'", 1500)
setTimeout("document.bgColor = 'pink'", 2000)
setTimeout("document.bgColor =  'deeppink'", 2500)
setTimeout("document.bgColor = 'red'", 3000)
setTimeout("document.bgColor = 'tomato'", 3500)
setTimeout("document.bgColor = 'darkred'", 4000)
`;
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
}
`;
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
  }
`;
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
};
`;
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
};
`;

let ruby1 = `key.each { | k, v |
    if ct == 8 then
        print ": "
        ct = 0
    else
        print ", "
    end
    ct = ct + 1
    print "#{v} => #{k}"
}
print "!!"
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
  end
`;
let ruby3 = `for i in (1..4)
    print i," "
end
print ": "

for i in (1...4)
    print i," "
end
print ", "

# Running through a list (which is what they do).
items = [ 'Mark', 12, 'goobers', 18.45 ]
for it in items
    print it, " "
end
print " - "

# Go through the legal subscript values of an array.
for i in (0...items.length)
    print items[0..i].join(" "), ": "
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
end
`;
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
  end
`;
let ruby6 = `capitals = {
:sindh  => 'Karachi',
:punjab => 'Lahore'
}
capitals[:westbengal] = 'Kolkata'
capitals[:karnataka] = 'Bengaluru'
`;

let java1 = `public class OracleJdbcTest {
    String driverClass = "oracle.jdbc.driver.OracleDriver";
    Connection con;

    public void init(FileInputStream fs) throws ClassNotFoundException, SQLException, FileNotFoundException, IOException {
        Properties props = new Properties();
        props.load(fs);
        String url = props.getProperty("db.url");
        String userName = props.getProperty("db.user");
        String password = props.getProperty("db.password");
        Class.forName(driverClass);
        con=DriverManager.getConnection(url, userName, password);
    }

    public void fetch() throws SQLException, IOException {
        PreparedStatement ps = con.prepareStatement("select SYSDATE from dual");
        ResultSet rs = ps.executeQuery();
`;
let java2 = `import java.util.zip.*;
import java.io.*;
public class ZipIt {
    public static void main(String args[]) throws IOException {
        if (args.length < 2) {
            System.err.println("usage: java ZipIt Zip.zip file1 file2 file3");
            System.exit(-1);
        }
        File zipFile = new File(args[0]);
        if (zipFile.exists()) {
            System.err.println("Zip file already exists, please try another");
            System.exit(-2);
        }
        FileOutputStream fos = new FileOutputStream(zipFile);
        ZipOutputStream zos = new ZipOutputStream(fos);
        int bytesRead;
        byte[] buffer = new byte[1024];
        CRC32 crc = new CRC32();
`;
let java3 = `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
public class Main {
    public static void main(String[] args)  {
        try {
            URL my_url = new URL("http://www.viralpatel.net/blogs/");
            BufferedReader br = new BufferedReader(new InputStreamReader(my_url.openStream()));
            String strTemp = "";
            while(null != (strTemp = br.readLine())){
                System.out.println(strTemp);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}`;
let java4 = `private void createThumbnail(String filename, int thumbWidth, int thumbHeight, int quality, String outFilename)
        throws InterruptedException, FileNotFoundException, IOException
    {
        Image image = Toolkit.getDefaultToolkit().getImage(filename);
        MediaTracker mediaTracker = new MediaTracker(new Container());
        mediaTracker.addImage(image, 0);
        mediaTracker.waitForID(0);

        double thumbRatio = (double)thumbWidth / (double)thumbHeight;
        int imageWidth = image.getWidth(null);
        int imageHeight = image.getHeight(null);
        double imageRatio = (double)imageWidth / (double)imageHeight;
        if (thumbRatio < imageRatio) {
            thumbHeight = (int)(thumbWidth / imageRatio);
        } else {
            thumbWidth = (int)(thumbHeight * imageRatio);
`;
let java5 = `public class GeneratePDF {

    public static void main(String[] args) {
        try {
            OutputStream file = new FileOutputStream(new File("C:\\Test.pdf"));

            Document document = new Document();
            PdfWriter.getInstance(document, file);
            document.open();
            document.add(new Paragraph("Hello Kiran"));
            document.add(new Paragraph(new Date().toString()));

            document.close();
            file.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}
`;
let java6 = `import java.util.Map;
import org.apache.commons.lang.ArrayUtils;

public class Main {

  public static void main(String[] args) {
    String[][] countries = { { "United States", "New York" }, { "United Kingdom", "London" },
        { "Netherland", "Amsterdam" }, { "Japan", "Tokyo" }, { "France", "Paris" } };

    Map countryCapitals = ArrayUtils.toMap(countries);

    System.out.println("Capital of Japan is " + countryCapitals.get("Japan"));
    System.out.println("Capital of France is " + countryCapitals.get("France"));
  }
}
`;

let python1 = `import urllib2
import base64
import json
import os
import sys
import re

os.system("clear")
print "-" * 80
print "Command Line Search Tool"
print "-" * 80

def Banner(text):
    print "=" * 70
    print text
    print "=" * 70
    sys.stdout.flush()

def sortByVotes():
    Banner('Sort By Votes')
    url = "http://www.commandlinefu.com/commands/browse/sort-by-votes/json"
    request = urllib2.Request(url)
    response = json.load(urllib2.urlopen(request))
    #print json.dumps(response,indent=2)
    for c in response:
        print "-" * 60
        print c['command']
`;
let python2 = `class BaseCLI(object):
    def __init__(self, description):
        self.parser = argparse.ArgumentParser(
            description=description,
            epilog=TITLE_LINE,
            version=VERSION_STRING
        )
        self.parser.add_argument("host", help="FTP server address, e.g.: ftp.domain.tld")
        self.parser.add_argument("username", help="FTP user name")
        self.parser.add_argument("password", help="FTP password")
        self.parser.add_argument("-p", "--path", help="root path to start the tree walk", default="/")
        self.parser.add_argument(
            "--verbosity", type=int, choices=[0, 1, 2, 3], default=1,
            help="increase output verbosity"
        )
        self.parser.add_argument("-log", "--logfile", help="log into file (UTF8)")
        self.parser.add_argument(
            "--stdout_log", action="store_true",
            help="log to stdout"
        )
`;
let python3 = `class FtpFileItem(object):
    def __init__(self, ftp, name, dir, filepath, date_string, time_string, size=0):
        self.ftp = ftp
        self.name = name
        self.dir = dir
        self.filepath = filepath

        datetime_string = "%s %s" % (date_string, time_string)  # e.g.: 02-16-12 01:11PM
        self.mtime = datetime.datetime.strptime(datetime_string, DATE_FORMAT)
        # ~ print datetime_string, self.mtime

        self.size = size

    def delete(self, dryrun=True):
        if dryrun:
            out(u"dry run: delete %s" % self.filepath)
        else:
            path = self.filepath.encode("utf-8")
            try:
                self.ftp.delete(path)
            except Exception, err:
                out(u"Error deleting %s: %s" % (repr(path), err))

    def __unicode__(self):
        return u"%s %s" % (human_filesize(self.size), posixpath.join(self.dir, self.name))
`;
let python4 = `def install():
    "als inetd Service einrichten"
    OptParser.error("not supported yet!")

def deinstall():
    "als inetdService deinstallieren"
    OptParser.error("not supported yet!")

def start_server():
    # Ausgelagerte .py-Dateien in den Pfad aufnehmen
    sys.path.append( os.path.join( os.getcwd(), "routines" ) )

    from routines import PyAdminCGIHTTPServer

    print "Starte Server..."

    PyAdminCGIHTTPServer.ServerStart()
`;
let python5 = `if __name__ == "__main__":
    OptParser = optparse.OptionParser( usage = __doc__ )

    options, args = OptParser.parse_args()

    if len(args) != 1:
        OptParser.error("wrong argument!")

    action = args[0]

    if action == "install":
        #~ install()
    elif action == "deinstall":
        #~ deinstall()
    elif action == "start":
        start_server()
    elif action == "stop":
        stop_server()
    else:
        OptParser.error("wrong argument!")
`;
let python6 = `def scite_run():
    try:
        script_file = sys.argv[1]
    except IndexError:
        print("ERROR: no filename given!")
        sys.exit(-1)

    script_file = os.path.abspath(os.path.normpath(script_file))
    assert os.path.isfile(script_file), "Skipt %r doesn't exists!" % sys.argv[1]

    filepath, filename = os.path.split(sys.argv[1])
    print("Start %r from %r:" % (filename, filepath))

    os.chdir(filepath)
    current_dir = os.getcwd()
    sys.path.insert(0, current_dir)

    locals_globals = {
        '__builtins__': __builtins__,
        '__name__': '__main__',
        '__file__': filename,
        #~ '__doc__': None,
        #~ '__package__': None
    }
    sys.argv = [script_file]
`;

let cplusplus1 = `void heapify(int a[], int i, int n){
    int l = 2*i+1;
    int r = 2*i+2;
    int largest = i;
    if (l < n && a[l] > a[i]) largest = l;
    if (r < n && a[r] > a[l]) largest = r;
    if (largest != i){
        int tmp = a[i]; a[i] = a[largest]; a[largest] = tmp;
        heapify(a, largest, n);
    }
}

void heapsort(int a[], int n){
    for (int i = n/2-1; i>=0; i--) heapify(a, i, n);
    for (int i = n-1; i>0; i--){
        int tmp = a[0]; a[0] = a[i]; a[i] = tmp;
        heapify(a, 0, i);
    }
}
`;
let cplusplus2 = `void merge(int a[], int temp[], int left, int mid, int right){
    int i = left, j = mid, k = left;
    while (i <= mid - 1 && j <= right){
        if (a[i] <= a[j]){
            temp[k++] = a[i++];
        }else{
            temp[k++] = a[j++];
        }
    }
    while (i <= mid - 1) temp[k++] = a[i++];
    while (j <= right) temp[k++] = a[j++];

    for (i = left; i <= right; i++) a[i] = temp[i];
}

void mergesort(int a[], int temp[], int left, int right){
    int mid = left + (right - left)/2;
    if (right > left){
        mergesort(a, temp, left, mid);
        mergesort(a, temp, mid+1, right);
        merge(a, temp, left, mid+1, right);
    }
}
`;
let cplusplus3 = `quicksort(int s[],int left,int right)
{
  int i=left,j=right,pivot;
  pivot=s[(left+right)/2];
  while (i<=j){
    while (s[i]<pivot) i++;
    while (s[j]>pivot) j--;
    if (i<=j)
      swap(&s[i],&s[j]);
      i++;j--;
  }
  if (left<j) quicksort(s,left,j);
  if (right>i) quicksort(s,i,right);
}
`;
let cplusplus4 = `int main()
{
    int clear_i;
    int i, left_i, cur_sz, cur_num;
    n_obj **cl;
    n_obj *temp;
    n_obj *cur_list;
    n_obj *cur_seq;

    cl = malloc(sizeof(n_obj*)*NUM_OBJECTS);

    for(i=0;i<NUM_OBJECTS;i++)
    {
        cl[i] = Q_OBJ;
        cl[i]->val = NULL;

        temp = Q_OBJ;
        temp->val = Q_SEQ(1);

        temp->val[0] = i + 1;

        temp->next = cl[i];
        cl[i] = temp;

        cur_list = cl[i];
`;
let cplusplus5 = `void StackLinkedList::destroyList()
{
   while(front != NULL)
   {
       NODE *temp = front;
       front = front->N;
       delete temp;
   }
}

void disp(NODE *N)
{
    if ( N == NULL )
    {
        cout << "Stack is Empty!!!" << endl;
    }
    else
    {
        cout << "Id No.     : " << N->data.id <<" ";
        cout << "Full Name  : " << N->data.fname << " ";
        cout <<  N->data.mname << " ";
        cout <<  N->data.lname << endl;
        cout << "Address    : " << N->data.address << endl;
        cout << "Salary     : " << setprecision(15)  << N->data.salary << endl;
        cout << "Tele_no    : " << N->data.tele_no<< endl << endl;
    }
}
`;
let cplusplus6 = `#include <iostream>
using namespace std;
class x
{
  protected:
  int x1;
  public:
  x(int a1):x1(a1){}
};
class y:public x
{
  private:
  int y1;
  public:
  y(int a1, int a2):x::x(a1),y1(a2){ }
  friend void disp(y&);
};
void disp(y &os)
{
    cout << "x1 = " << os.x1 << "  y1 = " << os.y1 << endl;
}

int main()
{
    y oop(12,24);
    disp(oop);
    return 0;
}
`;

let css1 = `@import url(https://fonts.googleapis.com/css?family=Roboto:100,700;);
.snip1585 {
  background-color: #000;
  color: #fff;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  margin: 8px;
  max-width: 315px;
  min-width: 230px;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: 100%;
}

.snip1585 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.45s ease;
  transition: all 0.45s ease;
}
`;
let css2 = `.snip1517 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out;
}

.snip1517 header {
  color: #ffffff;
}

.snip1517 .plan-title {
  line-height: 60px;
  position: relative;
  margin: 0;
  padding: 0 20px;
  font-size: 1.6em;
  letter-spacing: 2px;
  font-weight: 700;
}
`;
let css3 = `html, body, #root, .app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: Lato;
  background: #161925;
  color: #161925;
}

h1, h2, h3, h4 {
  font-family: Raleway;
}

.navbar ,footer {
  flex: 0 0;
  z-index: 2;
}
`;
let css4 = `.serif-font {
  font-family: "Roboto Slab", "Times New Roman", serif;
}

a {
  color: #9c27b0;
}
a:hover, a:focus {
  color: #89229b;
  text-decoration: none;
}
a.text-info:hover, a.text-info:focus {
  color: #00a5bb;
}
a .material-icons {
  vertical-align: middle;
}

legend {
  border-bottom: 0;
}

* {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
}
*:focus {
  outline: 0;
}
`;
let css5 = `.made-with-mk .brand {
  position: relative;
  top: 4px;
  left: -1px;
  letter-spacing: 1px;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 600;
}
.made-with-mk .made-with {
  color: rgba(255, 255, 255, 0.6);
  position: absolute;
  left: 58px;
  top: 14px;
  opacity: 0;
  margin: 0;
  -webkit-transition: 0.55s cubic-bezier(0.6, 0, 0.4, 1);
  -moz-transition: 0.55s cubic-bezier(0.6, 0, 0.4, 1);
  -o-transition: 0.55s cubic-bezier(0.6, 0, 0.4, 1);
  transition: 0.55s cubic-bezier(0.6, 0, 0.4, 1);
}
`;
let css6 = `label.control-label {
  font-size: 11px;
  line-height: 1.07143;
  color: #AAAAAA;
  font-weight: 400;
  margin: 16px 0 0 0;
}

.help-block {
  margin-top: 0;
  font-size: 11px;
}

.form-group {
  padding-bottom: 7px;
  margin: 27px 0 0 0;
}
.form-group .form-control {
  margin-bottom: 7px;
}
`;

let html1 = `<div class="snip1517">
  <div class="plan">
    <header>
      <h4 class="plan-title">

        Starter
      </h4>
      <div class="plan-cost"><span class="plan-price">$19</span><span class="plan-type">/month</span></div>
    </header>
    <ul class="plan-features">
      <li><i class="ion-android-remove"> </i>5GB Linux Web Space</li>
      <li><i class="ion-android-remove"> </i>5 MySQL Databases</li>
      <li><i class="ion-android-remove"> </i>Unlimited Email</li>
      <li><i class="ion-android-remove"> </i>250Gb mo Transfer</li>
      <li><i class="ion-android-remove"> </i>24/7 Tech Support</li>
      <li><i class="ion-android-remove"> </i>Daily Backups</li>
    </ul>
    <div class="plan-select"><a href="">Select Plan</a></div>
`;
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
let html3 = `<figure class="snip1529 hover"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample21.jpg" alt="pr-sample21" />
  <div class="date"><span class="day">17</span><span class="month">May</span></div>
  <figcaption>
    <h3>Down with this sort of thing</h3>
    <p>I'm killing time while I wait for life to shower me with meaning and happiness.</p>
  </figcaption>
  <div class="hover"><i class="ion-android-open"></i></div>
  <a href="#"></a>
</figure>
<figure class="snip1529"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg" alt="pr-sample23" />
  <div class="date"><span class="day">08</span><span class="month">June</span></div>
  <figcaption>
    <h3>The World Ended Yesterday</h3>
    <p>The only skills I have the patience to learn are those that have no real application in life. </p>
  </figcaption>
  <div class="hover"><i class="ion-android-open"></i></div>
  <a href="#"></a>
</figure>
`;
let html4 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Raleway:800" rel="stylesheet">

    <title>Code Typer</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
  </body>
</html>
`;
let html5 = `<a href="#" class="snip1489 ion-ios-star-outline"></a>
<a href="#" class="snip1489 hover blue ion-ios-list-outline"></a>
<a href="#" class="snip1489 ion-ios-chatboxes-outline"></a>
<a href="#" class="snip1489 ion-ios-home-outline"></a>
<a href="#" class="snip1489 ion-ios-pie-outline"></a>
<a href="#" class="snip1489 ion-ios-gear-outline"></a>
`;
let html6 = `<button class="snip1582">Submit</button>
<button class="snip1582 hover">Read More</button>
<button class="snip1582">Add to Cart</button>
<button class="snip1582">Subscribe</button>
`;

let noncode1 = `In Harry Potter and the Sorcerer's Stone, Harry, an orphan, lives with the Dursleys, his horrible aunt and uncle,
and their abominable son, Dudley.

One day just before his eleventh birthday, an owl tries to deliver a mysterious letter, the first of a
sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history
to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt
to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead.
`;
let noncode2 = `In Harry Potter and the Sorcerer's Stone, Harry, an orphan, lives with the Dursleys, his horrible aunt and uncle,
and their abominable son, Dudley.

One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a
sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history
to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt
to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead.
`;
let noncode3 = `In Harry Potter and the Sorcerer's Stone, Harry, an orphan, lives with the Dursleys, his horrible aunt and uncle,
and their abominable son, Dudley.

One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a
sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history
to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt
to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead.
`;
let noncode4 = `In Harry Potter and the Sorcerer's Stone, Harry, an orphan, lives with the Dursleys, his horrible aunt and uncle,
and their abominable son, Dudley.

One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a
sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history
to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt
to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead.
`;
let noncode5 = `In Harry Potter and the Sorcerer's Stone, Harry, an orphan, lives with the Dursleys, his horrible aunt and uncle,
and their abominable son, Dudley.

One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a
sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history
to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt
to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead.
`;
let noncode6 = `In Harry Potter and the Sorcerer's Stone, Harry, an orphan, lives with the Dursleys, his horrible aunt and uncle,
and their abominable son, Dudley.

One day just before his eleventh birthday, an owl tries to deliver a mysterious letter—the first of a
sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history
to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt
to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead.
`;

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
  ],
  'non-code': [
    noncode1, noncode2, noncode3, noncode4, noncode5, noncode6
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
