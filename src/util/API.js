async function fetchData(lat = 51.5002, long = -0.1262) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}2&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,cloudcover&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon`,
    );
    return response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { fetchData };
