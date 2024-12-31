# Registration Form

Overview
This project is a simple yet functional Registration Form built using HTML, CSS, JavaScript, and Node.js. It allows users to register by providing their details, which are securely stored on the server. The system ensures unique entries and prevents duplicate submissions.

Features
1. Responsive Design: The form is styled with CSS for a clean and user-friendly interface.
2. Client-Side Validation: JavaScript is used to validate input fields before submission.
3. Server-Side Handling: A Node.js server handles form submissions and manages data storage.
4. Data Storage: User details are saved in a data.json file for persistence.
5. Duplicate Prevention: The server checks for existing entries by email to prevent duplicate registrations.
6. Error Handling: Proper error messages are displayed for invalid submissions or server issues.

How It Works
1. Users fill out the registration form.
2. Client-side validation ensures all required fields are correctly filled.
3. On submission, the data is sent to the server.
4. The server validates the data, checks for duplicates, and stores the entry if valid.
5. The user receives a success or error message based on the outcome.

Technologies Used
1. Frontend: HTML, CSS, JavaScript
2. Backend: Node.js
3. File System: JSON for data storage

Usage
1. Clone the repository.
2. Run the server using node server.js.
3. Open the form in a web browser at http://localhost:3000.
4. Fill in the form and submit to test the functionality.
