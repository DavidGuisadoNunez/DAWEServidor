import express from 'express';

const app = express();
const port = 3008;

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/user", function (req, res) {
  res.send("Got a POST request");
});

app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});