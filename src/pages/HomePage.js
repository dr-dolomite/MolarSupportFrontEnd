import { Navbar } from '../components/Navbar';
import '../App.css';
import Features from '../components/Features';
import backgroundImage from "../img/bg-testc.png";


export const HomePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Features></Features>
        </div>
    )
}