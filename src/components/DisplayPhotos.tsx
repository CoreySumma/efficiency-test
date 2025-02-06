import { Box } from "@mui/material";
import { Photos } from "../methods/search/types/response";

// TODO switch to grid (maybe)

export default function DisplayPhotos({
  photos,
}: {
  photos: Photos["results"];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
        mt: 10,
      }}
    >
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.small}
          style={{ width: 300, height: 300, objectFit: "cover" }}
          loading="lazy"
        />
      ))}
    </Box>
  );
}
