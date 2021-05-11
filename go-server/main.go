package main

import (
	"go-server/router"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	r := router.Router()
	log.Fatal(http.ListenAndServe(":5000", r))

}
