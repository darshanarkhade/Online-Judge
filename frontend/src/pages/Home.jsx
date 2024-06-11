import React from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import AllProblems from './AllProblems.jsx';

const Home = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if(currentUser) {
    return (
      <AllProblems />
    );
  }

  return (
    <div className=" min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <main className="container mx-auto px-6 py-12">
        <section className="text-center my-8">
          <h2 className="text-5xl font-bold mb-4">Welcome to CodeQuest</h2>
          <p className="text-xl mb-8">Solve various problems and improve your skills!</p>
          <a href="/problems" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </a>
          <div className="mt-12 relative">
            <Animation />
          </div>
        </section>

        <section id="features" className="mt-12">
          <h3 className="text-3xl font-bold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              <h4 className="text-2xl font-bold mb-2">Problem Solving</h4>
              <p>Wide range of problems to solve and improve your skills.</p>
            </motion.div>
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              <h4 className="text-2xl font-bold mb-2">Stand in Leaderboard</h4>
              <p>See how your performance compares to others on the leaderboard.</p>
            </motion.div>
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              <h4 className="text-2xl font-bold mb-2">Track Progress</h4>
              <p>Monitor your progress with detailed stats and analytics.</p>
            </motion.div>
          </div>
        </section>
            
      </main>
      {/* Adding Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Animation />
      </div>
      
    </div>
  );
};

const Animation = () => {
  const byteArray = Array.from({ length: 30 });

  return (
    <>
      {byteArray.map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-blue-500 w-2 h-2 rounded-full"
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: 1 }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity, delay: index * 0.2 }}
          style={{ left: `${Math.random() * 100}vw` }}
        />
      ))}
    </>
  );
};

export default Home;
