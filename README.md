# Map My Heritage

## Overview

Map My Heritage is a comprehensive web platform designed to help users discover, explore, and plan visits to cultural and historical heritage sites around the world. The platform focuses on providing detailed information about UNESCO World Heritage sites, ancient ruins, museums, and monuments, with a special emphasis on Indian heritage sites.

## Features

- **Heritage Site Discovery**: Browse through a curated collection of heritage sites categorized by type (UNESCO sites, ancient ruins, museums, monuments)
- **Popular Destinations**: Explore featured heritage sites with detailed information and images
- **User Reviews**: Read authentic reviews from visitors who have experienced these heritage sites
- **Travel Planning**: Access trending itineraries for heritage-focused travel experiences
- **Search Functionality**: Easily find specific heritage sites, cities, or countries
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 4.5.2
- **Fonts**: Google Fonts (Roboto)
- **Icons**: Font Awesome
- **Images**: High-quality heritage site photographs

## Color Scheme

- **Primary**: #434A54 (Dark Charcoal) - Provides a modern and sophisticated foundation
- **Secondary**: #F5F7FA (Light Gray) - Offers a clean and spacious feel
- **Accent**: #D9534F (Brick Red) - Highlights calls to action and important elements

## Project Structure

```
MapMYHeritage/
├── html/
│   └── index.html
├── css/
│   └── app.css
└── images/
    ├── logo.jpg
    ├── Agra-Fort.jpg
    ├── qutub1_042717100950.jpg
    ├── sun_temple_konark.jpg
    ├── Gwalior-fort-Gwalior.jpg
    └── licensed-image.jpg
```

## Future Enhancements

- User authentication system
- Personalized heritage site recommendations
- Interactive maps for heritage site locations
- Virtual tours of heritage sites
- Booking functionality for guided tours
- Community features for heritage enthusiasts

# Map My Heritage Website

A website for exploring India's heritage sites and cultural landmarks.

## Local Development Server

To preview the website locally, follow these steps:

### Option 1: Using Python (Recommended)

1. Make sure you have Python installed on your computer
2. Open a terminal/command prompt
3. Navigate to the project directory
4. Run the server script:
   ```
   python server.py
   ```
5. The website will automatically open in your default browser at http://localhost:8000/html/index.html
6. To stop the server, press Ctrl+C in the terminal

### Option 2: Using Node.js

If you prefer Node.js, you can install a simple HTTP server:

1. Install Node.js if you don't have it already
2. Install the http-server package globally:
   ```
   npm install -g http-server
   ```
3. Navigate to the project directory in your terminal
4. Run:
   ```
   http-server
   ```
5. Open your browser and go to http://localhost:8080/html/index.html

### Sharing with Team Members

To share your local server with team members on the same network:

1. Find your computer's IP address:
   - On Windows: Open Command Prompt and type `ipconfig`
   - On Mac/Linux: Open Terminal and type `ifconfig` or `ip addr`
2. Share the IP address with your team
3. Team members can access the site by entering `http://YOUR_IP_ADDRESS:8000/html/index.html` in their browser

## Project Structure

- `html/` - Contains all HTML files
- `css/` - Contains stylesheets
- `images/` - Contains all images
- `server.py` - Python script to run the local server

## Notes

- The server must be running to view the website
- Any changes you make to the files will be immediately visible when you refresh the browser
- Make sure all team members have the latest version of the files before testing

