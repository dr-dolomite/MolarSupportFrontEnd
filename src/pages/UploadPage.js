import { Navbar } from '../components/Navbar';
import '../App.css';
import backgroundImage from "../img/Background.png";
import { UploadedResults } from '../components/UploadedResults'

export const UploadPage = () => {
    return (
        <>
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Navbar></Navbar>
            <UploadedResults></UploadedResults>
            
        </div>
        </>
    )
}