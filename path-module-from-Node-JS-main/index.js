const path = require("path");

// On POSIX:
console.log(path.basename("C:\\temp\\myfile.html"));
// Returns: 'C:\\temp\\myfile.html'

//On Windows:
console.log(path.basename("C:\\temp\\myfile.html"));
// Returns: 'myfile.html'

//On POSIX and Windows: (Consistent on both)
console.log(path.win32.basename("C:\\temp\\myfile.html"));
// Returns: 'myfile.html'

/*
----------------------------------------------------------------
path.basename(path[, ext]):
A TypeError is thrown if path is not a string or if ext is given and is not a string.
----------------------------------------------------------------
*/
console.log(path.basename("/foo/bar/baz/asdf/quux.html"));
// Returns: 'quux.html'

console.log(path.basename("/foo/bar/baz/asdf/quux.html", ".html"));
// Returns: 'quux'

console.log(path.win32.basename("C:\\foo.html", ".html"));
// Returns: 'foo'

console.log(path.win32.basename("C:\\foo.HTML", ".html"));
// Returns: 'foo.HTML'

/*
----------------------------------------------------------------
path.delimiter:
Provides the platform-specific path delimiter:
; for Windows
: for POSIX
----------------------------------------------------------------
*/
//on POSIX:
console.log(process.env.PATH);
// Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

console.log(process.env.PATH.split(path.delimiter));
// Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

// On Windows:
console.log(process.env.PATH);
// Prints: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter);
// Returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']

/*
----------------------------------------------------------------
path.dirname(path):
The path.dirname() method returns the directory name of a path, similar to the Unix dirname command. Trailing directory separators are ignored, see path.sep.

path <string>
Returns: <string>

A TypeError is thrown if path is not a string.
----------------------------------------------------------------
*/
console.log("Dir path is:", path.dirname("/public/data/index.html"));
// Returns: '/public/data'

console.log(path.dirname("/foo/bar/baz/asdf/quux"));
// Returns: '/foo/bar/baz/asdf'

/*
----------------------------------------------------------------
path.extname(path):

The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than the first character of the basename of path (see path.basename()) , an empty string is returned.

path <string>
Returns: <string>

A TypeError is thrown if path is not a string.
----------------------------------------------------------------
*/
console.log(path.extname("index.html"));
// Returns: '.html'

console.log(path.extname("index.coffee.md"));
// Returns: '.md'

console.log(path.extname("index."));
// Returns: '.'

console.log(path.extname("index"));
// Returns: ''

console.log(path.extname(".index"));
// Returns: ''

console.log(path.extname(".index.md"));
// Returns: '.md'

/*
----------------------------------------------------------------
path.isAbsolute(path):
path <string>
Returns: <boolean>

The path.isAbsolute() method determines if path is an absolute path.
If the given path is a zero-length string, false will be returned.

A TypeError is thrown if path is not a string.
----------------------------------------------------------------
*/
// For example, on POSIX:
console.log(path.isAbsolute("/foo/bar")); // true
console.log(path.isAbsolute("/baz/..")); // true
console.log(path.isAbsolute("qux/")); // false
console.log(path.isAbsolute(".")); // false

// On Windows:
console.log(path.isAbsolute("//server")); // true
console.log(path.isAbsolute("\\\\server")); // true
console.log(path.isAbsolute("C:/foo/..")); // true
console.log(path.isAbsolute("C:\\foo\\..")); // true
console.log(path.isAbsolute("bar\\baz")); // false
console.log(path.isAbsolute("bar/baz")); // false
console.log(path.isAbsolute(".")); // false

/*
----------------------------------------------------------------
path.join([...paths]):
...paths <string> A sequence of path segments
Returns: <string>

The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be returned, representing the current working directory.

A TypeError is thrown if any of the path segments is not a string.
----------------------------------------------------------------
*/

console.log(path.join("/foo", "bar", "baz/asdf", "quux", ".."));
// Returns: '/foo/bar/baz/asdf'

console.log(path.join("foo", {}, "bar"));
// Throws 'TypeError: Path must be a string. Received {}'

/*
----------------------------------------------------------------
path.normalize(path):
path <string>
Returns: <string>

The path.normalize() method normalizes the given path, resolving '..' and '.' segments.
When multiple, sequential path segment separation characters are found (e.g. / on POSIX and either \ or / on Windows), they are replaced by a single instance of the platform-specific path segment separator (/ on POSIX and \ on Windows). Trailing separators are preserved.

If the path is a zero-length string, '.' is returned, representing the current working directory.

A TypeError is thrown if path is not a string.
----------------------------------------------------------------
*/

// on POSIX:
console.log(path.normalize("/foo/bar//baz/asdf/quux/.."));
// Returns: '/foo/bar/baz/asdf'

// On Windows:
console.log(path.normalize("C:\\temp\\\\foo\\bar\\..\\"));
// Returns: 'C:\\temp\\foo\\'

// Since Windows recognizes multiple path separators, both separators will be replaced by instances of the Windows preferred separator (\):
console.log(path.win32.normalize("C:////temp\\\\/\\/\\/foo/bar"));
// Returns: 'C:\\temp\\foo\\bar'

/*
----------------------------------------------------------------
path.parse(path):
path <string>
Returns: <Object>

The path.parse() method returns an object whose properties represent significant elements of the path. Trailing directory separators are ignored, see path.sep.

The returned object will have the following properties:

dir <string>
root <string>
base <string>
name <string>
ext <string>
----------------------------------------------------------------
*/

//For example, on POSIX:
console.log(path.parse("/home/user/dir/file.txt"));
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// on windows
console.log(path.parse("C:\\path\\dir\\file.txt"));
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

/*
----------------------------------------------------------------
path.resolve([...paths]):
...paths <string> A sequence of paths or path segments
Returns: <string>

The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

The given sequence of paths is processed from right to left, with each subsequent path prepended until an absolute path is constructed. For instance, given the sequence of path segments: /foo, /bar, baz, calling path.resolve('/foo', '/bar', 'baz') would return /bar/baz because 'baz' is not an absolute path but '/bar' + '/' + 'baz' is.

If, after processing all given path segments, an absolute path has not yet been generated, the current working directory is used.

The resulting path is normalized and trailing slashes are removed unless the path is resolved to the root directory.

Zero-length path segments are ignored.

If no path segments are passed, path.resolve() will return the absolute path of the current working directory.
----------------------------------------------------------------
*/

console.log(path.resolve("/foo/bar", "./baz"));
// Returns: '/foo/bar/baz'

console.log(path.resolve("/foo/bar", "/tmp/file/"));
// Returns: '/tmp/file'

console.log(path.resolve("wwwroot", "static_files/png/", "../gif/image.gif"));
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
