package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func GetMySQLDb() (db *sql.DB, err error) {

	errorr := godotenv.Load(".env")

	if errorr != nil {
		log.Fatalf("Error loading .env file")
	}

	driver := os.Getenv("DB_DRIVER")
	host := os.Getenv("DB_HOST")
	database := os.Getenv("DB_NAME")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	/*driver := "mysql"
	host := "selserver1.mysql.database.azure.com"
	database := "askitdb"
	user := "selma@selserver1"
	password := "sifra123!"*/

	var connectionString = fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?allowNativePasswords=true", user, password, host, database)

	db, err = sql.Open(driver, connectionString)

	return
}
