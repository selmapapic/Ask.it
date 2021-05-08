package models

type Answer struct {
	id         int
	text       string
	date       string
	like       int
	dislike    int
	questionId int
	userId     int
}
