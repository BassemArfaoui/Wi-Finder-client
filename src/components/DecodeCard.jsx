import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DecodeCard({
  index , 
  ToDS, 
  MF, 
  WEP, 
  srcMAC, 
  destMAC, 
  BSSID, 
  durationID, 
  sequenceControl
}) {
  return (
    <Card
      sx={{
        borderRadius: '17px',
        backgroundColor: '#212529', 
        color: '#f8f9fa', 
        border: '1px solid #343a40',
        padding: '8px', 
        height: 'auto',  
      }}
      className="shadow-sm mt-0 mb-2" 
    >
      <CardHeader
        title={
          <Typography variant="h6" className="d-flex justify-content-between align-items-center">
            <span className="fw-bold text-primary fs-4">Packet #{index}</span>
            <DescriptionIcon className="text-primary fs-2" />
          </Typography>
        }
        className="pb-2 pt-0" 
      />
      <CardContent className='pb-2 pt-0'>
        {/* ToDS */}
        <div className="mb-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">ToDS:</span>
            <span className="fs-6">{ToDS ? 'True' : 'False'}</span>
          </Typography>
        </div>
        {/* MF */}
        <div className="mb-0 mt-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">MF:</span>
            <span className="fs-6">{MF ? 'True' : 'False'}</span>
          </Typography>
        </div>
        {/* WEP */}
        <div className="mb-0 mt-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">WEP:</span>
            <span className="fs-6">{WEP ? 'True' : 'False'}</span>
          </Typography>
        </div>
        {/* Source MAC */}
        <div className="mb-0 mt-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">Source MAC:</span>
            <span className="fs-5">{srcMAC || 'unknown'}</span>
          </Typography>
        </div>
        {/* Destination MAC */}
        <div className="mb-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">Destination MAC:</span>
            <span className="fs-5">{destMAC || 'unknown'}</span>
          </Typography>
        </div>
        {/* BSSID */}
        <div className="mb-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">BSSID:</span>
            <span className="fs-5">{BSSID || 'unknown'}</span>
          </Typography>
        </div>
        {/* Duration ID */}
        <div className="mb-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">Duration ID:</span>
            <span className="fs-5">{durationID}</span>
          </Typography>
        </div>
        {/* Sequence Control */}
        <div className="mb-0">
          <Typography variant="body2" className="d-flex justify-content-between">
            <span className="fw-bold fs-6">Sequence Control:</span>
            <span className="fs-5">{sequenceControl || 'unknown'}</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
