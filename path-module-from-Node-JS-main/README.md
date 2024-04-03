# Path Module Javascript

The path module provides utilities for working with file and directory paths. It can be accessed using:

const path = require('path');

## Windows vs. POSIX

The default operation of the path module varies based on the operating system on which a Node.js application is running. Specifically, when running on a Windows operating system, the path module will assume that Windows-style paths are being used.

So using path.basename() might yield different results on POSIX and Windows:

#### On POSIX:

> path.basename('C:\\temp\\myfile.html');
> // Returns: 'C:\\temp\\myfile.html'

To achieve consistent results when working with Windows file paths on any operating system, use [path.win32](https://nodejs.org/api/path.html#path_path_win32):

#### On POSIX and Windows:

> path.win32.basename('C:\\temp\\myfile.html');
> // Returns: 'myfile.html'

To achieve consistent results when working with POSIX file paths on any operating system, use [path.posix](https://nodejs.org/api/path.html#path_path_posix):

#### On POSIX and Windows:

path.posix.basename('/tmp/myfile.html');
// Returns: 'myfile.html'

## path.basename(path[, ext])

The path.basename() method returns the last portion of a path, similar to the Unix basename command. Trailing directory separators are ignored, see [path.sep](https://nodejs.org/api/path.html#path_path_sep).

> path.basename('/foo/bar/baz/asdf/quux.html');
> // Returns: 'quux.html'

> path.basename('/foo/bar/baz/asdf/quux.html', '.html');
> // Returns: 'quux'

Although Windows usually treats file names, including file extensions, in a case-insensitive manner, this function does not. For example, C:\\foo.html and C:\\foo.HTML refer to the same file, but basename treats the extension as a case-sensitive string:

## path.delimiter

Provides the platform-specific path delimiter:

- ; for Windows
- : for POSIX

#### For example, on POSIX:

> console.log(process.env.PATH);
> // Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

> process.env.PATH.split(path.delimiter);
> // Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

#### On Windows:

> console.log(process.env.PATH);
> // Prints: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

> process.env.PATH.split(path.delimiter);
> // Returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']

## path.dirname(path)

- path [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The path.dirname() method returns the directory name of a path, similar to the Unix dirname command. Trailing directory separators are ignored, see [path.sep](https://nodejs.org/api/path.html#path_path_sep).

> path.dirname('/foo/bar/baz/asdf/quux');
> // Returns: '/foo/bar/baz/asdf'

## path.extname(path)

- path [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than the first character of the basename of path (see path.basename()) , an empty string is returned.

> path.extname('index.html');
> // Returns: '.html'

> path.extname('index.coffee.md');
> // Returns: '.md'

> path.extname('index.');
> // Returns: '.'

> path.extname('index');
> // Returns: ''

> path.extname('.index');
> // Returns: ''

> path.extname('.index.md');
> // Returns: '.md'

## path.format(pathObject)

- pathObject [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Any JavaScript object having the following properties:

- dir [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- root [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- base [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- name [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- ext [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

- Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The path.format() method returns a path string from an object. This is the opposite of [path.parse()](https://nodejs.org/api/path.html#path_path_parse_path).

When providing properties to the pathObject remember that there are combinations where one property has priority over another:

- pathObject.root is ignored if pathObject.dir is provided
- pathObject.ext and pathObject.name are ignored if pathObject.base exists

#### For example, on POSIX:

// If `dir`, `root` and `base` are provided,
// `${dir}${path.sep}${base}`
// will be returned. `root` is ignored.path.format({
root: '/ignored',
dir: '/home/user/dir',
base: 'file.txt'
});
// Returns: '/home/user/dir/file.txt'

// `root` will be used if `dir` is not specified.
// If only `root` is provided or `dir` is equal to `root` then the
// platform separator will not be included. `ext` will be ignored.path.format({
root: '/',
base: 'file.txt',
ext: 'ignored'
});
// Returns: '/file.txt'

// `name` + `ext` will be used if `base` is not specified.path.format({
root: '/',
name: 'file',
ext: '.txt'
});
// Returns: '/file.txt'

#### On Windows:

path.format({
dir: 'C:\\path\\dir',
base: 'file.txt'
});
// Returns: 'C:\\path\\dir\\file.txt'

## path.isAbsolute(path)

- path [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- Returns: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

The path.isAbsolute() method determines if path is an absolute path.
If the given path is a zero-length string, false will be returned.

#### For example, on POSIX:

> path.isAbsolute('/foo/bar'); // true
> path.isAbsolute('/baz/..'); // true
> path.isAbsolute('qux/'); // false
> path.isAbsolute('.'); // false

#### On Windows:

> path.isAbsolute('//server'); // true
> path.isAbsolute('\\\\server'); // true
> path.isAbsolute('C:/foo/..'); // true
> path.isAbsolute('C:\\foo\\..'); // true
> path.isAbsolute('bar\\baz'); // false
> path.isAbsolute('bar/baz'); // false
> path.isAbsolute('.'); // false

## path.join([...paths])

- ...paths [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A sequence of path segments
- Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be returned, representing the current working directory.

> path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
> // Returns: '/foo/bar/baz/asdf'

> path.join('foo', {}, 'bar');
> // Throws 'TypeError: Path must be a string. Received {}'

## path.normalize(path)

- path [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The path.normalize() method normalizes the given path, resolving '..' and '.' segments.

When multiple, sequential path segment separation characters are found (e.g. / on POSIX and either \ or / on Windows), they are replaced by a single instance of the platform-specific path segment separator (/ on POSIX and \ on Windows). Trailing separators are preserved.

If the path is a zero-length string, '.' is returned, representing the current working directory.

#### For example, on POSIX:

> path.normalize('/foo/bar//baz/asdf/quux/..');
> // Returns: '/foo/bar/baz/asdf'

#### On Windows:

> path.normalize('C:\\temp\\\\foo\\bar\\..\\');
> // Returns: 'C:\\temp\\foo\\'

Since Windows recognizes multiple path separators, both separators will be replaced by instances of the Windows preferred separator (\):

> path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
> // Returns: 'C:\\temp\\foo\\bar'

A [TypeError](https://nodejs.org/api/errors.html#errors_class_typeerror) is thrown if path is not a string.

## path.parse(path)

- path [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- Returns: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

The path.parse() method returns an object whose properties represent significant elements of the path. Trailing directory separators are ignored, see [path.sep](https://nodejs.org/api/path.html#path_path_sep).

The returned object will have the following properties:

- dir [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- root [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- base [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- name [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
- ext [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

#### For example, on POSIX:

> path.parse('/home/user/dir/file.txt');
> // Returns:
> // { root: '/',
> // dir: '/home/user/dir',
> // base: 'file.txt',
> // ext: '.txt',
> // name: 'file' }

#### On Windows:

> path.parse('C:\\path\\dir\\file.txt');
> // Returns:
> // { root: 'C:\\',
> // dir: 'C:\\path\\dir',
> // base: 'file.txt',
> // ext: '.txt',
> // name: 'file' }

## path.resolve([...paths])

- ...paths [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) A sequence of paths or path segments
- Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

The given sequence of paths is processed from right to left, with each subsequent path prepended until an absolute path is constructed. For instance, given the sequence of path segments: /foo, /bar, baz, calling path.resolve('/foo', '/bar', 'baz') would return /bar/baz because 'baz' is not an absolute path but '/bar' + '/' + 'baz' is.

If, after processing all given path segments, an absolute path has not yet been generated, the current working directory is used.

The resulting path is normalized and trailing slashes are removed unless the path is resolved to the root directory.

Zero-length path segments are ignored.

If no path segments are passed, path.resolve() will return the absolute path of the current working directory.

> path.resolve('/foo/bar', './baz');
> // Returns: '/foo/bar/baz'

> path.resolve('/foo/bar', '/tmp/file/');
> // Returns: '/tmp/file'

> path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
> // If the current working directory is /home/myself/node,
> // this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
