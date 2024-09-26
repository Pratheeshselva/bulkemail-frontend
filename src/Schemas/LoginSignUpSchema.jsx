import * as yup from 'yup'

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

const SignUpSchema = yup.object().shape({
    email:yup.string().email("Please enter a valid email").required("Required"),
    name:yup.string().required("Name is required"),
    password:yup.string().min(5).matches(passwordRules,{message: `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
}).required("Required"),
confirmpassword:yup.string().oneOf([yup.ref('password'),null],'Passwords must match').required("Required")
})

const LoginSchema = yup.object().shape({
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:yup.string().required("Please enter password")

})

export {SignUpSchema, LoginSchema}


