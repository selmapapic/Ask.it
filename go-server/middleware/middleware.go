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

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

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
	//fmt.Println(result)
	json.Unmarshal([]byte(reqBody), &result)
	var id = result["id"].(float64)

	result = result["question"].(map[string]interface{})
	var newQ models.QuestionNew
	newQ.Title = result["title"].(string)
	newQ.Text = result["text"].(string)
	insertQuestion(newQ, int(id))
}

func GetFewAnswers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	answers := getFewAnswers()
	json.NewEncoder(w).Encode(answers)
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	//result = result["question"].(map[string]interface{})

	password, _ := bcrypt.GenerateFromPassword([]byte(result["password"].(string)), 14)
	newUser := models.UserNew{
		Name:     result["name"].(string),
		Surname:  result["surname"].(string),
		Email:    result["email"].(string),
		Password: password,
	}
	json.NewEncoder(w).Encode(newUser)
	insertUser(newUser)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("ev me u loginu")
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	//result = result["question"].(map[string]interface{})

	var user models.User
	user = getUserByEmail(result["email"].(string))

	if user.Id == 0 {
		json.NewEncoder(w).Encode("No user found")
	} else {
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(result["password"].(string)))
		if err != nil {
			json.NewEncoder(w).Encode("Incorrect password!")
			return
		}

		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    strconv.Itoa(user.Id),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //traje 1 dan
		})

		token, err := claims.SignedString([]byte(SecretKey))
		checkError(err)

		cookie := http.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
			HttpOnly: true,
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.SetCookie(w, &cookie)
		json.NewEncoder(w).Encode(user)
	}
}

func GetOneUser(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("jwt")
	//fmt.Println(cookie, "ovo je cookie")
	if cookie == nil {
		json.NewEncoder(w).Encode("No user logged in")
		return
	}

	token, err := jwt.ParseWithClaims(cookie.Value, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		//popravit myb ovaj error neki
		json.NewEncoder(w).Encode("unauth")
		return
	}

	claims := token.Claims.(*jwt.StandardClaims)
	var user models.User

	issuer, _ := strconv.Atoi(claims.Issuer)
	user = getUserForId(issuer)
	//fmt.Println(user, "user")
	json.NewEncoder(w).Encode(user)
}

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour), //expired one hour ago i tako se remove-a
		HttpOnly: true,
	}

	http.SetCookie(w, &cookie)
	json.NewEncoder(w).Encode("user")

}

func QuestionLike(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	id := result["id"]
	json.NewEncoder(w).Encode(id)
	idInt, _ := strconv.Atoi(id.(string))
	addQuestionLike(idInt)
}

func QuestionDislike(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	id := result["id"]

	json.NewEncoder(w).Encode(id)
	idInt, _ := strconv.Atoi(id.(string))
	addQuestionDislike(idInt)
}

func GetUserQuestions(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	//fmt.Println(id, "ovo je id")
	idInt, _ := strconv.Atoi(id[0])
	questions := getQuestionsForUser(idInt)
	json.NewEncoder(w).Encode(questions)
}

func DeleteQuestion(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	id := result["id"]
	json.NewEncoder(w).Encode(id)
	idInt, _ := strconv.Atoi(id.(string))
	deleteQuestion(idInt)
}

func GetUserQuestionsInfo(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	idInt, _ := strconv.Atoi(id[0])
	userQInfo := getUserQuestionsInfo(idInt)
	json.NewEncoder(w).Encode(userQInfo)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	var idInt = result["id"].(float64)
	newUser := models.User{
		Id:       int(idInt),
		Name:     result["name"].(string),
		Surname:  result["surname"].(string),
		Email:    result["email"].(string),
		Password: "",
	}
	json.NewEncoder(w).Encode(newUser)

	updateUser(newUser)
}

func UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	var idInt = int(result["id"].(float64))

	user := getUserForId(idInt)

	if user.Id == 0 {
		json.NewEncoder(w).Encode("No user found")
	} else {
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(result["oldPass"].(string)))
		if err != nil {
			json.NewEncoder(w).Encode("Incorrect password!")
			return
		}

		passwordNew, _ := bcrypt.GenerateFromPassword([]byte(result["newPass"].(string)), 14)
		updateUserPassword(idInt, passwordNew)
	}
}

func GetAnswersForQuestion(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	idInt, _ := strconv.Atoi(id[0])
	answers := getAnswersForQuestionId(idInt)
	json.NewEncoder(w).Encode(answers)
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
		user := models.User{}
		user = getUserForId(userId)
		checkError(err)

		question.Id = id
		question.Title = title
		question.Text = text
		question.Date = date
		question.Like = like
		question.Dislike = dislike
		question.User = user
		res = append(res, question)
	}
	return res
}

func insertQuestion(question models.QuestionNew, idUser int) {
	statement, err := database.Prepare("INSERT INTO question (`title`, `text`, `dateTime`, `like`, `dislike`, `userId`) VALUES (?,?,?,?,?,?);")
	checkError(err)

	res, err := statement.Exec(question.Title, question.Text, time.Now().Format("2006-01-02 15:04:05"), 0, 0, idUser)
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
		user := models.User{}
		user = getUserForId(userId)

		question.Id = id
		question.Title = title
		question.Text = text
		question.Date = date
		question.Like = like
		question.Dislike = dislike
		question.User = user
		res = append(res, question)
	}
	return res
}

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

func getUserByEmail(email string) models.User {
	query, err := database.Query("SELECT * FROM user WHERE email = '" + email + "'")
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

func usersWithMostAnswers() []models.UserAnswers {
	query, err := database.Query("SELECT a.answerUserId, count(a.answerUserId) FROM answer a GROUP BY a.answerUserId ORDER BY COUNT(a.answerUserId) DESC")

	checkError(err)

	res := []models.UserAnswers{}

	for query.Next() {
		var id, answers int
		err = query.Scan(&id, &answers)
		checkError(err)
		var user = getUserForId(id)
		userAnsw := models.UserAnswers{
			Id:      user.Id,
			Name:    user.Name,
			Surname: user.Surname,
			Email:   user.Email,
			Answers: answers,
		}
		res = append(res, userAnsw)
	}
	return res
}

func getFewAnswers() []models.Question {
	query, err := database.Query("SELECT * FROM question q ORDER BY q.like DESC LIMIT 3")

	checkError(err)

	question := models.Question{}
	res := []models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		checkError(err)
		user := models.User{}
		user = getUserForId(userId)

		question.Id = id
		question.Title = title
		question.Text = text
		question.Date = date
		question.Like = like
		question.Dislike = dislike
		question.User = user
		res = append(res, question)
	}
	return res
}

func insertUser(user models.UserNew) {
	statement, err := database.Prepare("INSERT INTO user (`name`, `surname`, `email`, `password`) VALUES (?,?,?,?);")
	checkError(err)

	res, err := statement.Exec(user.Name, user.Surname, user.Email, user.Password)
	checkError(err)

	id, err := res.LastInsertId()
	checkError(err)

	fmt.Println("Added row with id", id)

}

func addQuestionLike(id int) {
	_, err := database.Query("UPDATE question q SET q.like = q.like + 1 WHERE q.Id = " + strconv.Itoa(id))
	checkError(err)
}

func addQuestionDislike(id int) {
	_, err := database.Query("UPDATE question q SET q.dislike = q.dislike + 1 WHERE q.Id = " + strconv.Itoa(id))
	checkError(err)
}

func getQuestionsForUser(userId int) []models.Question {
	query, err := database.Query("SELECT * FROM question q WHERE q.userId = " + strconv.Itoa(userId) + " ORDER BY q.dateTime DESC")
	checkError(err)

	question := models.Question{}
	res := []models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		checkError(err)
		user := models.User{}
		user = getUserForId(userId)

		question.Id = id
		question.Title = title
		question.Text = text
		question.Date = date
		question.Like = like
		question.Dislike = dislike
		question.User = user
		res = append(res, question)
	}
	return res
}

func deleteQuestion(idInt int) {
	_, err := database.Query("DELETE FROM question WHERE Id = " + strconv.Itoa(idInt))
	checkError(err)
}

func getUserQuestionsInfo(userId int) models.UserQuestionsInfo {
	query, err := database.Query("SELECT count(q.id), sum(q.like), sum(q.dislike) FROM question q WHERE q.userId = " + strconv.Itoa(userId))
	checkError(err)

	userInfo := models.UserQuestionsInfo{}

	for query.Next() {
		var totalQs, totalLikes, totalDislikes int
		err = query.Scan(&totalQs, &totalLikes, &totalDislikes)
		checkError(err)

		userInfo.TotalQuestions = totalQs
		userInfo.TotalLikes = totalLikes
		userInfo.TotalDislikes = totalDislikes
	}
	return userInfo
}

func updateUser(user models.User) {
	statement, err := database.Prepare("UPDATE user set name = ?, surname = ?, email = ? WHERE id = ?")
	checkError(err)

	res, err := statement.Exec(user.Name, user.Surname, user.Email, user.Id)
	checkError(err)

	numberr, err := res.RowsAffected()
	checkError(err)

	fmt.Println(numberr, " rows affected ")
}

func updateUserPassword(idUser int, password []byte) {
	statement, err := database.Prepare("UPDATE user set password = ? WHERE id = ?")
	checkError(err)

	res, err := statement.Exec(password, idUser)
	checkError(err)

	numberr, err := res.RowsAffected()
	checkError(err)

	fmt.Println(numberr, " rows affected ")
}

func getQuestionForId(id int) models.Question {
	query, err := database.Query("SELECT * FROM question WHERE id = " + strconv.Itoa(id))
	checkError(err)

	question := models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		checkError(err)
		user := models.User{}
		user = getUserForId(userId)

		question.Id = id
		question.Title = title
		question.Text = text
		question.Date = date
		question.Like = like
		question.Dislike = dislike
		question.User = user
	}

	return question
}

func getAnswersForQuestionId(qId int) []models.Answer {
	query, err := database.Query("SELECT * FROM answer a WHERE a.questionId = " + strconv.Itoa(qId) + " ORDER BY a.like DESC")
	checkError(err)

	answer := models.Answer{}
	res := []models.Answer{}

	for query.Next() {
		var id, like, dislike, questionId int
		var text, date string
		err = query.Scan(&id, &text, &date, &like, &dislike, &questionId)
		checkError(err)
		question := getQuestionForId(questionId)

		answer.Id = id
		answer.Text = text
		answer.Date = date
		answer.Like = like
		answer.Dislike = dislike
		answer.Question = question

		res = append(res, answer)
	}
	return res
}
