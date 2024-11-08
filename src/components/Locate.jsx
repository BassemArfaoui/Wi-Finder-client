import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Box,IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { notify } from './CustomToaster';

function Locate() {

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [graphUrl,setGraphUrl]=useState("");
    const [userPosition,setUserPosition]=useState({x:'',y:''})
    const [input,setInput]=useState({
      rssi_ap1:-50,
      rssi_ap2: -55,
      rssi_ap3: -55,
      ap1_pos: "(1,2)",
      ap2_pos: "(3,5)",
      ap3_pos: "(5,5)"
    })

    const [input2,setInput2]=useState({
      ssid_ap1:'Ooredoo _M30_B7BA',
      ssid_ap2: 'Ooredoo _M30_B7BA',
      ssid_ap3: 'Ooredoo _M30_B7BA',
      ap1_pos: "(1,2)",
      ap2_pos: "(3,5)",
      ap3_pos: "(5,5)"
    })
   
  
    const openModal = () => {
      setShowModal(true);
    };

    const openModal2 = () => {
      setShowModal2(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };

    const closeModal2 = () => {
      setShowModal2(false);
    };


    const inputChanged = (event) => {
      const { name, value } = event.target;
      setInput(prevInput => ({
        ...prevInput,
        [name]: value
      }));
    };

    const inputChanged2 = (event) => {
      const { name, value } = event.target;
      setInput2(prevInput => ({
        ...prevInput,
        [name]: value
      }));
    };
    

    const locatePhone = async ()=>
    {
      try
      {
        const response= await axios.post('http://localhost:9000/graph',input);
        setGraphUrl(response.data["Plot Image"])
        setUserPosition(response.data["User Position"])
        console.log(response.data)
        closeModal()
      } catch (err)
      {
        notify('Something went wrong')
      }
    }


    const locatePhone2 = async ()=>
    {
      try
      {
        const response= await axios.post('http://localhost:9000/graph-ssid',input2);
        setGraphUrl(response.data["Plot Image"])
        setUserPosition(response.data["User Position"])
        console.log(response.data)
        closeModal2()
      } catch (err)
      {
        notify('Something went wrong')

      }
    }


    function formatFloat(value) {
      return parseFloat(value.toFixed(2));
  }
  





  return (
    <div>
        <div>
            <IconButton
                variant="contained"
                onClick={openModal}
                aria-label="Toggle notifications"
                className="position-fixed bottom-0 start-0 m-3 mx-4 bg-warning "
                style={{ zIndex: 1050, backgroundColor: '#f8f9fa' }}
                >
                    <AddIcon  fontSize="large" className='text-dark'/>
            </IconButton>
        </div>
        
          <div>
              <IconButton
                  variant="contained"
                  onClick={openModal2}
                  aria-label="Toggle notifications"
                  className="position-fixed bottom-0 end-0 m-3 mx-4 bg-primary "
                  style={{ zIndex: 1050, backgroundColor: '#f8f9fa' }}
                  >
                      <AddIcon  fontSize="large" className='text-dark'/>
              </IconButton>
          </div>


        <div className='d-flex justify-content-center pt-4'>
          {graphUrl ? (
            <div className='d-flex justify-content-evenly gap-5 w-75'>
              <img src={graphUrl} className='rounded-3' style={{height:'75vh'}}/>
              {userPosition && userPosition.x && userPosition.y && (<div style={{height:'75vh'}} className='d-flex justify-content-center align-items-center flex-column'>
                <span className='bg-light p-4 rounded-3'>
                  <h3 className='fw-bold text-center'>User Position : </h3>
                  <h2 className='fw-bold text-primary text-center'>{'('+ formatFloat(userPosition.x) + ',' + formatFloat(userPosition.y) + ')'}</h2>
                </span>
              </div>)
              }
            </div> 
          ): <div style={{height:'75vh'}} className='d-flex align-items-center fs-5 fw-bold text-center ' > Add the needed Infos <br/> To see the Graph and the Position here </div>}
        </div>

          <Modal
            open={showModal}
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
              <h2 className='text-center text-warning fw-bold mb-4'>Add Infos</h2>
              <div className='w-100 mt-4 d-flex gap-2'>
                  <input placeholder='RSSI 1' className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3 m-0' value={input.rssi_ap1} onChange={inputChanged} name='rssi_ap1' type='text'/>
                  <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3 m-0' value={input.ap1_pos} name='ap1_pos' onChange={inputChanged} placeholder='Position 1' type='text'/>
              </div>
              <div className='w-100 mt-4 d-flex gap-2'>
                  <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input.rssi_ap2} name='rssi_ap2' onChange={inputChanged} placeholder='RSSI 2' type='text'/>
                  <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input.ap2_pos} name='ap2_pos' onChange={inputChanged} placeholder='Position 2' type='text'/>
              </div>
              <div className='w-100 mt-4 d-flex gap-2'>
                  <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input.rssi_ap3} name='rssi_ap3' onChange={inputChanged} placeholder='RSSI 3' type='text'/>
                  <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input.ap3_pos} name='ap3_pos' onChange={inputChanged} placeholder='Position 3' type='text'/>
              </div>
              <div className='d-flex justify-content-center mt-4 fw-bold'><button className='btn btn-primary fw-bold fs-4 px-4' onClick={locatePhone}>Locate</button></div>
            </Box>
          </Modal>

        <Modal
          open={showModal2}
          onClose={closeModal2}
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
              color: "white",
              p: 4,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={closeModal2}
              sx={{
                position: "absolute",
                top: "10px",
                right: "8px",
                color: "white",
              }}
            >
              <CloseIcon className="fs-2" />
            </IconButton>
            <h2 className='text-center text-warning fw-bold mb-4'>Add Infos</h2>
            <div className='w-100 mt-4 d-flex gap-2'>
                <input placeholder='RSSI 1' className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3 m-0' value={input2.ssid_ap1} onChange={inputChanged2} name='ssid_ap1' type='text'/>
                <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3 m-0' value={input2.ap1_pos} name='ap1_pos' onChange={inputChanged2} placeholder='Position 1' type='text'/>
            </div>
            <div className='w-100 mt-4 d-flex gap-2'>
                <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input2.ssid_ap2} name='ssid_ap2' onChange={inputChanged2} placeholder='ssid 2' type='text'/>
                <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input2.ap2_pos} name='ap2_pos' onChange={inputChanged2} placeholder='Position 2' type='text'/>
            </div>
            <div className='w-100 mt-4 d-flex gap-2'>
                <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input2.ssid_ap3} name='ssid_ap3' onChange={inputChanged2} placeholder='ssid 3' type='text'/>
                <input className='flex-grow-1 form-control  text-primary fs-4 fw-bold bg-light rounded-3' value={input2.ap3_pos} name='ap3_pos' onChange={inputChanged2} placeholder='Position 3' type='text'/>
            </div>

            <div className='d-flex justify-content-center mt-4 fw-bold'><button className='btn btn-primary fw-bold fs-4 px-4' onClick={locatePhone2}>Locate</button></div>

          </Box>
        </Modal>
    </div>
  )
}

export default Locate