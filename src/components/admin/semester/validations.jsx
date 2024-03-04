import * as yup from 'yup'

const validations = yup.object().shape({
    periodName: yup.
    string()
    .required("Zorunlu Bir Alan"),
})

export default validations;