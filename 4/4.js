const express = require("express");
const {Sequelize, QueryTypes} = require("sequelize")
const config = require("./config/config.json")
const sequelize = new Sequelize(config.development)
const upload = require("./middleware/upload")

const path = require("path");
const app = express();
const port = 5000;
//untuk dapat request body dari html/hbs  ==> harus di definisikan di awal sebelum routing
app.use(express.urlencoded({ extended: false }));

//hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/"));

app.use("/uploads", express.static(path.join(__dirname, "assets/uploads")));

//routing
app.get("/4", home);
app.get ("/addpr", viewaddpr)
app.get ("/addkb", viewaddkb)
app.post ("/addprovinsi", upload.single("photo"), addProvinsi)
app.post ("/addkb", upload.single("photo"), addkb)
app.get ("/detailpr/:id",detailpr)
app.get ("/detailkb/:id", detailkb)
app.get ("/updatepr/:id", updateviewpr)
app.get ("/updatekb/:id", updateviewkb)
app.post("/updatepr",upload.single("photo"), updatepr)
app.post("/updatekb",upload.single("photo"), updatekb)            
app.post("/deletepr/:id", deletepr);
app.post("/deletekb/:id", deletekb);


async function home (req, res){
  console.log(req.body, "body")
  const { filter } = req.query;

  let query = `
      SELECT
          provinsi_tbs.id AS provinsi_id,
          provinsi_tbs.nama,
          provinsi_tbs.diresmikan AS provinsi_resmi ,
          provinsi_tbs.photo AS provinsi_photo ,
          provinsi_tbs.pulau ,
          kabupaten_tbs.id AS kabupaten_id,
          kabupaten_tbs."Nama" ,
          kabupaten_tbs."Provinsi_id" ,
          kabupaten_tbs.diresmikan AS kabupaten_resmi,
          kabupaten_tbs.photo AS kabupaten_photo
      FROM
          provinsi_tbs
      LEFT JOIN
          kabupaten_tbs ON kabupaten_tbs."Provinsi_id" = provinsi_tbs.id
  `;

  if (filter === 'provinsi') {
     query =` SELECT
                provinsi_tbs.id AS provinsi_id,
                provinsi_tbs.nama,
                provinsi_tbs.diresmikan AS provinsi_resmi,
                provinsi_tbs.photo AS provinsi_photo ,
                provinsi_tbs.pulau
            FROM
                provinsi_tbs`;
    
    } else if (filter === 'kabupaten') {
     query =`SELECT
                kabupaten_tbs.id AS kabupaten_id,
                kabupaten_tbs."Nama",
                kabupaten_tbs."Provinsi_id",
                kabupaten_tbs.diresmikan AS kabupaten_resmi,
                kabupaten_tbs.photo AS kabupaten_photo
                
            FROM
                kabupaten_tbs`;
    }

    const obj = await sequelize.query(query,{type :QueryTypes.SELECT})
  
    res.render("4", {data : obj});
}

function viewaddpr(req,res) {
    res.render ("addpr")
}

async function viewaddkb(req,res) {
  const query = `SELECT id, nama FROM "provinsi_tbs"`;
    const prov = await sequelize.query(query, { type: QueryTypes.SELECT });

    res.render ("addkb", {prov})
}

async function addProvinsi(req,res) {
    let {provinsiName,diresmikan,pulau} = req.body
    let photo = req.file.filename

    let query = `INSERT INTO provinsi_tbs(nama,diresmikan,photo,pulau)
    VALUES ('${provinsiName}','${diresmikan}','${photo}','${pulau}')`;

    await sequelize.query(query,{type : QueryTypes.INSERT})

    res.redirect("4")
}

async function addkb(req,res) {
    let {Nama,diresmikan,Provinsi_id} = req.body
    let photo = req.file.filename

    let query = `INSERT INTO kabupaten_tbs("Nama","Provinsi_id",diresmikan,photo)
    VALUES ('${Nama}','${Provinsi_id}','${diresmikan}','${photo}')`;

    await sequelize.query(query,{type : QueryTypes.INSERT})
    res.redirect("4")
}

async function detailpr(req, res) {
  
    const { id } = req.params;
  
    const query =`SELECT * FROM provinsi_tbs WHERE id=${id}`
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
  
    res.render("detailpr", obj[0]);
}

async function detailkb(req, res) {
  
    const { id } = req.params;
  
    const query =`SELECT
                kabupaten_tbs.id,
                kabupaten_tbs."Nama",
                kabupaten_tbs."Provinsi_id",
                kabupaten_tbs.diresmikan,
                kabupaten_tbs.photo,
                provinsi_tbs.nama
            FROM
                kabupaten_tbs
            LEFT JOIN
                provinsi_tbs ON kabupaten_tbs."Provinsi_id" = provinsi_tbs.id WHERE kabupaten_tbs.id =${id}`;
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
  
    res.render("detailkb", obj[0]);
  }

  async function updateviewpr(req, res) {
    const { id } = req.params;
  
    const query =` SELECT
                provinsi_tbs.id,
                provinsi_tbs.nama,
                provinsi_tbs.diresmikan,
                provinsi_tbs.photo,
                provinsi_tbs.pulau
            FROM
                provinsi_tbs WHERE id=${id}`;
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
  
    res.render("updatepr", obj[0]);
  }

async function updateviewkb(req, res) {
    const { id } = req.params;
    const query =`SELECT * FROM kabupaten_tbs WHERE id=${id}`
    const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
    const query2 = `SELECT id, nama FROM "provinsi_tbs"`;
    const prov = await sequelize.query(query2, { type: QueryTypes.SELECT });
  
    res.render("updatekb", {data : obj[0], prov: prov});
  }

async function updatepr(req,res){
    const {nama,diresmikan,pulau, id} = req.body;
    const photo = req.file.filename
    
    const query = `UPDATE provinsi_tbs SET nama='${nama}', diresmikan='${diresmikan}', photo='${photo}', pulau='${pulau}' WHERE id='${id}'`;
    await sequelize.query(query,{ type: QueryTypes.UPDATE });

    res.redirect("/4");
  }

async function updatekb(req,res){
    const {Nama,Provinsi_id,diresmikan,id} = req.body
    const photo = req.file.filename
    
    const query = `UPDATE kabupaten_tbs
	  SET  "Nama"='${Nama}',"Provinsi_id"='${Provinsi_id}',diresmikan='${diresmikan}', photo='${photo}' WHERE kabupaten_tbs.id='${id}'`;
    await sequelize.query(query, { type: QueryTypes.UPDATE });

    res.redirect("/4");
  }

async function deletepr(req, res) {
    const { id } = req.params;
  
    const query =`DELETE FROM provinsi_tbs WHERE id=${id}`
    const obj = await sequelize.query(query,{type: QueryTypes.DELETE})
    
    res.redirect("/4");
  }

async function deletekb(req, res) {
    const { id } = req.params;
  
    const query =`DELETE FROM kabupaten_tbs WHERE id=${id}`
    const obj = await sequelize.query(query,{type: QueryTypes.DELETE})
    
    res.redirect("/4");
  }

  app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
  });