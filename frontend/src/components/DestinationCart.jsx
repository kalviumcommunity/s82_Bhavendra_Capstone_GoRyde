import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutocompleteInput from './AutocompleteInput';
import { motion } from 'framer-motion';
import Axios from '../api/Axios';

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

    localStorage.setItem('pickup', pickup);
    localStorage.setItem('drop', drop);

    navigate('/service', {
      state: { pickup, drop },
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#d0f0f9] to-[#ffffff] min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="backdrop-blur-lg bg-white/40 border border-white/60 rounded-3xl shadow-2xl p-10 w-full max-w-xl space-y-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center text-teal-700 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Where do you want to go?
        </motion.h2>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <AutocompleteInput
            label="PickUp Location"
            placeholder="Enter pickup point..."
            value={pickup}
            setValue={setPickup}
          />

          <AutocompleteInput
            label="Drop Location"
            placeholder="Enter drop point..."
            value={drop}
            setValue={setDrop}
          />

          {error && (
            <motion.p
              className="text-red-600 font-medium text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.div
            className="pt-4 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-10 py-3 font-semibold rounded-full shadow-lg hover:from-teal-500 hover:to-cyan-600 transition duration-300"
            >
               Book a Ride
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default DestinationCart;
