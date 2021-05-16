package main

import (
	"go-server/router"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	gohandlers "github.com/gorilla/handlers"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	r := router.Router()

	port, ok := os.LookupEnv("PORT")

	if !ok {
		port = "5000"
	}

	ch := gohandlers.CORS(
		gohandlers.AllowedOrigins([]string{"https://askit-go-react-app.herokuapp.com"}),
		gohandlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"}),
		gohandlers.AllowCredentials(),
		gohandlers.AllowedHeaders([]string{"Content-Type", "text/html; charset=utf-8", "application/json;charset=UTF-8"}))

	log.Fatal(http.ListenAndServe(":"+port, ch(r)))
}
