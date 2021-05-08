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

func insertQuestion(question models.Question) {
	statement, err := database.Prepare("INSERT INTO question (title, text, date, like, dislike, userId) VALUES (?,?,?,?,?,?)")
	checkError(err)

	res, err := statement.Exec(question.Title, question.Text, question.Date, question.Like, question.Dislike, question.UserId)
	checkError(err)

	id, err := res.LastInsertId()
	checkError(err)

	fmt.Println("Added row with id ", id)

}
