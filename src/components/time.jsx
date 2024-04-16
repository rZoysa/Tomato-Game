import { useEffect, useState } from "react";

const Time = () => {
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetching country information using fetch
            const ipResponse = await fetch("https://ipapi.co/8.8.8.8/json/");
            const ipData = await ipResponse.json();
    
            // Fetching timezone information using fetch
            const timezoneResponse = await fetch(`http://worldtimeapi.org/api/timezone/${ipData.timezone}`);
            const timezoneData = await timezoneResponse.json();
    
            // Function to fetch and update time
            const updateTime = async () => {
              const timeResponse = await fetch(`http://worldtimeapi.org/api/timezone/${timezoneData.timezone}`);
              const timeData = await timeResponse.json();
              setTime(timeData.datetime);
            };
    
            // Initial update
            updateTime();
    
            // Update time every minute
            const interval = setInterval(updateTime, 1000);
    
            setLoading(false);
    
            // Cleanup function to clear the interval
            return () => clearInterval(interval);
          } catch (error) {
            setError("Failed to fetch data");
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
  
    return (
      <div className="select-none absolute bottom-2 right-4 bg-gray-500 bg-opacity-55 rounded-lg w-52 items-center justify-center flex">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            
            <h2 className="text-4xl font-itim text-white">{new Date(time).toLocaleTimeString()}</h2>
          </div>
        )}
      </div>
    );
};

export default Time;
