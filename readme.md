# Fullstack Node.js Project

This README provides instructions on setting up and running the full-stack Node.js project locally, as well as creating an admin account using Postman or ThunderClient.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management
- [MongoDB](https://www.mongodb.com/) or another database you are using in the project
- [Postman](https://www.postman.com/) or [ThunderClient](https://www.thunderclient.com/) for API testing

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

### 2. Install Dependencies

Install dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

```
JWT_SECRET=your-secret-key
```

Adjust the values as per your setup.

### 4. Start the Application

Start the server:

```bash
npm start
```

The website will be accessible at `http://localhost:5000`.

## Creating an Admin Account

To create an admin user, use Postman or ThunderClient to send a `POST` request to the `/api/admins` endpoint.

### 1. Endpoint Details

- **URL**: `http://localhost:5000/api/admins`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body** (JSON):

```json
{
  "username": "admin",
  "password": "password123"
}
```

### 2. Steps in Postman

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/admins`.
4. Go to the "Headers" tab and add `Content-Type: application/json`.
5. Go to the "Body" tab, select "raw," and enter the JSON:

   ```json
   {
     "username": "admin",
     "password": "password123"
   }
   ```

6. Click **Send**.
7. You should receive a response confirming the admin was created.

### 3. Steps in ThunderClient

1. Open ThunderClient and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/admins`.
4. Go to the "Headers" section and add `Content-Type: application/json`.
5. Go to the "Body" section, select "JSON," and enter the JSON:

   ```json
   {
     "username": "admin",
     "password": "password123"
   }
   ```

6. Click **Send**.
7. You should receive a response confirming the admin was created.

## Additional Notes

- Replace `admin` and `password123` with your desired credentials.
- Ensure the server is running before making the request.

## Troubleshooting

- If the server doesn't start, ensure your database is running and the `DB_URI` in the `.env` file is correct.
- Check logs for any errors and resolve them as needed.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
