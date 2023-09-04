import { useEffect, useState } from "react";

function useFetchData(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const responseJson = await response.json();
      setData(responseJson);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
}

export default useFetchData;
