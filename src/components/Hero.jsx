import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import wifi from '../imgs/wifi.png'

export default function Hero() {
  return (
    <section className="w-100 py-4 py-md-5 py-lg-6 py-xl-7">
      <div className='row mt-3 position-relative'>
        <div className='col-7'>
          <div className="container px-3 px-md-5">
            <div className="d-flex flex-column align-items-center text-center">
              <div className="mb-0">
                <h1           className="ms-4  fw-bolder  text-primary text-center"
                 style={{ fontSize: "70px" }}
                >
                  Wi-Fi<span style={{ fontSize: "42pt" }}>nder</span>
                </h1>
        
                <p className="mx-auto  text-secondary fs-2 fw-bold">
                  Access , Manage and Connect <br/> to WI-FI Networks
                </p>
              </div>
              <Link to='/networks'>
                  <button
                    variant="contained"
                    color="primary"
                    size="large"
                    className="mt-3 btn btn-primary fs-4 fw-bold border-3"
                  >
                    <span>Networks </span> <span><ArrowForwardRoundedIcon className='mb-1 fs-3'/></span>
                  </button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className='col-5'>
        <img
          src={wifi}  className='position-absolute start-50 mt-4' style={{width:'450px',opacity:'0.8'}}/>
        </div>
      </div>
    </section>
  );
}
