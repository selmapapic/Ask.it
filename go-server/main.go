package main

import (
	"go-server/router"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

const (
	host     = "selserver1.mysql.database.azure.com"
	database = "askitdb"
	user     = "selma@selserver1"
	password = "sifra123!"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	// Initialize connection string.
	//var connectionString = fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?allowNativePasswords=true", user, password, host, database)

	// Initialize connection object.
	//db, err := sql.Open("mysql", connectionString)
	//checkError(err)
	//defer db.Close()

	//err = db.Ping()
	//checkError(err)
	//fmt.Println("Successfully created connection to database.")

	r := router.Router()
	log.Fatal(http.ListenAndServe(":8080", r))

	// Insert some data into table.
	/*sqlStatement, err := db.Prepare("INSERT INTO user (name, email) VALUES (?, ?);")
	res, err := sqlStatement.Exec("selma", "scelosmano1@etf.unsa.ba")
	checkError(err)
	rowCount, err := res.RowsAffected()
	fmt.Printf("Inserted %d row(s) of data.\n", rowCount)

	/*res, err = sqlStatement.Exec("orange", 154)
	checkError(err)
	rowCount, err = res.RowsAffected()
	fmt.Printf("Inserted %d row(s) of data.\n", rowCount)

	res, err = sqlStatement.Exec("apple", 100)
	checkError(err)
	rowCount, err = res.RowsAffected()
	fmt.Printf("Inserted %d row(s) of data.\n", rowCount)*/
	//fmt.Println("Done.")
}
