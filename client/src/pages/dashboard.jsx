import { useEffect, useState } from "react";
import Profile from "../components/profile";
import Table from "../utils/Table";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://cities-qd9i.onrender.com/agents");
      const agents = await response.json();
      setData(agents);
    } catch (error) {
      console.error("Error fetching api data", error);
    }
  };
  return (
    <div className="dashboard">
      <div>
        <Profile />
      </div>
      <div className="total_stat">
        <div className="totalup">Total Uploads</div>
        <div className="totaldown">Total Downloads</div>
      </div>
      <div className="tableProp">
        <h1>History</h1>
        <Table data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
