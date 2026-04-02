#  School Library Management API

A RESTful API built with Node.js, Express.js, and MongoDB for managing a school library system.

---

##  Features

- Manage Authors, Books, Students, and Library Attendants
- Book borrowing and returning system
- MongoDB relationships with Mongoose
- Data population for relational references
- Pagination and search for books
- Validation middleware
- Duplicate ISBN prevention

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

##  Installation

```bash
git clone https://github.com/your-username/library-system.git
cd library-system
npm install
```

##  Environment Variables

Create a `.env` file in the root directory:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Running the Server
```bash
node server.js
```
or with nodemon:
```bash
nodemon server.js
```

## API Endpoints
## Authors
POST /authors
GET /authors
GET /authors/:id
PUT /authors/:id
DELETE /authors/:id
## Books
POST /books
GET /books
GET /books/:id
PUT /books/:id
DELETE /books/:id
POST /books/:id/borrow
POST /books/:id/return
## Students
POST /students
GET /students
GET /students/:id
## Attendants
POST /attendants
GET /attendants
##  Example: Borrow Book
```bash
POST /books/:id/borrow

{
  "studentId": "ID",
  "attendantId": "ID",
  "returnDate": "2026-04-10"
}
```

##  Authentication (JWT)

This API uses JSON Web Token (JWT) for protecting certain routes.

### Login

POST /auth/login

Request body:
{
  "staffId": "your_staff_id"
}

Response:
{
  "token": "your_jwt_token"
}

##  Overdue Books

Books are considered overdue when:

- status = "OUT"
- returnDate is less than the current date

### Endpoint

GET /books/overdue

Response:
Returns a list of overdue books.

Author

Daniel Ikogba  
Backend Developer