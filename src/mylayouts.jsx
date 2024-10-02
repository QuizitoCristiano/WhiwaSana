import { Stack } from "@mui/material";
import { MyHeader } from "./Header/Header";
import { MyFooter } from "./footer/footerBx";

export const MainLayout = ({ children }) => {
    return (
        <Stack sx={{ width: "100vw", height: "auto", bgcolor: 'grey' }}>
            <MyHeader />
            <Stack sx={{ width: "100%", mt: 0, height: "100vh", color: 'blue' }}>
                {children}
            </Stack>
           
        </Stack>
    );
};
