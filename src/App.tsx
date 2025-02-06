import "./App.css";
import PhotoSearch from "./components/PhotoSearch";
import { Box } from "@mui/material";
import { useState } from "react";
import { Photos } from "./methods/search/types/response";
import DisplayPhotos from "./components/DisplayPhotos";

function App() {
  const [photos, setPhotos] = useState<Photos["results"]>([]);
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <h2>Performance Comparison: Client vs. Server Rendering</h2>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <p>
          Real-time analysis of rendering strategies with Unsplash API
          integration
        </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 6,
        }}
      >
        <PhotoSearch setPhotos={setPhotos} />
      </Box>
      {photos && photos.length > 0 && <DisplayPhotos photos={photos} />}
    </>
  );
}

export default App;
