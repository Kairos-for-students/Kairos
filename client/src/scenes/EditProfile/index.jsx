import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Navbar from "scenes/navbar";

const EditProfile = () => {
    const theme = useTheme();
    const nonMobileScreen = useMediaQuery("(min-width: 924px)");



    return (
        <Box>
            <Box>
                <Navbar />
            </Box>

            <Box
                width={nonMobileScreen ? "50%" : "93%"}
                p="2rem"
                m="2rem"
                border="1.5rem"
                bgcolor={theme.palette.background.alt}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top="8rem"
                left="20%"
            >
                <Typography
                    fontWeight="500" variant="h5" sx={{
                        mb: "3rem",

                    }}
                >
                    Edit Profile
                </Typography>
                <Form />
            </Box>

        </Box>


    )
}
export default EditProfile