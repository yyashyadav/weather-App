## Weather App

A simple, responsive client-side weather application that shows current conditions for your location or a searched city. It uses the OpenWeatherMap API, browser Geolocation, and a clean UI.

### Screenshot
<img width="1674" height="963" alt="Screenshot 2025-09-30 at 9 51 49 PM" src="https://github.com/user-attachments/assets/634f9299-0a6d-4182-8ce5-7bffaf2f068e" />
<img width="1679" height="960" alt="Screenshot 2025-09-30 at 9 52 07 PM" src="https://github.com/user-attachments/assets/6e9f51b3-a3d2-4aec-9340-e5b73787ef3c" />



### Features
- **Your Weather**: Uses browser geolocation to fetch current weather for your coordinates.
- **Search Weather**: Search by city name.
- **Current conditions**: City, country flag, description, temperature (°C), wind speed, humidity, and cloudiness.
- **Loading states** and **tab switching** between views.

### Demo (Local)
Open the app locally in a browser. See instructions below for running with a simple static server.

---

### Getting Started

#### Prerequisites
- A modern browser with JavaScript enabled. Geolocation works only on secure origins (HTTPS) or `localhost`.
- An OpenWeatherMap API key.

#### Installation
1. Clone or download this repository.
2. Place your OpenWeatherMap API key in `app.js` by updating the `API_KEY` constant.
   - File: `app.js`
   - Find: `const API_KEY="..."`
   - Replace with your key string.

#### Run locally
Because Geolocation typically requires HTTPS or `localhost`, serving the app via a local server is recommended instead of opening `index.html` with the `file://` scheme.

Examples:

```bash
# Option 1: Node (serve)
npx serve .

# Option 2: Python 3
python3 -m http.server 5500

# Option 3: VS Code Live Server extension
```

Then open the shown URL (e.g., `http://localhost:3000` or `http://localhost:5500`).

---

### Usage
1. Launch the local server and open the app URL.
2. On the "Your Weather" tab, click "GRANT ACCESS" to allow location access.
   - If denied or unavailable, switch to the "Search Weather" tab and enter a city name.
3. View current conditions: temperature in °C, wind speed (m/s), humidity (%), and cloudiness (%).

Notes:
- Temperature is converted from Kelvin to Celsius in the UI.
- Country flags are loaded via FlagCDN; weather icons via OpenWeatherMap.

---

### Project Structure
```
Weather App/
  ├── index.html        # Markup and layout
  ├── style.css         # Styling and responsive layout
  ├── app.js            # App logic, API calls, UI state, geolocation
  └── assets/           # Icons and images (wind, humidity, cloud, loading, etc.)
```

---

### Tech Stack
- Vanilla JavaScript (DOM APIs, `fetch`, `sessionStorage`)
- Browser Geolocation API
- OpenWeatherMap Current Weather API
- HTML5, CSS3

---

### Configuration
- `API_KEY` is defined in `app.js`. Replace the placeholder with your key.
- If you prefer metric units directly from the API, you can change the fetch URLs in `app.js` to include `&units=metric` and then remove the manual Kelvin-to-Celsius conversion.

---

### API Attribution
This project uses the OpenWeatherMap API. See the terms of service at `https://openweathermap.org/terms` and documentation at `https://openweathermap.org/current`.

---

### Troubleshooting
- **Geolocation not working**: Ensure you are serving over HTTPS or `http://localhost`. Some browsers block geolocation on `file://` pages.
- **Network errors**: Verify your internet connection and that the API key is valid and not rate-limited.
- **CORS or icon issues**: Make sure third-party resources (OpenWeatherMap, FlagCDN) are reachable from your network.
- **Nothing happens on search**: Confirm the input field has a valid city name and check the browser console for errors.

---

### License
No license specified. Add one if you plan to distribute or open source.


