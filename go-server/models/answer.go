package models

type Answer struct {
	Id       int
	Text     string
	Date     string
	Like     int
	Dislike  int
	Question Question
}
