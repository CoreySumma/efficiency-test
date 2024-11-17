import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createApi } from "../services/unsplash";
import { Photos } from "../methods/search/types/response";

const unsplashApi = createApi({
  accessKey: import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY,
});

interface Props {
  setPhotos: (photos: Photos["results"]) => void;
}

const PhotoSearch = ({ setPhotos }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    try {
      const data = await unsplashApi.search.getPhotos({ query });
      if (data.response) {
        const { results } = data.response as Photos;
        setPhotos(results);
      } else {
        console.error("Error:", data.errors);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        label="Search Images"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "lightgray",
          },
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default PhotoSearch;
