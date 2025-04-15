import React from "react";

const BookRideForm = () => {
    return (
        <div className="bg-[#c9b5b4] min-h-screen flex flex-col items-center justify-center px-4">
            <h2 className="text-2xl font-bold italic mb-12 self-start ml-8">Your Destination</h2>

            <form className="flex flex-col space-y-6">
                <div className="flex items-center space-x-4">
                    <label className="text-lg font-semibold">PickUp :</label>
                    <input
                        type="text"
                        placeholder="Enter pickup location"
                        className="bg-gray-200 px-4 py-3 w-80 rounded-lg"
                    />
                </div>

                <div className="flex items-center space-x-9">
                    <label className="text-lg font-semibold">Drop :</label>
                    <input
                        type="text"
                        placeholder="Enter drop location"
                        className="bg-gray-200 px-4 py-3 w-80 rounded-lg"
                    />
                </div>

                <div className="pt-8 flex justify-center">
                    <button
                        type="submit"
                        className="bg-gray-200 px-8 py-4 font-bold rounded-lg text-xl hover:bg-gray-300 transition"
                    >
                        Book A Ride
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookRideForm;
