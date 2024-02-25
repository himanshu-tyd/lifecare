import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true
      try {
        const res = await fetch(url, {
          // Send a GET request to the specified URL
          headers: { Authorization: `Bearer ${token}` }, // Include authorization token in the request headers
        });

        const result = await res.json(); // Parse the response as JSON

        console.log(result); // Log the result to the console

        if (!res.ok) {
          // If the response is not ok (status code is not in the range 200-299)
          throw new Error(result.message); // Throw an error with the message from the response
        }

        setData(result.data); // Set the data state with the data from the response
        setLoading(false); // Set loading state to false
      } catch (e) {
        console.log("erro in use-fetch-data", e);
        setLoading(false); // Set loading state to false
        setError(e.message); // Set error state with the error message
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
