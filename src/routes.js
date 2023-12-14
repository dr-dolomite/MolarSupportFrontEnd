import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UploadPage } from "./pages/UploadPage"
import { HomePage } from "./pages/HomePage"

export const RoutesFunc = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/UploadPage" element={<UploadPage />} />
                
            </Routes>
        </Router>
    )
}