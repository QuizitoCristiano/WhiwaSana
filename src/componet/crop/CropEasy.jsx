import { Cancel } from "@mui/icons-material";
import { CropIcon } from "@mui/icons-material/Crop";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slide,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import Cropper from "react-easy-crop";

const CropEasy = ({ photoURL, setPhotoURL, openCrop, setOpenCrop, file, 
    
 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const croImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      console.log("Imagem cortada:", file, url);
      
    } catch (error) {
      console.error("Erro ao cortar a imagem:", error);
    }
  };

  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={cropComplete}
        />
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Stack sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom:{zoomPercent(zoom)}</Typography>

            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            ></Slider>
          </Box>

          <Box>
            <Typography>Rotation:{rotation}</Typography>

            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)} // Atualiza o valor de rotação corretamente
            />
          </Box>

          <Stack
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => setOpenCrop(false)}
            >
              Cancelar
            </Button>

            <Button
              variant="outlined"
              startIcon={<CropIcon />}
              onClick={croImage}
            >
              Salvar
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
