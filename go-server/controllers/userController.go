package controllers

import (
	"fmt"
	"go-server/models"
	"strconv"
)

func GetAllUsers() []models.User {
	query, err := Database.Query("SELECT * FROM user")
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
func GetUserForId(idUser int) models.User {
	query, err := Database.Query("SELECT * FROM user WHERE id = " + strconv.Itoa(idUser))
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
func GetUserByEmail(email string) models.User {
	query, err := Database.Query("SELECT * FROM user WHERE email = '" + email + "'")
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
func UsersWithMostAnswers() []models.UserAnswers {
	query, err := Database.Query("SELECT a.answerUserId, count(a.answerUserId) FROM answer a GROUP BY a.answerUserId ORDER BY COUNT(a.answerUserId) DESC")
	checkError(err)
	res := []models.UserAnswers{}
	for query.Next() {
		var id, answers int
		err = query.Scan(&id, &answers)
		checkError(err)
		var user = GetUserForId(id)
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
func InsertUser(user models.UserNew) {
	statement, err := Database.Prepare("INSERT INTO user (`name`, `surname`, `email`, `password`) VALUES (?,?,?,?);")
	checkError(err)
	res, err := statement.Exec(user.Name, user.Surname, user.Email, user.Password)
	checkError(err)
	id, err := res.LastInsertId()
	checkError(err)
	fmt.Println("Added row with id", id)
}
func UpdateUser(user models.User) {
	statement, err := Database.Prepare("UPDATE user set name = ?, surname = ?, email = ? WHERE id = ?")
	checkError(err)
	res, err := statement.Exec(user.Name, user.Surname, user.Email, user.Id)
	checkError(err)
	numberr, err := res.RowsAffected()
	checkError(err)
	fmt.Println(numberr, " rows affected ")
}
func UpdateUserPassword(idUser int, password []byte) {
	statement, err := Database.Prepare("UPDATE user set password = ? WHERE id = ?")
	checkError(err)
	res, err := statement.Exec(password, idUser)
	checkError(err)
	numberr, err := res.RowsAffected()
	checkError(err)

	fmt.Println(numberr, " rows affected ")
}
