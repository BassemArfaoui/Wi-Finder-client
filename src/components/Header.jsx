import React , {useEffect} from "react";
import './styles/Header.css'


function Header()
{

return (
        <header className=" border-bottom border-3 d-flex align-items-center w-100 position-relative">
                <h1 className="ms-4  fw-bolder position-absolute text-primary text-center" style={{fontSize:'48px'}}>Wi-Fi<span style={{fontSize:'31pt'}}>nder</span></h1>


                <div className="d-flex gap-4 me-5 align-items-center position-absolute end-0">
                        <span className="fs-5 btn btn-outline-primary fw-bold border-2">My Network</span>
                        <span className="fs-5 btn btn-outline-primary fw-bold border-2">Networks</span>
                        <span className="fs-5 btn btn-outline-primary fw-bold border-2">Connect</span>
                </div>
        </header>
    )
}


export default Header