package models

type UserNew struct {
	Name     string
	Surname  string
	Email    string
	Password []byte
}
