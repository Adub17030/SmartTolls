# Google Maps Tolls Upgrade App

This application visualizes multiple routes on a map, using the React-Leaflet library. The routes are dynamically fetched from the [OpenRouteService API](https://openrouteservice.org/dev/#/home), which provides road map data and routing services. The app displays two routes: one in blue and another in red, with a different endpoint for the red route. Markers are placed at the start and end points of each route. This is a prototype to showcase google maps with improved toll options for route planning.

## Features
- Displays two distinct routes: one in **blue** and another in **red**.
- The **blue route** goes from **Point A to Point B**.
- The **red route** goes from **Point A to Point C**.
- Markers are placed on the start and end points of each route.
- Routes are fetched dynamically using the [OpenRouteService API](https://openrouteservice.org/dev/#/home).

## Technologies
- **React**: JavaScript library for building user interfaces.
- **Leaflet**: Open-source JavaScript library for interactive maps.
- **React-Leaflet**: A React wrapper for Leaflet.
- **Axios**: Promise-based HTTP client for making API requests.
- **OpenRouteService API**: Provides directions and road data.

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/google-maps-tolls-upgrade-app.git
cd google-maps-tolls-upgrade-app
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Obtain an OpenRouteService API Key:
- Visit [OpenRouteService API](https://openrouteservice.org/dev/#/home) to sign up and get your API key.
- Once you have the API key, add it to the `fetchRoute` function in `MapView.js` by replacing `"API_KEY"` with your actual API key.

### 4. Start the app:

```bash
npm start
```

Your app should now be running on `http://localhost:3000`.

## Usage

The app will display a map centered around Seattle, WA. Two routes will be shown:
- A **blue route** from Point A to Point B.
- A **red route** from Point A to Point C.

Each route will have markers at its start and end points, which display a popup with the respective point labels.

## API Reference

The routes are fetched from the [OpenRouteService API](https://openrouteservice.org/dev/#/home), which provides directions and other geospatial data. This API offers various route profiles (e.g., driving, walking, cycling) and other features like distance and duration calculations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

You can now refer to this app as the **Google Maps Tolls Upgrade App**. Let me know if you need further changes!