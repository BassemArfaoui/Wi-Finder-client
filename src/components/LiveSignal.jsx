import React, { useState, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Network from './Network';
import Spinner from './Spinner';
import { notify } from './CustomToaster';

// Lazy-load the DistanceModal component
const DistanceModal = React.lazy(() => import('./DistanceModal'));

function LiveSignal() {
  const [showDistanceModal, setShowDistanceModal] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['signalStrength'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/signal-strength');
      return response.data;
    },
    refetchInterval: 2000,
  });

  const seeGraph = async () => {
    try {
      const response = await axios.get('http://localhost:8000/show-graph');
      if (response.data.error) {
        throw new Error('Failed to show graph');
      }
    } catch (error) {
      notify('Error Creating the Graph');
    }
  };

  const closeModal = () => {
    setShowDistanceModal(false);
  };

  const openModal = () => {
    setShowDistanceModal(true);
  };

  // Handle loading state
  if (isLoading) {
    return <div><Spinner /></div>;
  }

  // Handle error state
  if (error) {
    return <div className='h-100 d-flex justify-content-center align-items-center fw-bold fs-4 text-danger'>Error Fetching Your Signal Strength 😿</div>;
  }

  return (
    <div className='pt-3 px-3'>
      <h3 className='text-center fw-bolder fs-1 mb-4'>My Network</h3>
      <Network ssid={data.SSID} signalStrength={data["Signal Strength"]} bssid={data.BSSID} />
      <div className='d-flex justify-content-end mt-3'>
        <button
          className="fs-5 btn btn-outline-primary fw-bold border-2 me-2"
          onClick={() => setShowDistanceModal(true)}
        >
          Distance
        </button>
        <button className="fs-5 btn btn-outline-primary fw-bold border-2 me-2" onClick={seeGraph}>
          See Graph
        </button>
      </div>

      {/* Suspense for lazy-loading DistanceModal */}
      <Suspense fallback={<Spinner />}>
        <DistanceModal closeModal={closeModal} openModal={openModal} showDistanceModal={showDistanceModal} />
      </Suspense>
    </div>
  );
}

export default LiveSignal;
