package models

type Answer struct {
	id       int
	text     string
	date     string
	like     int
	dislike  int
	question Question
	user     User
}
