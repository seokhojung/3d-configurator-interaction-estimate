@echo off
setlocal
for /f "delims=" %%v in ('node -p "process.version"') do set NODEV=%%v
for /f "delims=" %%p in ('node -p "process.platform"') do set PLATFORM=%%p
for /f "delims=" %%m in ('node -p "process.versions.node.split(\".\")[0]"') do set MAJOR=%%m
echo Env check: Node %NODEV% (major %MAJOR%) on %PLATFORM%
if %MAJOR% GEQ 20 goto _oknode
echo ERROR: Node >=20 is required. Current: %NODEV%
exit /b 1
:_oknode
if /I "%PLATFORM%"=="win32" goto _okplat
echo ERROR: Use Windows shell (win32) for install/test. Current: %PLATFORM%
exit /b 1
:_okplat
exit /b 0
