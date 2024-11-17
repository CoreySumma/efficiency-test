import { Box } from "@mui/material";
import { Photos } from "../methods/search/types/response";

// TODO switch to grid (maybe)

export default function DisplayPhotos({ photos }: { photos: Photos['results'] }) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} p={2}>
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.small}
          style={{ width: 300, height: 300, objectFit: "cover" }}
        />
      ))}
    </Box>
  );
}