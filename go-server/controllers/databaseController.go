package controllers

import (
	"database/sql"
	"go-server/config"
)

var Database *sql.DB

func init() {
	createDBInstance()
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func createDBInstance() {
	db, err := config.GetMySQLDb()
	checkError(err)
	Database = db
}
