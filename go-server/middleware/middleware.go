package middleware

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"go-server/config"
	"go-server/models"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
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

func GetUsersWithMostAnswers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	users := usersWithMostAnswers()
	json.NewEncoder(w).Encode(users)
}

func GetMostLikedQuestions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	questions := mostLikedQuestions()
	json.NewEncoder(w).Encode(questions)
}

func CreateQuestion(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)

	//posto se dobije unstructured json {"question":{"title":"a","text":"a"}} mora se pravit mapa umjesto obicnog decode >.<
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	result = result["question"].(map[string]interface{})

	var newQ models.QuestionNew
	newQ.Title = result["title"].(string)
	newQ.Text = result["text"].(string)
	insertQuestion(newQ)
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
	query, err := database.Query("SELECT * FROM question q ORDER BY q.dateTime DESC")

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

func insertQuestion(question models.QuestionNew) {
	statement, err := database.Prepare("INSERT INTO question (`title`, `text`, `dateTime`, `like`, `dislike`, `userId`) VALUES (?,?,?,?,?,?);")
	checkError(err)

	res, err := statement.Exec(question.Title, question.Text, time.Now().Format("2006-01-02 15:04:05"), 0, 0, 5)
	checkError(err)

	id, err := res.LastInsertId()
	checkError(err)

	fmt.Println("Added row with id", id)

}

func mostLikedQuestions() []models.Question {
	query, err := database.Query("SELECT * FROM question q ORDER BY q.like DESC LIMIT 5")

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

//select a.answerUserId, count(a.answerUserId) from askitdb.answer a
//group by a.answerUserId
//order by count(a.answerUserId) desc

func getUserForId(idUser int) models.User {
	query, err := database.Query("SELECT * FROM user WHERE id = " + strconv.Itoa(idUser))
	checkError(err)

	user := models.User{}

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
	}

	return user
}

//	query, err := database.Query("SELECT a.answerUserId, COUNT(a.answerUserId) FROM answer a GROUP BY a.answerUserId ORDER BY COUNT(a.answerUserId) DESC")

func usersWithMostAnswers() []models.User {
	query, err := database.Query("SELECT a.answerUserId FROM answer a GROUP BY a.answerUserId ORDER BY COUNT(a.answerUserId) DESC")

	checkError(err)

	res := []models.User{}

	for query.Next() {
		var id int
		err = query.Scan(&id)
		checkError(err)
		var user = getUserForId(id)
		res = append(res, user)
	}
	return res
}
