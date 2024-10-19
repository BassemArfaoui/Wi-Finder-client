import "./styles/Footer.css" 

function Footer()
{
    const year = new Date().getFullYear();
    return (
        <footer className="position-absolute bottom-0 w-100 m-0 pb-0">
            <p className="m-0 p-0 text-end me-3 text-secondary fw-bold">Made with ❤️ by <span className="text-primary m-0">BASSEM ARFAOUI</span></p>
        </footer>
    )
}



export default Footer;