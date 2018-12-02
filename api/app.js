const app = require("express")();
const bodyParser = require("body-parser");
const db = require("./db/createDB");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.get("/students", (req, res) => {
  let query = `SELECT * FROM students`;
  if (req.query.search) {
    const { search } = req.query;
    query += ` WHERE firstName LIKE '%${search}%'
       OR lastName LIKE '%${search}%' OR inCareOf LIKE '%${search}%'`;
  }
  db.all(query, (err, students) => {
    if (err) console.log(err);
    else res.send(students);
  });
});

app.post("/students", (req, res) => {
  db.serialize(() => {
    db.run(
      `INSERT INTO students VALUES (?, $firstName, $lastName, $birthDate, $birthPlace,
        $inCareOf, $identityCard, $identityCardDelivery, $deliveryPlace, $phone1, $phone2,
        $address, $stage, $division, $materials)`,
      {
        $firstName: req.body.firstName,
        $lastName: req.body.lastName,
        $birthDate: req.body.birthDate,
        $birthPlace: req.body.birthPlace,
        $inCareOf: req.body.inCareOf,
        $identityCard: req.body.identityCard,
        $identityCardDelivery: req.body.identityCardDelivery,
        $deliveryPlace: req.body.deliveryPlace,
        $phone1: req.body.phone1,
        $phone2: req.body.phone2,
        $address: req.body.address,
        $stage: req.body.stage,
        $division: req.body.division,
        $materials: req.body.materials
      },
      err => {
        if (err) console.log(err);
        else
          db.get(
            "SELECT * FROM students WHERE id=(SELECT MAX(id) FROM students)",
            (err, student) => {
              console.log(student);
              if (err) console.log(err);
              else res.send(student);
            }
          );
      }
    );
  });
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM students WHERE id=?", id, (err, student) => {
    if (err) console.log(err);
    else res.send(student);
  });
});

app.put("/students/:id", (req, res) => {
  const id = req.params.id;

  let query = "UPDATE students SET ";
  for (let key in req.body) {
    query += `${key}='${req.body[key]}', `;
  }

  query = query.slice(0, query.length - 2);

  db.run(query + ` WHERE id=${id}`, (err, student) => {
    if (err) console.log(err);
    db.get("SELECT * FROM students WHERE id=?", id, (err, student) => {
      if (err) console.log(err);
      else res.send(student);
    });
  });
});

app.delete("/students/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  db.run("DELETE FROM students WHERE id=?", id, err => {
    if (err) console.log(err);
    res.send(`student with ${id} is deleted`);
  });
});

module.exports = app;
