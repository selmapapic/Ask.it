package middleware

import (
	"encoding/json"
	"fmt"
	"go-server/controllers"
	"go-server/models"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

//ova se exportuje
func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	users := controllers.GetAllUsers()
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(users)
}

func GetAllQuestions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	questions := controllers.GetAllQuestions()
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(questions)
}

func GetUsersWithMostAnswers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	users := controllers.UsersWithMostAnswers()
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(users)
}

func GetMostLikedQuestions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	questions := controllers.MostLikedQuestions()
	setupResponse(&w, r)
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
	controllers.InsertQuestion(newQ, int(id))
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode("added")

}

func GetFewAnswers(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	idInt, _ := strconv.Atoi(id[0])
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")

	answers := controllers.GetFewAnswers(idInt)
	setupResponse(&w, r)
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
	controllers.InsertUser(newUser)

	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(newUser)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	//fmt.Println("ev me u loginu")
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	//result = result["question"].(map[string]interface{})

	var user models.User
	user = controllers.GetUserByEmail(result["email"].(string))

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

		w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
		setupResponse(&w, r)
		json.NewEncoder(w).Encode(token)
		controllers.AddJwt(token)
	}
}

func GetOneUser(w http.ResponseWriter, r *http.Request) {
	var value = controllers.GetJwt()
	if value == "0" {
		json.NewEncoder(w).Encode("unauth")
		return
	}
	//fmt.Println(cookie, "ovo je cookie")

	token, err := jwt.ParseWithClaims(value, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
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
	user = controllers.GetUserForId(issuer)
	//fmt.Println(user, "user")
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(user)
}

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	if r.Method == "OPTIONS" {
		fmt.Println("bla bla")
		w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, DELETE, PUT")
		w.Header().Set("Access-Control-Allow-Headers", "content-type")
		fmt.Println(w, "ovo je w")
	} else {
		controllers.AddJwt("0")

		w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
		setupResponse(&w, r)
		json.NewEncoder(w).Encode("user")
	}
}

func QuestionLike(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	id := result["id"]

	idInt, _ := strconv.Atoi(id.(string))
	controllers.AddQuestionLike(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(id)
}

func QuestionDislike(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	id := result["id"]

	idInt, _ := strconv.Atoi(id.(string))
	controllers.AddQuestionDislike(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(id)
}

func GetUserQuestions(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	if len(id) == 0 {
		id = append(id, "0")
	}
	idInt, _ := strconv.Atoi(id[0])
	questions := controllers.GetQuestionsForUser(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(questions)
}

func DeleteQuestion(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	id := result["id"]
	idInt, _ := strconv.Atoi(id.(string))
	controllers.DeleteQuestion(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(id)
}

func GetUserQuestionsInfo(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	idInt, _ := strconv.Atoi(id[0])
	userQInfo := controllers.GetUserQuestionsInfo(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
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
	controllers.UpdateUser(newUser)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(newUser)
}

func UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	var idInt = int(result["id"].(float64))

	user := controllers.GetUserForId(idInt)

	if user.Id == 0 {
		json.NewEncoder(w).Encode("No user found")
	} else {
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(result["oldPass"].(string)))
		if err != nil {
			json.NewEncoder(w).Encode("Incorrect password!")
			return
		}

		passwordNew, _ := bcrypt.GenerateFromPassword([]byte(result["newPass"].(string)), 14)
		controllers.UpdateUserPassword(idInt, passwordNew)
	}
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode("updated")
}

func GetAnswersForQuestion(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	idInt, _ := strconv.Atoi(id[0])
	answers := controllers.GetAnswersForQuestionId(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(answers)
}

func GetQuestionForId(w http.ResponseWriter, r *http.Request) {
	id, _ := r.URL.Query()["id"]
	idInt, _ := strconv.Atoi(id[0])
	question := controllers.GetQuestionForId(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(question)
}

func InsertAnswer(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)

	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	var questionId = int(result["id"].(float64))
	var userId = int(result["userId"].(float64))
	var text = result["text"].(string)

	controllers.InsertAnswer(questionId, userId, text)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode("success")
}

func DeleteAnswer(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	id := result["id"]
	idInt, _ := strconv.Atoi(id.(string))
	controllers.DeleteAnswer(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode("success")
}

func UpdateAnswer(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	var id = int(result["id"].(float64))
	var text = result["text"].(string)

	controllers.UpdateAnswer(text, id)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode("success")
}

func AnswerLike(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)

	id := result["id"]
	idInt, _ := strconv.Atoi(id.(string))
	controllers.AddAnswerLike(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(id)
}

func AnswerDislike(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	checkError(err)
	var result map[string]interface{}
	json.Unmarshal([]byte(reqBody), &result)
	id := result["id"]

	idInt, _ := strconv.Atoi(id.(string))
	controllers.AddAnswerDislike(idInt)
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode(id)
}

func UpAndRunning(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "https://askit-go-react-app.herokuapp.com")
	setupResponse(&w, r)
	json.NewEncoder(w).Encode("Up and running!")
}
