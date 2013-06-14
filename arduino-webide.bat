
@ECHO OFF
Echo First run may take long!
if NOT EXIST %~dp0\node_modules call npm install %~dp0 >nul
call grunt --version >nul
IF NOT %ERRORLEVEL% EQU 0 call npm install -g grunt-cli >nul
grunt --gruntfile %~dp0\Gruntfile.js chrome >nul
