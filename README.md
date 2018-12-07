# brunch-files-inject

Inspired by https://github.com/klei/gulp-inject

Inject compiled javascript and css files into your index.html

## Usage
Install the plugin via npm with `npm install --save-dev brunch-files-inject`.

Or, do a manual install:
- Add "brunch-inject-files": "x.y.z" to package.json of your brunch app. Pick a plugin version that corresponds to your minor (y) brunch version.
- If you want to use git version of plugin, add "brunch-inject-files": "https://github.com/alexbrandonketchum/brunch-files-inject.git".

The plugin looks for specific comments in `/assets/index.html` and replaces them with the appropriate tags. The comments are:
- `<!-- inject:css -->`
- `<!-- inject:js -->`

#### Example
Before:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React Boilerplate with Brunch</title>
    <!-- inject:css -->
</head>
<body>
    <div id="app"></div>
    
    <!-- inject:js -->
</body>
</html>
```
After:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React Boilerplate with Brunch</title>
    <link rel="stylesheet" href="css/app.css"/>
</head>
<body>
    <div id="app"></div>
    
    <script src="js/vendor.js"></script>
	<script src="js/app.js"></script>
	<script>require('index')</script>
</body>
</html>
```

**Notice that `<script>require('index')</script>` was added by the plugin as well.**
This is currently added after the javascript tags, but I may consider adding a seperate comment for it in the future. `'index'` is used by default, but it can be changed in the `config.plugins.filesinject` object, example:
```
module.exports = {
    // ...
    plugins: {
        filesinject: {
            requireFile: 'initialize'
        }
    }
};
```

One final thing to note is that plugin uses the config to get build directory (`config.paths.public`) so you don't need to worry about changing the directory to something other then public.

## License

MIT License

Copyright (c) 2018 Alex Ketchum (http://alexketchum.me/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
