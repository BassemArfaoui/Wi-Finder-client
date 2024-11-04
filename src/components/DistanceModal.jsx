// DistanceModal.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function DistanceModal({ showDistanceModal, closeModal }) {
  // Use React Query to fetch data with an object-based configuration
  const { data: networkData, isLoading, error } = useQuery({
    queryKey: ['networkData'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:9000/');
      return response.data;
    },
    enabled: showDistanceModal, // Only fetch when modal is open
    refetchOnWindowFocus: false, // Optional: Disable refetch on window focus
  });

  return (
    <Modal
      open={showDistanceModal}
      onClose={closeModal}
      aria-labelledby="description-modal-title"
      aria-describedby="description-modal-content"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "16px",
          maxHeight: "95vh",
          width: "45%",
          backgroundColor: "#1E1E1E",
          border: "2px solid white",
          color: "white",
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: "10px",
            right: "8px",
            color: "white",
          }}
        >
          <CloseIcon className="fs-2" />
        </IconButton>

        <div className='d-flex flex-column'>
          <h2 className='text-center text-warning fw-bold mt-3'>Distance:</h2>
          <div className='d-flex justify-content-center align-items-center h-100 my-4 fs-2'>
            {isLoading ? (
              <span className='small'>Loading...</span>
            ) : error ? (
              <span className="text-danger">Error loading data</span>
            ) : networkData && Object.keys(networkData).length > 0 ? (
              <div>
                {Object.keys(networkData).map((ssid) => (
                  <div key={ssid} className='bg-secondary px-4 py-2 rounded-4 my-2 text-center'>
                    <div className='fw-bold'>{parseFloat(networkData[ssid]["Distance (m)"].toFixed(2))} meters</div>
                  </div>
                ))}
              </div>
            ) : (
              <span>No data available</span>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default DistanceModal;
