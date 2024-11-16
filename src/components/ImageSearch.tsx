import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createApi } from '../services/unsplash'; 
import { Photos } from '../methods/search/types/response';

const unsplashApi = createApi({ accessKey: import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY });

const ImageSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    try {
      const data = await unsplashApi.search.getPhotos({ query });
      if (data.response) {
        const { results, total, total_pages } = data.response as Photos;
        console.log(results); 
        console.log(`Total Results: ${total}`);
        console.log(`Total Pages: ${total_pages}`);
      } else {
        console.error('Error:', data.errors);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2} p={2}>
      <TextField
        label="Search Images"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default ImageSearch;
