mkdir "%ProgramFiles%\nodejs\node_modules\npm\muuu"
xcopy .\muuu "%ProgramFiles%\nodejs\node_modules\npm\muuu" /s
cd "%ProgramFiles%\nodejs\node_modules\npm\muuu"
npm install mysql twig express