import "./App.css";
import PhotoSearch from "./components/PhotoSearch";
import { Box } from "@mui/material";
import { useState } from "react";
import { Photos } from "./methods/search/types/response";
import DisplayPhotos from "./components/DisplayPhotos";

function App() {
  const [photos, setPhotos] = useState<Photos['results']>([]);
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <h1>Image Efficiency Test</h1>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <p>
          We are going to test different loading methods and fetch techniques
        </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 15,
        }}
      >
        <PhotoSearch setPhotos={setPhotos} />
      </Box>
      {photos && photos.length > 0 && <DisplayPhotos photos={photos} />}
    </>
  );
}

export default App;
