const db = require("../config/database");

// ==> Método responsável por criar um novo 'Product':

exports.createAcc = async (req, res) => {
  const { dpname, pass, datec, email } = req.body;
  console.log (dpname, pass, datec, email );
  const { rows } = await db.query(
    "INSERT INTO accounts(dpname, pass, role, datec, email) VALUES ($1, $2, 1, $3, $4)",
    [dpname, pass, datec, email]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { dpname, pass, datec, email }
    },
  });
};

// ==> CREATE
exports.createAcc = async (req, res) => {
    const { name, pass, email } = req.body;
    const datec = new Date().toISOString();
    
    const { rows } = await db.query(
      "select * from accounts where email = $1;",
      [email]
    );
    const countU = rows.length;

    if (countU > 0) {
      // Acc ton tai
      console.log("acc ton tại");
      
      res.status(201).send({
        status: 2,
      });
    } else {
      // Acc chua dk, dk new
      await db.query(
        "INSERT INTO accounts(dpname, pass, role, datec, email) VALUES ($1, $2, 1, $3, $4)",
        [name, pass, datec, email]
      );
      console.log("dang ki thanh cong acc ", name);

      res.status(201).send({
        status: 1,
      });
    }
  };

  // ==> Login
exports.login = async (req, res) => {
  
  const { email, pass } = req.body;
  try {
    const { rows } = await db.query(
      "select * from accounts where email = $1 and pass = $2;",
      [email, pass]
    );
    const count = rows.length;
    // console.log("iten ", rows[0])
    if (count >0) {
      res.status(201).send({
        status: count,
        body: {
          id:rows[0].id,
          email:rows[0].email,
          role: rows[0].role,
          dpname: rows[0].dpname,
          image: rows[0].image,
        },
      });
    } else {
      res.status(404).send({
        status: count,
      });
    };

  } catch (error) {
    console.log("Server login fail", error);
  }
    
}
  // ==> Método responsável por listar todos os 'Products':
// exports.listAllProducts = async (req, res) => {
//     const response = await db.query('SELECT * FROM products ORDER BY product_name ASC');
//     res.status(200).send(response.rows);
//   };