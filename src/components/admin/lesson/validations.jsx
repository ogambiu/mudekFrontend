import * as yup from 'yup'

const validations = yup.object().shape({
    lessonCode: yup.
    string()
    .required("Zorunlu Bir Alan"),
    lessonName: yup.
    string()
    .required("Zorunlu Bir Alan"),
    lecturerId:yup.
    string()
    .required("Zorunlu Bir Alan"),
    periodId:yup.
    string()
    .required("Zorunlu Bir Alan"),
})

export default validations;