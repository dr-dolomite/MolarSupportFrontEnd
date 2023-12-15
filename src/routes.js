import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UploadPage } from "./pages/UploadPage";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
import { UploadedResults } from "./components/UploadedResults"; // Import UploadedResults

export const RoutesFunc = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/UploadPage" element={<UploadPage />} />
        <Route
          path="/UploadedResults"
          element={
            <>
              <Navbar />
              <UploadedResults />
            </>
          }
        />
      </Routes>
    </Router>
  );
};
