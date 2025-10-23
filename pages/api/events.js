import events from "../../data/events.json";

export default function handler(req, res) {
  const list = Array.isArray(events) ? events : (events?.events ?? []);
  res.status(200).json(list);
}
