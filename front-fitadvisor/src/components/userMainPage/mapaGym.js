import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from '../../img/youlocation.png';


const customIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});
const MapaGym = () => {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            (error) => {
                console.error('Error al obtener la ubicación:', error);
            }
        );
    }, []);

    return (
        <div className="map-container">
            <h2>Gyms cerca de ti</h2>
            {userLocation && (
                <MapContainer center={userLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={userLocation} icon={customIcon}>
                        {/* Puedes personalizar el marcador con un ícono u otros componentes */}
                    </Marker>
                    {/* Agrega marcadores de gimnasios cercanos */}
                    {/* Puedes obtener la lista de gimnasios de una API o utilizar datos estáticos */}
                </MapContainer>
            )}
        </div>
    );
};

export default MapaGym;
