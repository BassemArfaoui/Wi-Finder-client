import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Network from './Network';
import { Modal, TextField, Button } from '@mui/material';
import "./styles/Connect.css"
import { notify, processNotify, successNotify } from './CustomToaster';
import Spinner from './Spinner';

function Connect() {
    const [isSSIDModalOpen, setIsSSIDModelOpen] = useState(false);
    const [ssidInput, setSsidInput] = useState('');

    const { data, error, isLoading } = useQuery({
        queryKey: ['signalStrength'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/strongest-network');
            return response.data;
        },
        refetchInterval: 1000,
    });

    const openModal = () => {
        setIsSSIDModelOpen(true);
    };

    const closeModal = () => {
        setIsSSIDModelOpen(false);
    };

    const handleSsidChange = (e) => {
        setSsidInput(e.target.value);
    };



    const connect = async (ssid) => {
        try {
            if(ssid)
            {processNotify('Connecting to ' + ssid + ' ...');
              const response = await axios.get(`http://localhost:8000/connect/${ssid}`);
              if(response.data.error)
              {
                throw new Error(response.data.error);
              }
              else
              {
                successNotify('Successfully Connected to ' + ssid);
              }
            }
            else
            {notify('Please Enter an SSID');}
        } catch (error) {
            notify('Error connecting to '+ ssid);
    };}

    // Handle loading state
    if (isLoading) {
        return <div><Spinner/></div>;
      }

    // Handle error state
    if (error) {
        return <div className='h-100 d-flex justify-content-center align-items-center fw-bold fs-4 text-danger'>Error Fetching Strongest Network 😿</div>;
      }

    // Display the signal strength and SSID
    return (
        <div className='pt-3 px-3'>
            <h3 className='text-center fw-bolder fs-1 mb-4'>Strongest Network</h3>
            <Network ssid={data.SSID} signalStrength={data["Signal Strength"]} bssid={data.BSSID} />
            <div className='d-flex justify-content-end mt-3'>
                <button
                    className="fs-5 btn btn-outline-primary fw-bold border-2 me-2"
                    onClick={openModal}>
                    Connect by  SSID
                </button>
                <button
                    className="fs-5 btn btn-outline-primary fw-bold border-2 me-2"
                    onClick={() => { connect(data.SSID); }}>
                    Connect
                </button>
            </div>

            {/* SSID Input Modal */}
            <Modal
                open={isSSIDModalOpen}
                onClose={closeModal}
                aria-labelledby="ssid-modal-title"
                aria-describedby="ssid-modal-description"
            >
                <div className="modal-content" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgb(52, 58, 64)',
                    color: '#fff', 
                    padding: '2rem',
                    borderRadius: '8px',
                    width: '400px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
                }}>
                    <form action="" method='post' onSubmit={() => {closeModal() ; connect(ssidInput);setSsidInput('') }}>
                        <h2  className='text-center fw-bold text-primary'>Enter SSID</h2>
                        <input
                            id="ssid-input"
                            value={ssidInput}
                            onChange={handleSsidChange}
                            style={{ marginBottom: '20px', height:'52px', outline:'none' }}
                            className='form-control mt-3 text-primary fs-4 fw-bold bg-light rounded-3'
                        />
                        <div className='d-flex justify-content-center'>
                        <button
                            role='submit'
                            className="fs-5 btn btn-primary fw-bold border-2 me-2"
                        >
                            Connect
                        </button>
                    </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default Connect;
