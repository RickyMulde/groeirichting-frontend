@echo off
echo ========================================
echo Promoten van dev naar master (Frontend)
echo ========================================
echo.

echo [0/5] Controleren of je op dev branch zit...
git branch --show-current | findstr /C:"dev" >nul
if %errorlevel% neq 0 (
    echo ERROR: Je zit niet op dev branch. Switch eerst naar dev branch.
    pause
    exit /b 1
)
echo OK: Je zit op dev branch

echo.
echo [1/5] Switchen naar master branch...
git checkout master
if %errorlevel% neq 0 (
    echo ERROR: Kon niet switchen naar master branch
    pause
    exit /b 1
)

echo.
echo [2/5] Mergen van dev in master...
git merge dev
if %errorlevel% neq 0 (
    echo ERROR: Merge gefaald. Los merge conflicten op en probeer opnieuw.
    echo.
    echo Merge afbreken en terugswitchen naar dev branch...
    git merge --abort
    git checkout dev
    if %errorlevel% neq 0 (
        echo WAARSCHUWING: Kon niet terugswitchen naar dev. Je zit nu op master branch.
        echo Los de merge conflicten handmatig op en commit, of gebruik: git merge --abort
    ) else (
        echo OK: Merge afgebroken en terug op dev branch
    )
    pause
    exit /b 1
)

echo.
echo [3/5] Pushen naar origin/master...
git push origin master
if %errorlevel% neq 0 (
    echo ERROR: Push gefaald
    pause
    exit /b 1
)

echo.
echo [4/5] Terugswitchen naar dev branch...
git checkout dev
if %errorlevel% neq 0 (
    echo ERROR: Kon niet terugswitchen naar dev branch
    pause
    exit /b 1
)

echo.
echo [5/5] Controleren of je weer op dev branch zit...
git branch --show-current | findstr /C:"dev" >nul
if %errorlevel% neq 0 (
    echo WAARSCHUWING: Je zit niet op dev branch na het script
) else (
    echo OK: Je zit weer op dev branch
)

echo.
echo ========================================
echo SUCCES! Code is gepromoveerd naar master
echo Je bent nu weer op dev branch
echo ========================================
pause

