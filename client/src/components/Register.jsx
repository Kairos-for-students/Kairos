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
import * as apiClient from "../apiClient.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { useMutation, useQueryClient } from "react-query";


const Register = ({values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
    const { palette } = useTheme();
    const nonMobileScreen = useMediaQuery("(min-width:600px)")
    // const queryClient = useQueryClient();

    return (
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: nonMobileScreen ? undefined : "span 4" },
            }}
        >
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
                    gridColumn: "span 4"
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


        </Box>
    )


}

export default Register