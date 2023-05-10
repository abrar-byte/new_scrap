// const { ScrapBCA } = require("mutasi-scraper");

// export default async function handler(req, res) {
//   try {
//     if (req.method !== "POST") {
//       res.status(400).json({ message: "Method not allowed" });
//     }

//     const username = req.body.username;
//     const password = req.body.password;
//     const start_date = req.body.start_date;
//     const start_month = req.body.start_month;
//     const end_date = req.body.end_date;
//     const end_month = req.body.end_month;
//     if (
//       username == null ||
//       password == null ||
//       start_date == null ||
//       start_month == null ||
//       end_date == null ||
//       end_month == null
//     ) {
//       res.status(400).json({ message: "Bad request" });
//     }else{
//       const scraper = new ScrapBCA(username, password);
//       const page = await scraper.getSettlement(
//         start_date,
//         start_month,
//         end_date,
//         end_month
//       );
//       res.status(200).send(page);
//     }
 
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

const { ScrapBCA } = require("mutasi-scraper");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Method not allowed" });
    }

    const { username, password, start_date, start_month, end_date, end_month } = req.body;
    if (!username || !password || !start_date || !start_month || !end_date || !end_month) {
      return res.status(400).json({ message: "Bad request" });
    }

    const scraper = new ScrapBCA(username, password);
    const page = await scraper.getSettlement(start_date, start_month, end_date, end_month);
    res.status(200).send(page);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}