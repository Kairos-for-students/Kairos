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
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";


const editSchema = yup.object().shape({
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



const EditProfile = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nonMobileScreen = useMediaQuery("(min-width:600px)")

    const {
        _id,
        firstname,
        lastname,
        email,
        picturePath,
        location,
        year,
        college,
        branch } = useSelector((state) => state.user);

    const initialValuesEdit = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        location: location,
        college: college,
        year: year,
        branch: branch,
        picture: picturePath,
    }

    const editUser = async (values, onSubmitProps) => {
        try {
            const formdata = new FormData();

            // Iterate over the form values
            for (let value in values) {
                // If the current value is "picture" and it's falsy (not selected by the user)
                if (value === "picture" && !values[value]) {
                    // Append the default picture path directly or use the actual content of the default image
                    formdata.append(value, picturePath); // Set your default picture path
                } else {
                    // For other fields, append the values as usual
                    formdata.append(value, values[value]);
                }
            }

            // Append the picturePath separately based on whether a picture is selected or not
            if (!values.picture || !values.picture.name) {
                formdata.append("picturePath", picturePath);
            } else {
                formdata.append("picturePath", values.picture.name);
            }

            const savedUserResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${_id}/edit`, {
                method: "PATCH",
                body: formdata,
            });

            const editedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();
            if (editedUser) {
                dispatch(
                    setLogin({
                        user: editedUser.user,
                    }
                    )
                );
                navigate("/home");
            }

        } catch (error) {
            console.error("Edit profile  Error:", error);
        }
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await editUser(values, onSubmitProps)
    }

    return (
        <Formik
            onSubmit={(values, onSubmitProps) => handleFormSubmit(values, onSubmitProps)}
            initialValues={initialValuesEdit}
            validationSchema={editSchema}
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
                    </Box>

                    {/* Buttons  */}
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
                            Save User
                        </Button>

                </form>
            )}
        </Formik>
    )
}
export default EditProfile