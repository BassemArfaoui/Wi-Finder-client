import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import './styles/App.css'
import LiveSignal from "./LiveSignal";
import NetworksList from "./NetworksList";



function App()
{
return (
  <div>
    <Header />
    <Main>
        <NetworksList/>
    </Main>
  </div>
);}



export default App;