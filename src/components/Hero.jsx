import { Button } from '@mui/material';
import Logo from './Logo';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="w-100 py-4 py-md-5 py-lg-6 py-xl-7">
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
                className="mt-0 btn btn-outline-primary fs-4 fw-bold border-3"
              >
                Nearby Networks
              </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
