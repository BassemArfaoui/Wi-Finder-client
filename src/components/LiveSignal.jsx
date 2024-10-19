import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function LiveSignal() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['signalStrength'], // Use 'queryKey' instead of the first argument
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/signal-strength');
      return response.data;
    },
    refetchInterval: 2000, 
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching signal strength: {error.message}</div>;
  }

  // Display the signal strength and SSID
  return (
    <div>
      <h3>Live Signal Strength</h3>
      <p>SSID: {data.SSID}</p>
      <p>Signal Strength: {data["Signal Strength"]}</p>
    </div>
  );
}

export default LiveSignal;
