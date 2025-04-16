import React from "react";
import { FaUserCircle, FaPhoneAlt, FaEnvelope, FaHome } from "react-icons/fa";

const Profile = () => {
    const user = {
        name: "Bhavendra Kumar",
        email: "bhavi@gmail.com",
        phone: "9786555444",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 to-white flex items-center justify-center px-4 py-10">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center space-y-6">
                <FaUserCircle className="text-7xl text-teal-500 mx-auto" />

                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

                <div className="text-left space-y-4">
                    <div className="flex items-center gap-4 text-gray-700">
                        <FaEnvelope className="text-teal-600" />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700">
                        <FaPhoneAlt className="text-teal-600" />
                        <span>{user.phone}</span>
                    </div>
                </div>

                <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-600 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
