const express = require("express");
const mysql = require("mysql");

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
  port: 3306,
};

const port = 3000;
const app = express();

const names = ["Joao", "Wesley", "Luiz", "Matheus"];

app.get("/", (_, res) => {
  const connection = mysql.createConnection(config);

  const nameIndex = Math.floor(Math.random() * names.length);

  const name = names[nameIndex];

  const insert_sql = `INSERT INTO people (name) VALUES ('${name}')`;

  connection.query(insert_sql);

  const query_sql = `SELECT name FROM people`;

  connection.query(query_sql, (error, results) => {
    if (error) {
      connection.end();

      res.send("<h1>Full Cycle Rocks!</h1>");

      return;
    }

    const people = results.map((result) => result.name);

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <br />
      <ul>
        ${people.map((person) => `<li>${person}</li>`).join("")}
      </ul>
    `);
  });
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
