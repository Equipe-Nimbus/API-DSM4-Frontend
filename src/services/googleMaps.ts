import axios from 'axios';

const googleMapsClient = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json'
});

export default googleMapsClient;