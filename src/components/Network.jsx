import React from 'react';
import { Card, CardContent, CardHeader, Typography, LinearProgress } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WifiInfoCard({ ssid, bssid, signalStrength }) {
  const getSignalColor = (strength) => {
    if (strength >= 80) return "success";
    if (strength >= 60) return "info";
    if (strength >= 40) return "warning";
    return "error";
  };

  return (
    <Card sx={{ borderRadius: '17px', backgroundColor: '#343a40', color: '#ffffff' }} className="shadow-sm">
      <CardHeader
        title={
          <Typography variant="h6" className="d-flex justify-content-between align-items-center">
            <p className='fw-bold text-warning fs-2' >{ssid}</p>
            <WifiIcon className="text-light fs-2" />
          </Typography>
        }
        className="pb-0"
      />
      <CardContent>
        <div className="mb-3">
          <Typography variant="body2" className="d-flex justify-content-between" style={{ color: '#ffffff' }}>
            <span className="fw-bold fs-5">SSID:</span>
            <span className="text-light fs-5">{ssid}</span>
          </Typography>
        </div>
        <div className="mb-3">
          <Typography variant="body2" className="d-flex justify-content-between" style={{ color: '#ffffff' }}>
            <span className="fw-bold fs-5">BSSID:</span>
            <span className="fs-5 text-light">{bssid}</span>
          </Typography>
        </div>
        <div>
          <Typography variant="body2" className="d-flex justify-content-between mb-1" style={{ color: '#ffffff' }}>
            <span className="fw-bold fs-5">Signal Strength:</span>
            <span className="text-light fs-5">{signalStrength}%</span>
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={parseInt(signalStrength)} 
            color={getSignalColor(signalStrength)}
            sx={{ backgroundColor: '#6c757d' ,marginTop:'15px'}} // Background color for the progress bar
          />
        </div>
      </CardContent>
    </Card>
  );
}
