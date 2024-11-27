## Tasks

1. Set up the project in Next.js
2. Set up the structure and create the folders with necessary files
3. Set up the Global State: AppContext (create context, initialize state, create reducer, create and export context provider, create and export custom context hook, wrap the layout with the context provider)
4. Set up basic API Functionality (set up API routes to stimulate API behaviour and connect with dummy datasets)
5. Build Core Components
   - Create DoctorCard.js (component receives a `doctor` object as prop, uses `useRouter` to navigate to the `/appointment-booking` page, passing `doctorId` as a query parameter, displays doctor's name, speciality and the nuber of available slots. The "Book Appintment button let's user proceed with booking")
   - Integrate `DoctorCard` into `doctor-search` Page (update `doctor-search/page.js`, created `DoctorCard.module.css` and `/doctor-search/styles.module.css` and added basic styling)
   - Create `AppointmentForm.js` (manages form input using `useState`, on form submission, adds a new appointment to the global state and provides feedback to the user)
   - Update `appointment-booking/page.js` (uses the `doctorId` from the query parameters to pass to the `AppointmentForm` component)
   - Create `Calender.js` (receives `availability` as a prop to display available time slots. Uses `useState` to manage the selected date. Invokes `onDateSelect` to pass the selected date to the parent component)
   - Create `Notification.js` (receives `message` and `type` props. Conditional rendering:f there is no message it returns `null`. Add basic styles)
   - Update `AppointmentForm.js` (Uses the `Notification` component to provide feedback on success or error. Uses the `Calender` component to allow users to select an available date. Prevents submission if no date is selected, showing an error message.)
   - Updated Dummy Datasets to match the code, and for better UX
   -
