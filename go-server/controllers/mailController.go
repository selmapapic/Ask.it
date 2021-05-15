package controllers

import (
	"log"
	"net/smtp"
)

func SendEmail(email, title, name string) {
	from := "askitweb1@gmail.com"
	pass := "sifra123!"
	to := email

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: Question answered\n\n" +
		"Dear " + name + ", \n\nWe would like to inform you that your question with title '" + title + "' has been answered on Ask.it. \nPlease log in to your account to see all answers. \n\nGreetings, \nAsk.it team"

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return
	}

	log.Print("email sent")
}
