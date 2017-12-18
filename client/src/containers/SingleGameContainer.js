import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Game from '../components/Game/SingleGame';

let javascript1 = `const Auth = ({component: Component, path, auth}) => (
  <Route exact path={path} render={(props) => (
    !auth ? (
      <Component {...props} />
    ) : (
      <Redirect to='/lobby' />
    )
  )} />
);
`
;
let javascript2 = `function binarySearch(array, value, key) {
    key = !key ? id : typeof key === 'string' ? get(key) : key;
    value = key(value);
    var middle = Math.floor(array.length / 2);
    var left = 0;
    var right = array.length;
    while (right >= left) {
      var middleValue = key(array[middle]);
      if (middleValue === value) {
        return middle;
      } else if (middleValue > value) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
      middle = Math.floor((left + right) / 2);
    }
    return -1;
  }
`;
let javascript3 = `function makeSub(a, b) {
  subsent = sent.substring(a, b);
  return subsent;
}

function newMake() {
  a = a + 3;
  b = a + siz;
  makeSub(a, b);
  return subsent;
}

function doIt() {
  for (var i = 1; i <= slen ; i++) {
    setTimeout("document.z.textdisplay.value = newMake()", i * 300);
    setTimeout("window.status = newMake()", i * 300);
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
    axios.post(
      '/api/register',
      {
        username: this.state.username,
        password: this.state.password
      }
    )
    .then(() => this.props.fetchUser()).then(() => this.setState({error: ''}))
    .then(() => this.props.history.push('/lobby'))
    .catch(error => { this.setState({error: 'Invalid Credentials'}); });
  }
`;
let javascript5 = `function Node(data) {
  this.data = data;
  this.previous = null;
  this.next = null;
}

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.numberOfValues = 0;
}

DoublyLinkedList.prototype.add = function (data) {
  var node = new Node(data);
  if(!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;
  }
  this.numberOfValues++;
};
`;
let javascript6 = `exports.LinkedList.prototype.remove = function (data) {
    if (this.first === null) {
      return false;
    }
    var temp = this.first;
    var next;
    var prev;
    while (temp) {
      if (temp.data === data) {
        next = temp.next;
        prev = temp.prev;
        if (next) {
          next.prev = prev;
        }
        if (prev) {
          prev.next = next;
        }
        if (temp === this.first) {
          this.first = next;
        }
        if (temp === this.last) {
          this.last = prev;
        }
        return true;
      }
      temp = temp.next;
    }
    return false;
  };
`;

let ruby1 = `def push(key, value=key)
  raise ArgumentError, "Heap keys must not be nil." unless key
  node = Node.new(key, value)
  # Add new node to the left of the @next node
  if @next
    node.right = @next
    node.left = @next.left
    node.left.right = node
    @next.left = node
    if @compare_fn[key, @next.key]
      @next = node
    end
  else
    @next = node
  end
  @size += 1

  arr = []
  w = @next.right
  until w == @next do
    arr << w.value
    w = w.right
end
`;
let ruby2 = `def self.shell_sort(container)
  increment = container.size/2
  while increment > 0 do
    (increment..container.size-1).each do |i|
      temp = container[i]
      j = i
      while j >= increment && container[j - increment] > temp do
        container[j] = container[j-increment]
        j -= increment
      end
      container[j] = temp
    end
    increment = (increment == 2 ? 1 : (increment / 2.2).round)
  end
  container
end
`;
let ruby3 = `def self.mergesort(container)
  return container if container.size <= 1
  mid   = container.size / 2
  left  = container[0...mid]
  right = container[mid...container.size]
  merge(mergesort(left), mergesort(right))
end

def self.merge(left, right)
  sorted = []
  until left.empty? or right.empty?
    left.first <= right.first ? sorted << left.shift : sorted << right.shift
  end
  sorted + left + right
end
`;
let ruby4 = `def self.binary_search(container, item)
  return nil if item.nil?
  low = 0
  high = container.size - 1
  while low <= high
    mid = (low + high) / 2
    val = container[mid]
    if val > item
      high = mid - 1
    elsif val < item
      low = mid + 1
    else
      return val
    end
  end
  nil
end
`;
let ruby5 = `class TwoLabs < TkFrame
  def cswap
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
  :sindh => 'Karachi',
  :punjab => 'Lahore'
}
capitals[:westbengal] = 'Kolkata'
capitals[:karnataka] = 'Bengaluru'

def kmp_search(substring)
  Algorithms::Search.kmp_search(self, substring)
end

begin
  require 'CString'
rescue LoadError
end
`;

let java1 = `public class OracleJdbcTest {
  String driverClass = "oracle.jdbc.driver.OracleDriver";
  Connection con;

  public void init(FileInputStream fs)
    throws ClassNotFoundException, SQLException, FileNotFoundException, IOException {
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
}
`;
let java4 = `private void createThumbnail(String filename, int thumbWidth, int thumbHeight, int quality, String outFilename)
  throws InterruptedException, FileNotFoundException, IOException {
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
    }
  }
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
  def __init__(self, ftp, name, dir, filepath, date_string, time_string, size = 0):
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

let cplusplus1 = `int main() {
	const char *s = "Hello World";
	cout << " INPUT: " << endl;
	cout << s << endl << endl;

	string base=alg::CBase64::encodeBase64((unsigned char *) s, strlen(s));
	cout << " encodeBase64: " << endl;
	cout << base << endl << endl;

	cout << " decodeBase64: " << endl;
	cout << alg::CBase64::decodeBase64(base) << endl;
}
`;
let cplusplus2 = `void merge(int a[], int temp[], int left, int mid, int right){
  int i = left, j = mid, k = left;
  while (i <= mid - 1 && j <= right){
    if (a[i] <= a[j]){
      temp[k++] = a[i++];
    } else {
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
let cplusplus3 = `quicksort(int s[], int left, int right)
{
  int i = left, j = right, pivot;
  pivot = s[(left + right) / 2];
  while (i <= j){
    while (s[i] < pivot) i++;
    while (s[j] > pivot) j--;
    if (i <= j)
      swap(&s[i], &s[j]);
      i++; j--;
  }
  if (left < j) quicksort(s, left, j);
  if (right > i) quicksort(s, i, right);
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

  cl = malloc(sizeof(n_obj*) * NUM_OBJECTS);

  for(i = 0; i < NUM_OBJECTS; i++)
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

let noncode1 = `In Harry Potter and the Sorcerer's Stone, Harry, an orphan, lives with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley.

One day just before his eleventh birthday, an owl tries to deliver a mysterious letter, the first of a sequence of events that end in Harry meeting a giant man named Hagrid. Hagrid explains Harry's history to him: When he was a baby, the Dark wizard, Lord Voldemort, attacked and killed his parents in an attempt to kill Harry; but the only mark on Harry was a mysterious lightning-bolt scar on his forehead.
`;
let noncode2 = `Rubik's Cube is a mechanical puzzle invented in 1974. Originally called the "Magic Cube" by its inventor, this puzzle was renamed "Rubik's Cube". It is said to be the world's best-selling toy, with over 300,000,000 Rubik's Cubes and imitations sold worldwide. The puzzle consists of the twenty-six unique miniature cubes on the surface.

In a typical Cube, each face is covered by nine stickers of one of six solid colours. When the puzzle is solved, each face of the Cube is a solid colour. A normal (3x3x3) Rubik's Cube can have forty-three trillion different positions (permutations).

Many speedcubing competitions have been held to determine who can solve the Rubik's Cube in the shortest time.
`;
let noncode3 = `A tornado is a violently rotating column of air that is in contact with both the surface of the earth and a cumulonimbus cloud or, in rare cases, the base of a cumulus cloud. They are often referred to as twisters or cyclones. Tornadoes come in many shapes and sizes, but they are typically in the form of a visible condensation funnel, whose narrow end touches the earth and is often encircled by a cloud of debris and dust.

Most tornadoes have wind speeds less than 110 miles per hour (177 km/h), are about 250 feet (76 m) across, and travel a few miles (several kilometers) before dissipating. The most extreme tornadoes can attain wind speeds of more than 300 miles per hour (483 km/h).
`;
let noncode4 = `Independence Day, commonly known as the Fourth of July, is a federal holiday in the United States commemorating the adoption of the Declaration of Independence on July 4, 1776, declaring independence from the Kingdom of Great Britain.

As a federal holiday, all non-essential federal institutions (like the postal service and federal courts) are closed on that day. Independence Day is commonly associated with fireworks, parades, barbecues, carnivals, fairs, picnics, concerts, baseball games, family reunions, political speeches and ceremonies, and various other public and private events celebrating the history, government, and traditions of the United States. Independence Day is the national day of the United States.
`;
let noncode5 = `Sudoku is a logic-based number placement puzzle. The goal is to fill a 9x9 grid so that each column, each row, and each of the nine 3x3 boxes (also called blocks or regions) contains the digits from 1 to 9 only one time each. The puzzle setter provides a partially completed grid. The modern puzzle was invented by an American architect, Howard Garns, in 1979 and published by Dell Magazines under the name "Number Place".

It became popular in Japan in 1986, after it was published by Nikoli and given the name Sudoku, meaning single number. The numerals in Sudoku puzzles are used for convenience; arithmetic relationships between numerals are irrelevant. Any set of distinct symbols will do, such as letters, shapes, or colours.
`;
let noncode6 = `The first photosynthetic organisms probably evolved about 3,500 million years ago, early in the evolutionary history of life, when all forms of life on Earth were microorganisms and the atmosphere had much more carbon dioxide. They most likely used hydrogen or hydrogen sulfide as sources of electrons, rather than water.

Cyanobacteria appeared later, around 3,000 million years ago, and drastically changed the Earth when they began to oxygenate the atmosphere, beginning about 2,400 million years ago. This new atmosphere allowed the evolution of complex life such as protists. Eventually, one of these protists formed a symbiotic relationship with a cyanobacterium, producing the ancestor of many plants and algae.
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
