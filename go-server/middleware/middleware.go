package middleware

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"go-server/config"
	"go-server/models"
	"net/http"
)

var database *sql.DB

func init() {
	createDBInstance()
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func createDBInstance() {
	db, err := config.GetMySQLDb()
	checkError(err)
	database = db
}

//ova se exportuje
func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	users := getAllUsers()
	json.NewEncoder(w).Encode(users)
}

func GetAllQuestions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	questions := getAllQuestions()
	json.NewEncoder(w).Encode(questions)
}

//ova radi sa bazom
func getAllUsers() []models.User {
	query, err := database.Query("SELECT * FROM user")

	checkError(err)

	user := models.User{}
	res := []models.User{}

	for query.Next() {
		var id int
		var name, surname, email, password string
		err = query.Scan(&id, &name, &surname, &email, &password)
		checkError(err)

		user.Id = id
		user.Name = name
		user.Surname = surname
		user.Email = email
		user.Password = password
		res = append(res, user)
	}
	return res
}

func getAllQuestions() []models.Question {
	query, err := database.Query("SELECT * FROM question")

	checkError(err)

	question := models.Question{}
	res := []models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		checkError(err)

		question.Id = id
		question.Title = title
		question.Text = text
		question.Date = date
		question.Like = like
		question.Dislike = dislike
		question.UserId = userId
		res = append(res, question)
	}
	return res
}

func insertQuestion(question models.Question) {
	statement, err := database.Prepare("INSERT INTO question (title, text, date, like, dislike, userId) VALUES (?,?,?,?,?,?)")
	checkError(err)

	res, err := statement.Exec(question.Title, question.Text, question.Date, question.Like, question.Dislike, question.UserId)
	checkError(err)

	id, err := res.LastInsertId()
	checkError(err)

	fmt.Println("Added row with id ", id)

}