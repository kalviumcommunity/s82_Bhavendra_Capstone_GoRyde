import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutocompleteInput from './AutocompleteInput'; // Adjust if needed

const DestinationCart = () => {
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pickup.trim() || !drop.trim()) {
            setError('Please enter both pickup and drop locations.');
            return;
        }

        // ✅ Store in localStorage
        localStorage.setItem('pickup', pickup);
        localStorage.setItem('drop', drop);

        // ✅ Optionally pass as route state
        navigate('/service', {
            state: { pickup, drop }
        });
    };

    return (
        <div className="bg-[#d0f0f9] min-h-screen flex items-center justify-center px-4">
            <div className="backdrop-blur-md bg-white/30 border border-white/50 rounded-3xl shadow-2xl p-10 w-full max-w-xl space-y-10">
                <h2 className="text-3xl font-bold italic text-gray-800">Your Destination</h2>

                <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <AutocompleteInput
                        label="PickUp:"
                        placeholder="Enter pickup location"
                        value={pickup}
                        setValue={setPickup}
                    />

                    <AutocompleteInput
                        label="Drop:"
                        placeholder="Enter drop location"
                        value={drop}
                        setValue={setDrop}
                    />


                    {error && <p className="text-red-600 font-semibold text-center">{error}</p>}

                    <div className="pt-4 text-center">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white px-8 py-3 font-bold rounded-full shadow-md hover:bg-teal-600 transition-all duration-300"
                        >
                            Book a Ride
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DestinationCart;
