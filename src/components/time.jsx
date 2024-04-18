import { useEffect, useState } from "react";
import { format } from 'date-fns';

const Time = () => {
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTimeFromAPI = async () => {
      try {
        const timeResponse = await fetch(`https://worldtimeapi.org/api/ip`);
        const timeData = await timeResponse.json();
        setTime(new Date(timeData.datetime));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchTimeFromAPI();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update time every second
      setTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="select-none absolute bottom-2 right-4 bg-gray-500 bg-opacity-55 rounded-lg w-52 items-center justify-center flex">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2 className="text-4xl font-itim text-white">
          {format(time, "HH:mm:ss")}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Time;
