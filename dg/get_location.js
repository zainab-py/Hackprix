
window.addEventListener('DOMContentLoaded', (event) => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
            const streamlitEvent = new CustomEvent("streamlit:location", { detail: locationData });
            window.dispatchEvent(streamlitEvent);
        },
        (error) => {
            const errorData = { error: error.message };
            const streamlitEvent = new CustomEvent("streamlit:location", { detail: errorData });
            window.dispatchEvent(streamlitEvent);
        }
    );
});
