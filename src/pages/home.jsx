import React from "react";

import { Stack, Box } from "@mui/material";
import { StyleClientNweLib } from "../lib/newStylesLib";
import { MainLayout } from "../mylayouts";
import ScrollableContent from "./scrollcontroll";
import { ControlledCarousel } from "./carousel/carousel";


export const Home = () => {
  return (
    <MainLayout>
    <StyleClientNweLib.container>
      <StyleClientNweLib.wrapperCardBoxCharts>
  

      <ControlledCarousel/>
     
       
      </StyleClientNweLib.wrapperCardBoxCharts>
      
      
    </StyleClientNweLib.container>
    </MainLayout>
  );
};
