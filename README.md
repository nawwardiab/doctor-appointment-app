During one project week for the SPA Module, I built this Doctor Appointment App to practice Next.js, responsive and modular design, clean code and clean architecture best practices.

---

# 🏥 Doctor Appointment Booking App

A **Next.js**-powered doctor appointment booking system that allows users to search for doctors, filter results based on specialty, location, and language, and book appointments seamlessly. The app features a calendar view, a map integration for locating doctors, and a responsive UI.

## 🚀 Features

### 🩺 User Features

- **Search for Doctors** by specialty, language, location, and availability.
- **Filter Doctors** based on pricing, rating, and other criteria.
- **View Doctors on a Map** (Leaflet integration).
- **Book Appointments** via a structured step-by-step form.
- **Receive Notifications** on successful or failed bookings.

### 👩‍⚕️ Doctor Features

- **Manage Availability** to allow patients to book open slots.
- **Appointment Management** (Upcoming feature).

### 🛠 Technical Features

- **Built with Next.js 15** for a fast, SSR-friendly experience.
- **Global State Management** with Context API.
- **Calendar View** to display available appointment slots.
- **Leaflet.js Map Integration** for an intuitive search experience.
- **Styled Components & Responsive UI**.

---

## 📂 Project Structure

```
/doctor-appointment-app
│── /app
│   ├── /appointment-booking
│   │   ├── page.js
│   ├── /doctor-dashboard
│   │   ├── page.js
│   ├── /doctor-search
│   │   ├── page.js
│   ├── /homepage
│   │   ├── page.js
│   ├── /login
│   │   ├── page.js
│   ├── /signup
│   │   ├── page.js
│   ├── /user-dashboard
│   │   ├── page.js
│   ├── layout.js
│   ├── page.js
│── /components
│   ├── /doctor-search
│   │   ├── CalendarView.js
│   │   ├── DoctorCard.js
│   │   ├── FilterSection.js
│   │   ├── MapComponent.js
│   │   ├── MapView.js
│   ├── /home-page
│   │   ├── CTASection.js
│   │   ├── HeroSection.js
│   │   ├── InfoCard.js
│   ├── Navbar.js
│   ├── Footer.js
│   ├── SearchFilters.js
│   ├── AppointmentForm.js
│   ├── Notification.js
│── /data
│   ├── doctors.json
│   ├── appointments.json
│   ├── users.json
│── /context
│   ├── AppContext.js
│── /styles
│   ├── global.css
│   ├── leaflet.css
│── /public
│── package.json
│── README.md
```

---

## 🏗️ Tech Stack

| **Technology**  | **Purpose**                |
| --------------- | -------------------------- |
| **Next.js 15**  | Frontend framework         |
| **React.js**    | UI components              |
| **Context API** | Global state management    |
| **Leaflet.js**  | Interactive maps           |
| **CSS Modules** | Component-based styling    |
| **Node.js**     | Backend APIs (in progress) |

---

## 🔧 Installation & Setup

### 📥 Clone the Repository

```sh
git clone https://github.com/nawwardiab/doctor-appointment-app.git
cd doctor-appointment-app
```

### 📦 Install Dependencies

```sh
npm install
```

### ▶️ Run the Development Server

```sh
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 Key Components Overview

### 🌍 **Global State Management** (`AppContext.js`)

- Manages **user authentication**, **doctor listings**, **appointments**, and **filters**.
- Provides **reducer-based** state updates.

### 📅 **Calendar View** (`CalendarView.js`)

- Displays available dates for doctors.
- Highlights available slots and allows date selection.

### 🗺️ **Map View** (`MapComponent.js`)

- Uses **Leaflet.js** to visualize doctor locations.
- Clickable markers display doctor details.

### 🎛 **Filter Section** (`FilterSection.js`)

- Allows users to filter doctors by specialty, language, price, and availability.

### 🔔 **Notification Component** (`Notification.js`)

- Shows real-time status messages for actions like booking confirmation.

### 📄 **Doctor Card** (`DoctorCard.js`)

- Displays key doctor details and enables quick appointment booking.

### 📆 **Appointment Form** (`AppointmentForm.js`)

- Step-by-step form for booking an appointment.
- Includes logic for **time slot selection** and **appointment confirmation**.

---

## 🔄 API Endpoints (To Be Implemented)

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/api/doctors`      | Fetch list of doctors   |
| GET    | `/api/appointments` | Fetch user appointments |
| POST   | `/api/appointments` | Book an appointment     |
| GET    | `/api/users`        | Fetch user details      |

---

## 🛣 Roadmap

✅ **MVP Completed**

- Doctor search with filters
- Booking system with calendar integration
- Map-based doctor location view

🔜 **Upcoming Features**

- Doctor Dashboard for managing availability
- Appointment reminders via email
- Secure user authentication (JWT-based)

---

## 🤝 Contributing

Want to improve this project? Contributions are welcome!

1. **Fork** the repository
2. **Create a new branch** (`git checkout -b feature-branch`)
3. **Commit changes** (`git commit -m 'Add new feature'`)
4. **Push to GitHub** (`git push origin feature-branch`)
5. **Create a Pull Request**

---

## 📩 Contact

For any questions, feel free to reach out!

📧 **Email:** `your-email@example.com`  
🔗 **GitHub:** [your-github-profile](https://github.com/yourusername)

---

Would you like me to adjust anything based on the roadmap or other missing details? 🚀
