package controllers

import (
	"fmt"
	"go-server/models"
	"strconv"
	"time"
)

func GetFewAnswers(id int) []models.Answer {
	query, err := Database.Query("SELECT * FROM answer a WHERE a.questionId = " + strconv.Itoa(id) + " ORDER BY a.dateTime DESC LIMIT 3")

	checkError(err)

	answer := models.Answer{}
	res := []models.Answer{}

	for query.Next() {
		var id, like, dislike, questionId, userId int
		var text, date string
		err = query.Scan(&id, &text, &date, &like, &dislike, &questionId, &userId)
		checkError(err)
		question := GetQuestionForId(questionId)
		user := GetUserForId(userId)

		answer.Id = id
		answer.Text = text
		answer.Date = date
		answer.Like = like
		answer.Dislike = dislike
		answer.Question = question
		answer.User = user
		res = append(res, answer)
	}
	return res
}

func AddAnswerLike(id int) {
	_, err := Database.Query("UPDATE answer a SET a.like = a.like + 1 WHERE a.Id = " + strconv.Itoa(id))
	checkError(err)
}

func AddAnswerDislike(id int) {
	_, err := Database.Query("UPDATE answer a SET a.dislike = a.dislike + 1 WHERE a.Id = " + strconv.Itoa(id))
	checkError(err)
}

func DeleteAnswersForQuestion(idQ int) {
	_, err := Database.Query("DELETE FROM answer WHERE questionId = " + strconv.Itoa(idQ))
	checkError(err)
}

func GetAnswersForQuestionId(qId int) []models.Answer {
	query, err := Database.Query("SELECT * FROM answer a WHERE a.questionId = " + strconv.Itoa(qId) + " ORDER BY a.dateTime DESC")
	checkError(err)

	answer := models.Answer{}
	res := []models.Answer{}

	for query.Next() {
		var id, like, dislike, questionId, userId int
		var text, date string
		err = query.Scan(&id, &text, &date, &like, &dislike, &questionId, &userId)
		checkError(err)
		question := GetQuestionForId(questionId)
		user := GetUserForId(userId)

		answer.Id = id
		answer.Text = text
		answer.Date = date
		answer.Like = like
		answer.Dislike = dislike
		answer.Question = question
		answer.User = user
		res = append(res, answer)
	}
	return res
}

func InsertAnswer(questionId int, userId int, text string) {
	fmt.Println(questionId, userId, text)
	statement, err := Database.Prepare("INSERT INTO answer (`text`, `dateTime`, `like`, `dislike`, `questionId`, `answerUserId`) VALUES (?,?,?,?,?,?);")
	checkError(err)

	res, err := statement.Exec(text, time.Now().Format("2006-01-02 15:04:05"), 0, 0, questionId, userId)
	checkError(err)

	id, err := res.LastInsertId()
	checkError(err)

	email(questionId, userId)
	fmt.Println("Added row with id", id)
}

func DeleteAnswer(id int) {
	_, err := Database.Query("DELETE FROM answer WHERE id = " + strconv.Itoa(id))
	checkError(err)
}

func UpdateAnswer(text string, id int) {
	statement, err := Database.Prepare("UPDATE answer set text = ?, dateTime = ? WHERE id = ?")
	checkError(err)

	res, err := statement.Exec(text, time.Now().Format("2006-01-02 15:04:05"), id)
	checkError(err)

	numberr, err := res.RowsAffected()
	checkError(err)

	fmt.Println(numberr, " rows affected ")
}

func email(questionId int, userId int) {
	question := GetQuestionForId(questionId)
	SendEmail(question.User.Email, question.Title, question.User.Name)
}
