const { ScrapBCA } = require("mutasi-scraper");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Method not allowed" });
    }

    const { username, password, start_date, start_month, end_date, end_month } =
      req.body;
    if (
      !username ||
      !password ||
      !start_date ||
      !start_month ||
      !end_date ||
      !end_month
    ) {
      return res.status(400).json({ message: "Bad request" });
    }

    const scraper = new ScrapBCA(username, password);
    const page = await scraper.getSettlement(
      start_date,
      start_month,
      end_date,
      end_month
    );
    res.status(200).send(page);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
