const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "sip_calculator"
});

db.connect(err => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// SIP calculation API
app.post("/calculate", (req, res) => {

  const { monthly, rate, years } = req.body;

  const r = rate / 12 / 100;
  const n = years * 12;

  const FV = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  const sql = `
  INSERT INTO sip_records
  (monthly_investment, annual_return, years, future_value)
  VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [monthly, rate, years, FV]);

  res.json({ futureValue: FV });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});