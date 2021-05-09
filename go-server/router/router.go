package router

import (
	"go-server/middleware"

	"github.com/gorilla/mux"
)

//sluzi za prosljedjivanje requestova tamo gdje treba i eksportuje se u main.go

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/user", middleware.GetAllUsers).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/question", middleware.GetAllQuestions).Methods("GET", "OPTIONS")
	return router
}
