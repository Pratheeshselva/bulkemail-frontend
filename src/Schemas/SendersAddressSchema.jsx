import * as yup from 'yup'

const senderAdressSchema = yup.object().shape({
    user: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Please enter password")

})

export default senderAdressSchema