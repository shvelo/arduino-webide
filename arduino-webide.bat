if NOT EXIST -d %~dp0/node_modules npm install %~dp0
grunt --gruntfile %~dp0/Gruntfile.js chrome