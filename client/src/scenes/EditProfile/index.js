import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Navbar from "scenes/navbar";

const EditProfile = () => {
    const theme = useTheme();
    const nonMobileScreen = useMediaQuery("(min-width: 924px)");



    return (
        <Box>
            <Navbar />
        </Box>

    )
}
export default EditProfile