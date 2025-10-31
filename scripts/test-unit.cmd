@echo off
setlocal ENABLEDELAYEDEXPANSION
rem Run Vitest unit tests on Windows with clear completion marker, minimized output
if not exist test-results mkdir test-results
set "LOG=test-results\unit-%RANDOM%.log"
call npx vitest run --pool=forks --reporter=dot --no-color tests\unit > "%LOG%" 2>&1
set "code=%ERRORLEVEL%"
echo ::VITEST_DONE SUITE=unit CODE=%code% LOG=%LOG%
exit /b %code%
