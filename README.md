# Online Store REST API

This is a RESTful API for a fictional online store that sells electronic products.

## Requirements

- Node.js (v14 or higher)
- MongoDB (v3.6 or higher)

## Getting Started

1. Clone the repository:

$ git clone https://github.com/mishra2019/Online-Store-REST-API.git

2. Install the dependencies:
   $ cd <your_project_folder>
   $ npm install

3.Set up the environment variables:
Create a `.env` file in the project root directory with the following content:
DB_URI=<your-mongodb-connection-string>
ACCESS_SECRET_KEY=<your-jwt-secret-key>
Make sure to replace `<your-mongodb-connection-string>` with the actual connection string for your MongoDB database and `<your-jwt-secret-key>` with a secret key of your choice for JWT token encryption.

4. Start the server:
   $ npm start

The server will start listening on `http://localhost:3000`.
