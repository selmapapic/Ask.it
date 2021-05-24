![logo2](https://user-images.githubusercontent.com/56277623/118417516-aeebf580-b6b4-11eb-9b3c-a79dfa12a2ef.jpg)

## Overview
Ask.it is a full stack web application made with Go and React.js that allows users to ask questions and give answers to other user's questions. :question: 

This project is deployed to Heroku: 
> Frontend: [https://askit-go-react-app.herokuapp.com/](https://askit-go-react-app.herokuapp.com/)
> 
> Backend Server: [https://askit-go-server.herokuapp.com/](https://askit-go-server.herokuapp.com/)
> 

The video below shows the app with all its features working successfully. It is run on localhost since there are some CORS errors after deployment to Heroku.


https://user-images.githubusercontent.com/56277623/118415758-8bbd4800-b6ac-11eb-869e-8cafa3328bd8.mp4


## Run on localhost
To run the application locally you should:
1. Clone/download the project to Visual Studio Code
2. Checkout to branch *localhostVersion*
````
git checkout localhostVersion
````
3. Run *go-server* from terminal by
````
cd go-server
go run .
````
4. Create a new terminal and run frontend by
````
cd client
npm run start
````
- This way the application can be run without any CORS errors that are present when using Heroku deployment links. 

## Features
* Homepage (newest questions, users with most questions and most liked questions displayed)
* User registration (JWT + cookies used, user passwords hashed using [bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt) package)
* Edit profile
* Ask questions, add answers
* Like/dislike questions and answers
* Search and sort questions
* Edit questions and answers
* Get email when someone's question is answered

## Tech :computer:
* Go
* React.js
* MySQL Azure Database
* JSON Web Token - [jwt-go](https://github.com/dgrijalva/jwt-go)
* Bootstrap
