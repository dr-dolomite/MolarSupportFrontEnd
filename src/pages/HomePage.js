import { Navbar } from '../components/Navbar';
import '../App.css';
import Features from '../components/Features';
import backgroundImage from "../img/Background.png";


export const HomePage = () => {
    return (
        <>
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Navbar></Navbar>
            <Features></Features>
            
        </div>
        </>
    )
}