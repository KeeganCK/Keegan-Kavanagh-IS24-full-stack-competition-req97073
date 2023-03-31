# Keegan-Kavanagh-IS24-full-stack-competition-req97073

## Cloning the repository

* in your terminal run ```git clone https://github.com/KeeganCK/Keegan-Kavanagh-IS24-full-stack-competition-req97073.git```
* cd into newly created folder

## Start app using docker

* This is the simplest way to start this application. 
* From the starting directory simply run ```docker-compose up --build``` to build the images. 
* The backend should start on port 3000 (http://localhost:3000) and the frontend should start on port 3001 (http://localhost:3001). 
* To stop the docker conatiner hit ```ctrlC``` and to re-start the app again run ```docker-compose up```

## How to start the backend without docker

* The backend should be started first to ensure it gets port 3000. 
* Change into the backend directory using ```cd backend``` then run ```npm install``` to install all dependencies. 
* Finally, run ```node index.js``` to start the server on port 3000 (http://localhost:3000).

## How to start frontend without docker

* The frontend should always be started second so React can ask you to start the app on a different port from 3000, which the backend will be using. 
* First, change into the frontend directory using ```cd frontend```, then run ```npm install```. 
* After that, run ```npm start``` to start up the app. When it prompts you to pick a different port besides 3000, say yes and it should start on port 3001 (http://localhost:3001).