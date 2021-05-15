package main

import (
	"go-server/router"
	"log"
	"net/http"
	"os"
	"path/filepath"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/joho/godotenv"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	r := router.Router()
	ex, er := os.Executable()
	if er != nil {
		panic(er)
	}
	exPath := filepath.Dir(ex)
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	fs := http.FileServer(http.Dir(exPath + "/build"))
	http.Handle("/", fs)

	port, ok := os.LookupEnv("PORT")

	if !ok {
		port = "5000"
	}

	/**c := cors.New(cors.Options{
		AllowCredentials: true,
	})
	//za cors ako bude trebalo
	handler := c.Handler(r)
	//http.ListenAndServe(":8080", handler)*/

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(headersOk, originsOk, methodsOk)(r)))

}
