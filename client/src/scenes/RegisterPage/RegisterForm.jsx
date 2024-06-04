import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Register from "../../components/Register"
import * as apiClient from "../../apiClient"
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



import { useMutation } from "react-query";

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


const RegisterForm = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    // const nonMobileScreen = useMediaQuery("(min-width:600px)")

    const { mutate, isLoading } = useMutation(apiClient.register, {
        onSuccess: () => {
            navigate("/login")
        },
        onError: () => {
            console.log("Error register")
        }
    })


    const handleFormSubmit = (values, onSubmitProps) => {
        const formdata = new FormData()

        for (let value in values) {
            formdata.append(value, values[value])
        }

        // console.log(formdata)

        mutate(formdata)
    }


    return (
        <Formik
            onSubmit={(values, onSubmitProps) => handleFormSubmit(values, onSubmitProps)}
            initialValues={initialValueRegister}
            validationSchema={registerSchema}
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


                    <Register
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                    />

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
                            {isLoading ? "Loading..." : "Regsiter"}
                        </Button>

                        <Typography
                            onClick={() => {
                                navigate('/login')
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
                            "Already have an Account? Login Here"
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )

}

export default RegisterForm