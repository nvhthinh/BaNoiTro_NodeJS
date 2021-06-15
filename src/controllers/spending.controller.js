const db = require("../config/database");

// Insert spending
exports.addSpending = async (req, res) => {

  const { data } = req.body;
  const { priceInt } = req.body;
  console.log ("data: "+data.name +"|"+ data.category+"|"+ data.datec+"|"+ priceInt+"|"+ data.pay+"|"+ data.idUser);
  console.log ("price int: "+priceInt);
  try {
    await db.query(
      "INSERT INTO spendings(name, category, datec, dateu, price, pay, id_user) VALUES ($1, $2, $3, CURRENT_DATE, $4, $5, $6)",
      [data.name , data.category, data.datec, priceInt, data.pay, data.idUser]
    );
    
    console.log ("add success")
    res.status(201).send({
      status: 1,
    });

  } catch (error) {
    console.log("Server spending fail", error);
  }
    
}

// ==> Update spending
exports.updateSpending = async (req, res) => {

  const { data } = req.body;
  const { priceInt } = req.body;
  try {
    await db.query(
      "UPDATE spendings SET name=$1, category=$2, datec=$3, dateu= CURRENT_DATE, price=$4, pay=$5 WHERE id = $6",
      [data.name , data.category, data.datec, priceInt, data.pay, data.id]
    );
    
    console.log ("update success")
    res.status(201).send({
      status: 1,
    });

  } catch (error) {
    console.log("Server spending fail", error);
  }
    
}

// ==> del spending
exports.delSpending = async (req, res) => {

  const { id } = req.body;
  try {
    await db.query(
      "DELETE FROM spendings WHERE id = $1",
      [id]
    );
    
    console.log ("del success")
    res.status(201).send({
      status: 1,
    });

  } catch (error) {
    console.log("Server spending fail", error);
  }
    
}

// ==> Get all spending
exports.getAllSpending = async (req, res) => {
  
  const { id } = req.body;
  try {
    const { rows } = await db.query(
      "select id, name, datec, category, pay, dateu, price from spendings where id_user = $1 order by id ASC",
      [id,]
    );
    const count = rows.length;
    // console.log(rows)
    if (count >0) {
      const rowsHalding = [];
      rows.forEach(e => {
        e.price = Number(e.price).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        e.day = _getDay(e.datec.getDay());
        e.dd = ("0" + e.datec.getDate()).slice(-2)
        e.mm = ("0" + (e.datec.getMonth() + 1)).slice(-2)
        e.yyyy = ""+(e.datec).getFullYear();

        rowsHalding.push(e);
      });
      res.status(201).send({
        status: 1,
        count: count,
        body: {
          data:rowsHalding,
        },
      });
    } else {
      res.status(404).send({
        status: count,
      });
    };

  } catch (error) {
    console.log("Server spending fail", error);
  }
    
}

//function get day
_getDay = (day) => {
  // console.log(day, "_________________");
  switch(day) {

    case 0:
      return "Chủ nhật"
    
    case 1:
      return "Thứ hai"

    case 2:
      return "Thứ ba"

    case 3:
      return "Thứ tư"

    case 4:
      return "Thứ năm"
    
    case 5:
      return "Thứ sáu"

    case 6:
      return "Thứ bảy"

    default:
      Alert.alert("NUMBER NOT FOUND. day error Opps!");
  }
}
  // ==> Método responsável por listar todos os 'Products':
// exports.listAllProducts = async (req, res) => {
//     const response = await db.query('SELECT * FROM products ORDER BY product_name ASC');
//     res.status(200).send(response.rows);
//   };