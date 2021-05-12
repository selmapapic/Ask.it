package models

type Question struct {
	Id      int
	Title   string
	Text    string
	Date    string
	Like    int
	Dislike int
	User    User
}
