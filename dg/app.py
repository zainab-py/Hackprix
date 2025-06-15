import streamlit as st
from llm import get_gentle_reply
from streamlit_js_eval import streamlit_js_eval
from streamlit_geolocation import streamlit_geolocation
import requests

# Set page config
st.set_page_config(page_title="Ember", page_icon="🧠")

# Load fonts and CSS
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
    </style>
""", unsafe_allow_html=True)

def load_local_css(file_name):
    with open(file_name) as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

load_local_css("style.css")
st.markdown('<div class="title"> 🧠 Memory Companion</div>', unsafe_allow_html=True)

# Fallback function using IP-based location
def get_city_from_ip():
    try:
        response = requests.get("https://ipapi.co/json/").json()
        return response.get("city"), response.get("region")
    except:
        return None, None

# Reverse geocode using latitude and longitude
def get_readable_location(lat, lon):
    try:
        url = f"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={lat}&lon={lon}"
        response = requests.get(url).json()
        return response.get("display_name")
    except:
        return None

# Initialize session state
if "input_key_counter" not in st.session_state:
    st.session_state.input_key_counter = 0
if "response" not in st.session_state:
    st.session_state.response = ""

# Handle send logic
def handle_send():
    current_key = f"user_input_{st.session_state.input_key_counter}"
    user_input = st.session_state.get(current_key, "").strip()

    if user_input:
        if "location" in user_input.lower():
            location = streamlit_geolocation()
            if location:
                lat = location.get("latitude")
                lon = location.get("longitude")
                if lat and lon:
                    address = get_readable_location(lat, lon)
                    if address:
                        st.session_state.response = f"You are at: **{address}**"
                    else:
                        city, region = get_city_from_ip()
                        if city:
                            st.session_state.response = f"I couldn't fetch the full address, but you are likely in **{city}, {region}**."
                        else:
                            st.session_state.response = "Sorry, I'm unable to determine your location right now."
                else:
                    city, region = get_city_from_ip()
                    if city:
                        st.session_state.response = f"You might be in **{city}, {region}**."
                    else:
                        st.session_state.response = "Sorry, I couldn't get your coordinates."
            else:
                st.session_state.response = "Location access was denied or unavailable."
        else:
            st.session_state.response = get_gentle_reply(user_input)
        st.session_state.input_key_counter += 1

# Input and Send UI
input_key = f"user_input_{st.session_state.input_key_counter}"
st.markdown('<div class="label">You:</div>', unsafe_allow_html=True)
st.text_input(label="", key=input_key, placeholder="Hi there...")

st.button("Send", on_click=handle_send)

# Show response
if st.session_state.response:
    st.markdown(f'<div class="response-box"><strong>Companion:</strong> {st.session_state.response}</div>', unsafe_allow_html=True)
