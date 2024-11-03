@echo off

cd models

conda activate plants

start /B python your_flask_app.py

timeout /t 5

start npx react-native run-android