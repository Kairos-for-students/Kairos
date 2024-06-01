import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
    const theme = useTheme();
    const nonMobileScreen = useMediaQuery("(min-width: 924px)");

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box width="100%" bgcolor={theme.palette.background.alt}
                p="1rem 6%" textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    Kairos
                </Typography>
            </Box>

            <Box
                width={nonMobileScreen ? "50%" : "93%"}
                p="2rem"
                m="2rem"
                border="1.5rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgcolor={theme.palette.background.alt}

            >
                <Typography
                    fontWeight="500" variant="h5" sx={{
                        mb: "1.5rem",
                    }}
                >
                    Welcome to Kaioros
                </Typography>

                <Box width="100%">
                    <RegisterForm />
                </Box>


            </Box>

        </Box>
    )
}

export default RegisterPage;