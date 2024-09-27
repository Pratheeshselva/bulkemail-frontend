Hi,

This is a full stack mail sending application where user can create their own custom templates and use it to send email to bulk receipients.

First they have to create and save senders address. So they can use it while sending emails

app password creation - It is mandatory to create a app password which you will use while sending the email from the account you need. so make sure to save it somewhere on the notepad.

This has two roles (user and admin) To explore admin related interface - admin@gmail.com and password is Qwerty@123

You can create templates and add contents as per the needs and save it as well if required.

The email has import functionality to bulk import receipient.

Also we can add attachments like mp4, images and pdfs.

Features Backend User Management

Users can sign up, log in, and manage their credentials. Secure password storage and validation. Email Sending

Send bulk emails using Nodemailer. Support for CC, BCC, attachments, and rich text formatting. Sender addresses can be saved and reused. Template Management

Create, edit, delete, and save email templates. Templates support both plain text and HTML formatting (using Quill text editor). Templates are stored in MongoDB, allowing users to easily manage them. Recipient Management

Import recipient emails from CSV files. Validation of email addresses from the imported files. Email Attachments

Attach files up to 10 MB in size. Supported file types include images, PDFs, and CSV files. Frontend User Interface

Login and signup functionality. Dynamic forms to select sender email, recipients, subject, and body. Real-time feedback and validation for email addresses and file uploads. Template Editor

Choose between plain text or HTML formatted content. Quill text editor for creating rich HTML content. Ability to preview templates and modify them. File Attachments

Users can upload and preview attachments before sending. CSV Import

Import recipient lists from CSV files, with validation of email addresses. Files are parsed using Papa Parse to extract the email list.

Technology Stack Frontend: React, React Bootstrap, Formik, Yup, React Quill Backend: Node.js, Express, MongoDB, Nodemailer File Parsing: Papa Parse for CSV file handling Styling: Bootstrap, Custom CSS API: Custom RESTful API for user management, email sending, and template handling

Future Improvements User Roles: Role-based access control for different users. Analytics: Tracking sent emails and monitoring delivery success. Scheduler: Add a feature to schedule email deliveries for a later time. Additional File Types: Extend support for more file types as attachments
