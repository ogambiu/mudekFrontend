import * as yup from 'yup'

const validations = yup.object().shape({
    password: yup
    .string()
    .min(6, "Parolanız En Az 6 Karakter Olmalıdır")
    .required("Zorunlu Bir Alan")
    .matches(
        /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Rakam ve Özel Karakter İçermelidir"
    )
    .matches(
        /^(?=.*[a-z])/,"Küçük Harf Bulunmalıdır"
    )
    .matches(
        /^(?=.*[A-Z])/,"Büyük Harf Bulunmalıdır"
    ),
    userName: yup
    .string()
    .required("Zorunlu Bir Alan"),
})

export default validations;