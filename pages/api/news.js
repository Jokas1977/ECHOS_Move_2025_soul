import news from "../../data/news.json";

export default function handler(req, res) {
  const list = Array.isArray(news) ? news : (news?.news ?? []);
  res.status(200).json(list);
}
