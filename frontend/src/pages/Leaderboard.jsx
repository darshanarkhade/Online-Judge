import React, { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest.js';
import Loading from '../components/Loading.jsx';

export default function Leaderboard() {
    const [topPlayers, setTopPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopPlayers = async () => {
            try {
                const response = await newRequest.get("/leaderboard");
                setTopPlayers(response.data);
                setIsLoading(false); 
            } catch (err) {
                setIsLoading(false); 
                console.log("Error fetching top players:", err);
            }
        };

        fetchTopPlayers();
    }, []);

      return (
        <>
        {isLoading ? (
          <Loading /> 
        ) : (
        <div className="container mx-auto px-4 pb-8 pt-3">
          <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard Top 10</h2>
          <table className="w-3/6 mx-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-2 py-2 w-24">#</th> {/* Adjusted width */}
                <th className="border border-gray-300 px-4 py-2">Player</th>
                <th className="border border-gray-300 px-2 py-2 w-30">Score</th> {/* Adjusted width */}
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player, index) => (
                <tr key={player.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td> {/* Adjusted width */}
                  <td className="border border-gray-300 px-4 py-2">{player.username}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{player.noOfProblemSolved}</td> {/* Adjusted width */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        </>
      );
      
      
    }
    