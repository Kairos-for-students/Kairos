import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    college: yup.string(),
    year: yup.string(),
    branch: yup.string(),
    picture: yup.string(),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValueRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    college: "",
    year: null,
    branch: "",
    picture: ""
}



const initialValueLogin = {
    email: "",
    password: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nonMobileScreen = useMediaQuery("(min-width:600px)")
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"

    const register = async (values, onSubmitProps) => {
        try {
            // Create a new FormData instance
            const formdata = new FormData();

            // Iterate over the form values
            for (let value in values) {
                // If the current value is "picture" and it's falsy (not selected by the user)
                if (value === "picture" && !values[value]) {
                    // Append the default picture path directly or use the actual content of the default image
                    formdata.append(value, "maleAvtaar.jpg"); // Set your default picture path
                } else {
                    // For other fields, append the values as usual
                    formdata.append(value, values[value]);
                }
            }

            // Append the picturePath separately based on whether a picture is selected or not
            if (!values.picture || !values.picture.name) {
                formdata.append("picturePath", "maleAvtaar.jpg");
            } else {
                formdata.append("picturePath", values.picture.name);
            }

            console.log("Form Data:", formdata);

            // Send the formdata in the request
            const savedUserResponse = await fetch("https://kairos-murex.vercel.app/auth/register", {
                method: "POST",
                body: formdata,
            });

            // Handle the response as needed
            const savedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();

            if (savedUser) {
                setPageType("login");
            }
        } catch (error) {
            console.error("Registration Error:", error);
        }
    };


    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "https://kairos-murex.vercel.app/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                }
                )
            );
            navigate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) {
            await login(values, onSubmitProps);
        }
        if (isRegister) {
            await register(values, onSubmitProps)
        }
    }
    return (
        <Formik
            onSubmit={(values, onSubmitProps) => handleFormSubmit(values, onSubmitProps)}
            initialValues={isLogin ? initialValueLogin : initialValueRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
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
                        }}
                    >

                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstname}
                                    name="firstname"
                                    error={Boolean(touched.firstname) && errors.firstname}
                                    helperText={touched.firstname && errors.firstname}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastname}
                                    name="lastname"
                                    error={Boolean(touched.firstname) && errors.lastname}
                                    helperText={touched.lastname && errors.lastname}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />

                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && errors.location}
                                    helperText={touched.location && errors.location}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />

                                <TextField
                                    label="College"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.college}
                                    name="college"
                                    error={Boolean(touched.college) && errors.college}
                                    helperText={touched.college && errors.college}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />

                                <TextField
                                    label="Year"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.year}
                                    name="year"
                                    error={Boolean(touched.year) && errors.year}
                                    helperText={touched.year && errors.year}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />

                                <TextField
                                    label="Branch"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.branch}
                                    name="branch"
                                    error={Boolean(touched.branch) && errors.branch}
                                    helperText={touched.branch && errors.branch}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />

                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg, .jpeg, .png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            setFieldValue("picture", acceptedFiles[0])
                                        }}
                                    >
                                        {({
                                            getRootProps,
                                            getInputProps
                                        }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

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


                    {/* Buttons  */}
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
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>

                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
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
                            {isLogin ? "Don't have an Account? Sign Up Here" : "Already have an Account? Login Here"}
                        </Typography>
                    </Box>


                </form>
            )}
        </Formik>

    )
}

export default Form;