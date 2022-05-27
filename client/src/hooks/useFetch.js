import React, { useEffect, useState } from "react";

const useFetch = (url, callBack) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        callBack(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
