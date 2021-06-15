const db = require("../config/database");

// ==> Get all spending
exports.summarySpending = async (req, res) => {
  
  const { id, type } = req.body;
  console.log(id + "/ "+ type);
  const arrColorHot = [ '#f24b21', '#fa8a02', '#ffb202', '#fdd734','#ffea97'];
  const arrColorCool = ['#a5dd06', '#04b100', '#028a7f', '#093cba', '#3e26b3', '#7625b3'];
  let iHot = 0;
  let iCool =0;
  try {
    // console.log(type!="3M"?"k phai 3m":"la 3m");
    const condition = type!="3M"? "EXTRACT("+type+" FROM datec) = EXTRACT("+type+" FROM CURRENT_DATE)": "date_trunc('month', datec) >= date_trunc('month', current_date - interval '2' month)";
    const { rows } = await db.query(
      "SELECT category as name, pay, sum(price) as price_category,cast((sum(price)) * 100.0/ (select  (sum(price)) "
      +" from spendings where id_user = $1 and "+    condition   +")as double precision) as percent FROM spendings where id_user = $1 and "
      +   condition         +" group by category, pay order by pay desc, percent desc ",
      [id]
    );
    const count = rows.length;
    if (count >0) {
      const summary = [];
      
      const summaryCount = [];
      const sT = 0;
      const sO = 0;
      const sI = 0;

      rows.forEach((e) => {

        if(e.pay) {
          e.color = arrColorCool[iCool];
          iCool +=1;
          
        } else {
          e.color = arrColorHot[iHot];
          iHot +=1;

          // sI += e.price_category;
        }
        e.percentInt = Math.round(e.percent);
        e.priceInt = e.price_category;
        e.price_category = Number(e.price_category).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        summary.push(e);
        // summaryCount.push(sO);
        // summaryCount.push(sI);
      });


      // console.log(summaryCount)
      res.status(201).send({
        status: 1,
        body: {
          data:summary,
          dataCount: summaryCount
        },
      });
    } else {
      res.status(404).send({
        status: count,
      });
    };

  } catch (error) {
    console.log("Server spending summary fail", error);
  }
}