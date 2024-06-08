import React, { useEffect } from 'react'
import { useState } from 'react';
import newRequest from '../utils/newRequest';
import Loading from '../components/Loading';

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
    

    // const topPlayers = [
    //     { id: 1, name: "Player 1", score: 100 },
    //     { id: 2, name: "Player 2", score: 95 },
    //     { id: 3, name: "Player 3", score: 90 },
    //     { id: 4, name: "Player 4", score: 85 },
    //     { id: 5, name: "Player 5", score: 80 },
    //     { id: 6, name: "Player 6", score: 75 },
    //     { id: 7, name: "Player 7", score: 70 },
    //     { id: 8, name: "Player 8", score: 65 },
    //     { id: 9, name: "Player 9", score: 60 },
    //     { id: 10, name: "Player 10", score: 55 },
    //   ];
      

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
    