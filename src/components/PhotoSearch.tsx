import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createApi } from "../services/unsplash";
import { Photos } from "../methods/search/types/response";

// TODO use the request type

const unsplashApi = createApi({
  accessKey: import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY,
});

interface Props {
  setPhotos: (photos: Photos["results"]) => void;
}



const PhotoSearch = ({ setPhotos }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [timeToLoad, setTimeToLoad] = useState<number>(0);

  const handleSearch = async () => {
    if (!query) return;
    const startTime = performance.now();
    try {
      const data = await unsplashApi.search.getPhotos({
        query,
        perPage: 30,
      });
      if (data.response) {
        const { results } = data.response;
        setPhotos(results);
        const endTime = performance.now();
        setTimeToLoad(endTime - startTime);
      } else {
        throw new Error(`Unsplash Error: ${data.errors}`);
      }
    } catch (error) {
      throw new Error(`Unsplash Error: ${error}`);
    }
  };

  return (
    <>
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
      <Box display="flex" alignItems="center" gap={8}>
        <p>Time to load: {timeToLoad} ms</p>
      </Box>
    </>
  );
};

export default PhotoSearch;
