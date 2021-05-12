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
	/**c := cors.New(cors.Options{
		AllowCredentials: true,
	})
	//za cors ako bude trebalo
	handler := c.Handler(r)
	//http.ListenAndServe(":8080", handler)*/
	log.Fatal(http.ListenAndServe(":5000", r))

}
