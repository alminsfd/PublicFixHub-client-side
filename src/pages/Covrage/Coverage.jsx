import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);

    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;

        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 14);
        }
    }

    return (
        <div className='p-8'>
            <h2 className="text-3xl md:text-5xl font-bold text-center">
                We are available in 64 districts
            </h2>
            <p className="text-center text-gray-500 mt-2">
                Find your nearest service center easily
            </p>

            {/* Search Section */}
            <div className="mt-10 flex justify-center">
                <div className="card w-full max-w-2xl bg-base-100 ">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold text-center">
                            Search Service Center by District
                        </h3>

                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <svg
                                    className="h-5 w-5 opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>

                                <input
                                    type="search"
                                    name="location"
                                    placeholder="Enter district name (e.g. Dhaka)"
                                    className="grow"
                                    required
                                />
                            </label>

                            <button
                                type="submit"
                                className="btn btn-primary w-full sm:w-auto"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map  */}
            <div className='border w-full h-[800px]'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px]'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenters.map((center, index) => <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(', ')}.
                            </Popup>
                        </Marker>)
                    }

                </MapContainer>
            </div>


        </div>
    );
};

export default Coverage;