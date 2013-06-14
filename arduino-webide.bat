
if NOT EXIST %~dp0\node_modules call npm install %~dp0
call grunt --version
IF NOT %ERRORLEVEL% EQU 0 call npm install -g grunt-cli
grunt --gruntfile %~dp0\Gruntfile.js chrome
