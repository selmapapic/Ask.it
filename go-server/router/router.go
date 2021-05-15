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
	router.HandleFunc("/api/question", middleware.CreateQuestion).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/question", middleware.DeleteQuestion).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/user/mostAnswers", middleware.GetUsersWithMostAnswers).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/mostLiked", middleware.GetMostLikedQuestions).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/answers/few", middleware.GetFewAnswers).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/user/register", middleware.RegisterUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/user/login", middleware.LoginUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/user/one", middleware.GetOneUser).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/user/logout", middleware.LogoutUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/question/like", middleware.QuestionLike).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/question/dislike", middleware.QuestionDislike).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/user/questions", middleware.GetUserQuestions).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/user/one/info", middleware.GetUserQuestionsInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/user/update", middleware.UpdateUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/user/update/password", middleware.UpdateUserPassword).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/question/answers", middleware.GetAnswersForQuestion).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/question/id", middleware.GetQuestionForId).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/answer", middleware.InsertAnswer).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/answer/like", middleware.AnswerLike).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/answer/dislike", middleware.AnswerDislike).Methods("POST", "OPTIONS")

	return router
}
