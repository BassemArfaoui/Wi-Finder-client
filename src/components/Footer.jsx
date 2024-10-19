import "./styles/Footer.css" 

function Footer()
{
    const year = new Date().getFullYear();
    return (
        <footer>
            <p className="m-0 p-0 text-center text-secondary fw-bold">All rights reserved <sup>©</sup> 2024.</p>
            <p className="m-0 p-0 text-center text-secondary fw-bold">Made with ❤️ by <span className="text-primary">BASSEM ARFAOUI</span></p>
        </footer>
    )
}



export default Footer;