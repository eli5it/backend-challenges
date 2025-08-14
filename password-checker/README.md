# Password Checker API

A basic Express server built with TypeScript for password validation.

## Features

- Express.js server with TypeScript
- Basic password validation endpoint
- Health check endpoints
- Error handling middleware
- Request logging

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

## Development

For development with hot reload:

```bash
npm run dev
```

For development with nodemon:

```bash
npm run watch
```

## API Endpoints

### GET /

Returns basic API information.

**Response:**

```json
{
  "message": "Password Checker API",
  "version": "1.0.0",
  "status": "running"
}
```

### GET /health

Returns server health status.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

### POST /check-password

Validates a password.

**Request Body:**

```json
{
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "password": "yourpassword",
  "isValid": true,
  "message": "Password is valid"
}
```

## Environment Variables

- `PORT` - Server port (default: 3001)

## Project Structure

```
password-checker/
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Start development server with ts-node
- `npm run watch` - Start development server with nodemon
