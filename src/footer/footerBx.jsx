import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { NewLogoHeader } from "../Header/logoHeader";
import { green } from "@mui/material/colors";
import "../Header/header.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { StyleFooter } from "./stylesFooter";
export const MyFooter = () => {
  return (
    <>
      <StyleFooter.container>
        <StyleFooter.newBoxCharts>
          <StyleFooter.newContainerStack>
            <StyleFooter.centeredBox>
              <Typography variant="h5">
                <strong>Grátis até que você </strong> esteja pronto para lançar
              </Typography>
            </StyleFooter.centeredBox>

            <StyleFooter.inputButtonStack>
              <StyleFooter.cardStyledTextField
                type="text"
                label="Informe a rua da empresa"
                id="Informe a rua da empresa"
                autoComplete="true"
                placeholder="Informe a rua da empresa"
                variant="outlined"
                size="medium"
              />
              <StyleFooter.newCardStyledButton>
                Enviar
              </StyleFooter.newCardStyledButton>
            </StyleFooter.inputButtonStack>
          </StyleFooter.newContainerStack>
        </StyleFooter.newBoxCharts>

        <StyleFooter.wrapperCardBoxCharts>
          <StyleFooter.containerChild>
            <StyleFooter.wrapperCardBox>
              <StyleFooter.wrapperTextBox>
                <Box>
                  <NewLogoHeader />
                </Box>
                <Typography className="logoDelicacy">
                  Whiw<strong>aSana</strong>
                </Typography>
              </StyleFooter.wrapperTextBox>
              <StyleFooter.wrapperTextTitleBox>
                Projetar Online2024© Todos <br /> os direitos reservados
              </StyleFooter.wrapperTextTitleBox>
            </StyleFooter.wrapperCardBox>
          </StyleFooter.containerChild>

          <StyleFooter.containerChild>
            <StyleFooter.wrapperCardBox>
              <StyleFooter.wrapperTextBox>
                <StyleFooter.wrapperTygrphyBox>
                  Contato
                </StyleFooter.wrapperTygrphyBox>
              </StyleFooter.wrapperTextBox>

              <StyleFooter.wrapperTextTitleBox>
                +55 11 99999-9999
              </StyleFooter.wrapperTextTitleBox>

              <StyleFooter.wrapperTextTitleBox>
                kizitocristiano@gmail.com
              </StyleFooter.wrapperTextTitleBox>

              <StyleFooter.wrapperTextTitleBox>
                CNPJ: 44.327.842/0001-28
              </StyleFooter.wrapperTextTitleBox>
            </StyleFooter.wrapperCardBox>
          </StyleFooter.containerChild>

          <StyleFooter.containerChild>
            <StyleFooter.wrapperCardBox>
              <StyleFooter.wrapperTextBox>
                <StyleFooter.wrapperTygrphyBox>
                  Políticas
                </StyleFooter.wrapperTygrphyBox>
              </StyleFooter.wrapperTextBox>

              <Box>
                <StyleFooter.wrapperTextTitleBox>
                  Termos de Uso
                </StyleFooter.wrapperTextTitleBox>

                <StyleFooter.wrapperTextTitleBox>
                  Política de Privacidade
                </StyleFooter.wrapperTextTitleBox>
              </Box>
            </StyleFooter.wrapperCardBox>
          </StyleFooter.containerChild>

          <StyleFooter.containerChild>
            <StyleFooter.wrapperCardBox>
              <StyleFooter.wrapperTextBox>
                <StyleFooter.wrapperH4Box>
                  Nossas redes
                </StyleFooter.wrapperH4Box>
              </StyleFooter.wrapperTextBox>

              <StyleFooter.secialMiddleBox
                
              >
                < StyleFooter.secialMiddleIcon
                 
                >
                  <FacebookRoundedIcon
                    sx={{
                      fontSize: "40px",
                      fontWeight: 600,
                    }}
                  />
                </StyleFooter.secialMiddleIcon>

                <StyleFooter.secialMiddleIcon
                >
                  <WhatsAppIcon sx={{ fontSize: "40px" }} />
                </StyleFooter.secialMiddleIcon>

                <StyleFooter.secialMiddleIcon
                >
                  <InstagramIcon
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                </StyleFooter.secialMiddleIcon>
              </StyleFooter.secialMiddleBox>
            </StyleFooter.wrapperCardBox>
          </StyleFooter.containerChild>
        </StyleFooter.wrapperCardBoxCharts>
      </StyleFooter.container>
    </>
  );
};
