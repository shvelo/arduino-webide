if NOT EXIST -d %~dp0/node_modules npm install %~dp0 --production
grunt --gruntfile %~dp0/Gruntfile.js chrome