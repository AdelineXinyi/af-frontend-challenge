# Cat Picture App

This is a simple React application that displays cat pictures fetched from the cataas.com API. The app allows users to view random cat pictures, navigate through previously viewed images, and save favorite images.

## Features

- Display random cat pictures with the click of a button
- Navigation through previously viewed images using Previous and Next buttons
- Save favorite images to local storage
- Display a grid of favorite images
- Loading indicators and error handling
- Responsive design for different screen sizes

## Docker Instructions

### Build the Docker Image

To build the Docker image, run the following command from the root directory of the project:

```bash
docker build -t cat-app .
```

### Run the Docker Container

To run the Docker container, use the following command:

```bash
docker run -p 8080:8080 cat-app
```

This will start the application and make it accessible at http://localhost:8080.

## Development

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

This will start the development server at http://localhost:3000.

### Build for Production

```bash
npm run build
```

This will create a production-ready build in the `build` directory.

## Technologies Used

- React.js
- CSS3
- CATAAS API (Cat as a Service)
- Docker
- Nginx (for serving the static files in production)

## Notes

- The application uses local storage to persist favorite images between page reloads
- The app is containerized using Docker and served using Nginx on port 8080
- The cat images are fetched from the cataas.com API