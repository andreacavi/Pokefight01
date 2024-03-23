import { useState, useEffect } from "react";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8080/leaderboard");
        const data = await response.json();
        if (response.ok) {
          return data; // or set state in your component to update the UI
        } else {
          throw new Error("Failed to fetch leaderboard");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard().then((data) => setLeaders(data));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((leader, index) => (
          <li key={index}>
            {leader.playername} - {leader.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
