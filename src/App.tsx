import "./App.css";
import ImageSearch from "./components/ImageSearch";
import { Box } from "@mui/material";

function App() {
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
        <ImageSearch />
      </Box>
    </>
  );
}

export default App;
