package controllers

import (
	"fmt"
	"go-server/models"
	"strconv"
	"time"
)

func GetAllQuestions() []models.Question {
	query, err := Database.Query("SELECT * FROM question q ORDER BY q.dateTime DESC")

	checkError(err)

	question := models.Question{}
	res := []models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		user := models.User{}
		user = GetUserForId(userId)
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

func InsertQuestion(question models.QuestionNew, idUser int) {
	statement, err := Database.Prepare("INSERT INTO question (`title`, `text`, `dateTime`, `like`, `dislike`, `userId`) VALUES (?,?,?,?,?,?);")
	checkError(err)

	res, err := statement.Exec(question.Title, question.Text, time.Now().Format("2006-01-02 15:04:05"), 0, 0, idUser)
	checkError(err)

	id, err := res.LastInsertId()
	checkError(err)

	fmt.Println("Added row with id", id)

}

func MostLikedQuestions() []models.Question {
	query, err := Database.Query("SELECT * FROM question q ORDER BY q.like DESC LIMIT 5")

	checkError(err)

	question := models.Question{}
	res := []models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		checkError(err)
		user := models.User{}
		user = GetUserForId(userId)

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

func AddQuestionLike(id int) {
	_, err := Database.Query("UPDATE question q SET q.like = q.like + 1 WHERE q.Id = " + strconv.Itoa(id))
	checkError(err)
}

func AddQuestionDislike(id int) {
	_, err := Database.Query("UPDATE question q SET q.dislike = q.dislike + 1 WHERE q.Id = " + strconv.Itoa(id))
	checkError(err)
}

func GetQuestionsForUser(userId int) []models.Question {
	query, err := Database.Query("SELECT * FROM question q WHERE q.userId = " + strconv.Itoa(userId) + " ORDER BY q.dateTime DESC")
	checkError(err)

	question := models.Question{}
	res := []models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		checkError(err)
		user := models.User{}
		user = GetUserForId(userId)

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

func DeleteQuestion(idInt int) {
	DeleteAnswersForQuestion(idInt)
	_, err := Database.Query("DELETE FROM question WHERE Id = " + strconv.Itoa(idInt))
	checkError(err)
}

func GetUserQuestionsInfo(userId int) models.UserQuestionsInfo {
	query, err := Database.Query("SELECT count(q.id), sum(q.like), sum(q.dislike) FROM question q WHERE q.userId = " + strconv.Itoa(userId))
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

func GetQuestionForId(id int) models.Question {
	query, err := Database.Query("SELECT * FROM question WHERE id = " + strconv.Itoa(id))
	checkError(err)

	question := models.Question{}

	for query.Next() {
		var id, like, dislike, userId int
		var title, text, date string
		err = query.Scan(&id, &title, &text, &date, &like, &dislike, &userId)
		checkError(err)
		user := models.User{}
		user = GetUserForId(userId)

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
