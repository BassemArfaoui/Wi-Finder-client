import React , {useEffect} from "react";
import './styles/Header.css'
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Header()
{
  const location = useLocation();

  function updateMenuButton() {
    const btn = document.querySelectorAll('.menu-btn');
  
    btn.forEach(element => {
        if(element.name === location.pathname)
        {element.classList.remove('btn-outline-primary');
        element.classList.add('btn-primary');
        }
        else
        {element.classList.remove('btn-primary');
        element.classList.add('btn-outline-primary');
        }
      
      
    });
  }


  useEffect(() => {
    updateMenuButton();
  }, [location.pathname]);


return (
  <header className=" border-bottom border-3 d-flex align-items-center w-100">
    <Link to='/' className="m-0 p-0 text-decoration-none" >
        <Logo/>
    </Link>

    <div className="d-flex gap-4 me-5 align-items-center position-absolute end-0">
      <Link to="/my/network">
        <button className="menu-btn fs-5 btn btn-outline-primary fw-bold border-2" name='/my/network'>
          My Network
        </button>
      </Link>

      <Link to="/networks">
        <button className="menu-btn fs-5 btn btn-outline-primary fw-bold border-2" name='/networks'>
          Networks
        </button>
      </Link>

      <Link to="/connect">
        <button className="menu-btn fs-5 btn btn-outline-primary fw-bold border-2" name='/connect'>
          Connect
        </button>
      </Link>

      <Link to="/locate">
        <button className="menu-btn fs-5 btn btn-outline-primary fw-bold border-2" name='/locate'>
          Locate
        </button>
      </Link>

      <Link to="/decode">
        <button className="menu-btn fs-5 btn btn-outline-primary fw-bold border-2" name='/decode'>
          Decode
        </button>
      </Link>
    </div>
  </header>
);
}


export default Header