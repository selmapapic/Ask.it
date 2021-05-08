package config

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func GetMySQLDb() (db *sql.DB, err error) {
	driver := "mysql"
	host := "selserver1.mysql.database.azure.com"
	database := "askitdb"
	user := "selma@selserver1"
	password := "sifra123!"

	var connectionString = fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?allowNativePasswords=true", user, password, host, database)

	db, err = sql.Open(driver, connectionString)

	return
}
