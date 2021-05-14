package models

type PasswordUpdate struct {
	Id          int
	OldPassword []byte
	NewPassword []byte
}
