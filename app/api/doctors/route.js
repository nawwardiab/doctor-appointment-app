// /app/api/doctors/route.js

import doctors from "@/data/doctors.json";

export async function GET(request) {
  return new Response(JSON.stringify(doctors), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
