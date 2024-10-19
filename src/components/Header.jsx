import React , {useEffect} from "react";
import './styles/Header.css'
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Header()
{

return (
  <header className=" border-bottom border-3 d-flex align-items-center w-100">
    <Link to='/' className="m-0 p-0 text-decoration-none" >
        <Logo/>
    </Link>

    <div className="d-flex gap-4 me-5 align-items-center position-absolute end-0">
      <Link to="/my/network">
        <span className="fs-5 btn btn-outline-primary fw-bold border-2">
          My Network
        </span>
      </Link>

      <Link to="/networks">
        <span className="fs-5 btn btn-outline-primary fw-bold border-2">
          Networks
        </span>
      </Link>

      <Link to="/connect">
        <span className="fs-5 btn btn-outline-primary fw-bold border-2">
          Connect
        </span>
      </Link>
    </div>
  </header>
);
}


export default Header