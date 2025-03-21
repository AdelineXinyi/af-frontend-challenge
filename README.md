# Cat Generator

## Features

- Display fetched cat image from cataas api on click of the button
- Navigation through viewed images using Previous and Next buttons
- Save selected images to local gallery (with display)
- On click, image in gallery section will show full view

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

Access development server at http://localhost:3000.

## Technologies Used

- React.js
- CSS3
- CATAAS API 
- Docker (containerized)
- Nginx (served on port 8080)


## Docker Instructions

### Docker Image

To build the Docker image, run the following command from the root directory of the project:

```bash
docker build -t cat-app .
```

### Docker Container

To run the Docker container, use the following command:

```bash
docker run -p 8080:8080 cat-app
```

Then accesses it at http://localhost:8080.

## Notes

Click on the button to begin, and on the first select of add to gallery,
user can view the hover effect and click to enlarge saved images.