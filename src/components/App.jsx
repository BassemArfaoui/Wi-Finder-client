import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import './styles/App.css'
import LiveSignal from "./LiveSignal";
import NetworksList from "./NetworksList";
import Connect from "./Connect";
import { Routes, Route } from 'react-router-dom';
import CustomToaster from "./CustomToaster";




function App()
{
return (
  <div>
    <CustomToaster />
    <Header />
    <Main>
    <Routes>
        <Route path="/" element={<br/>} />
        <Route path="/networks" element={<NetworksList />} />
        <Route path="/my/network" element={<LiveSignal />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </Main>
  </div>
);}



export default App;