const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "LibraryDB"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

app.get("/books", (req, res) => {
    const sql = "SELECT b.title, b.author, b.status, d.name AS department FROM Books b JOIN Departments d ON b.dept_id = d.dept_id";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
