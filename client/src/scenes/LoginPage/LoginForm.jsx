
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../apiClient"
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useMutation } from "react-query";

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValueLogin = {
    email: "",
    password: ""
}

const LoginForm = () => {

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nonMobileScreen = useMediaQuery("(min-width:600px)")


    const { mutate, isLoading } = useMutation(apiClient.login, {
        onSuccess: (data) => {
            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token
                }
                )
            );
            navigate("/")
        },
        onError: () => {
            console.log("Error login")
        }
    })

    const handleFormSubmit = (values, onSubmitProps) => {
        // console.log(values)

        mutate(values)
    }

    return (

        <Formik
            onSubmit={(values, onSubmitProps) => handleFormSubmit(values, onSubmitProps)}
            initialValues={initialValueLogin}
            validationSchema={loginSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: nonMobileScreen ? undefined : "span 4" },
                        }}>
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && errors.email}
                            helperText={touched.email && errors.email}
                            sx={{
                                gridColumn: "span 4"
                            }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && errors.password}
                            helperText={touched.password && errors.password}
                            sx={{
                                gridColumn: "span 2"
                            }}
                        />
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLoading ? "Loading..." : "LOGIN"}
                        </Button>

                        <Typography
                            onClick={() => {
                                navigate('/register')
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light
                                }
                            }}
                        >
                            Don't have an Account? Sign Up Here
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>

    )
}

export default LoginForm
