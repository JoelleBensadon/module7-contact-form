# Module 7: Contact Form to API

This project is a Course Registration Form I created using React and TypeScript for MCON 505.

The form allows users to enter their full name, email, select a course, and leave comments.

I used useState to manage the form information and TypeScript to handle input changes.

The form validates the name, email, and course selection before submitting the information to the JSONPlaceholder API using a POST request.

If something is missing or incorrect, an error message appears. After a successful submission, a confirmation message is displayed.

## Components
- RegistrationForm: Handles the form inputs, validation, and API submission.
- SuccessMessage: Displays a confirmation after the form is submitted.

## API
https://jsonplaceholder.typicode.com/posts

## How to Run
1. Open the project folder.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local URL in your browser.