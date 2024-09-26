import * as yup from 'yup'

const CreateTemplateSchema = yup.object().shape({
    templatename:yup.string().required("Name is required"),
    subject:yup.string().required("Subject is required"),
    body:yup.string().required("Body is required")

})

export default CreateTemplateSchema