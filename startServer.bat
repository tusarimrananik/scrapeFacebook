@echo off
start "FBClone Server" /min cmd /C "cd /d %USERPROFILE%\Desktop\FBClone && npm start"
start "Ngrok Server" /min cmd /C "ngrok http --url=humane-newt-formally.ngrok-free.app 3000"