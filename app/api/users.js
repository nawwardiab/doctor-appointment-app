import users from "@/data/users.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(users);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
