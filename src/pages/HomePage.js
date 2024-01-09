import { Navbar } from '../components/Navbar';
import '../App.css';
import Features from '../components/Features';
import backgroundImage from "../img/bg-testc.png";
import Team from '../components/Team';


export const HomePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Features></Features>
            <Team></Team>
        </div>
    )
}