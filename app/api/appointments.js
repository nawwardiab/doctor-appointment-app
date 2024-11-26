import appointments from "@/data/appointments.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(appointments);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
