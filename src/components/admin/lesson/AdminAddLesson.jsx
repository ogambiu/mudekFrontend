import React from 'react'
import Form from 'react-bootstrap/Form';
import { message } from 'antd'
import { Formik } from 'formik'
import Dropdown from 'react-bootstrap/Dropdown';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import validations from './validations'
import { getAddLecturers, getPeriods, postAdminCreateLesson } from '../../../services/Api';

function AdminAddLesson({ handleCancel }) {
    const { isLoading: loadingPeriod, error: errorLoad, data: periodData } = useQuery("admin:period", getPeriods)
    const { isLoading: loadingLecturers, error: errorLecturers, data: lecturersData } = useQuery("admin:addlecturers", getAddLecturers)

    const queryClient = useQueryClient()
    const addMutation = useMutation(postAdminCreateLesson, {
        onSuccess: () => {
            queryClient.refetchQueries("admin:lessons")
        }
    })

    const handleSubmit = async (values) => {
        message.loading({ content: "Ekleniyor", key: "admin:lesson:create", duration: 3 })
        addMutation.mutate(values, {
            onSuccess: () => {
                handleCancel()
                return message.success({ content: "Başarıyla Eklendi", key: "admin:lesson:create", duration: 3 })
            },
            onError: (data) => message.error({ content: `${data}`, key: "admin:lesson:create", duration: 3 })
        })
    }

    if (loadingPeriod) return <div className='d-flex h-75 justify-content-center align-items-center'><div className="spinner-border" /></div>
    if (loadingLecturers) return <div className='d-flex h-75 justify-content-center align-items-center'><div className="spinner-border" /></div>

    if (errorLoad) return 'Hata: ' + error.message
    if (errorLecturers) return 'Hata: ' + error.message

    const lecturersDropdownData = lecturersData.data.map((element) => ({ key: element.id, value: element.fullName }))
    const periodsDropdownData = periodData.data.map((element) => ({ key: element.id, value: element.periodName }))

    return (
        <div>
            <Formik initialValues={{
                lessonCode: "",
                lessonName: "",
                lecturerId: "",
                periodId: "",
            }}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                {
                    ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting, resetForm }) => (
                        <div>
                            <Form onSubmit={
                                handleSubmit
                            }>
                                <Form.Group className="mt-4 mb-3">
                                    <Form.Label>Ders Kodu</Form.Label>
                                    <Form.Control
                                        id='lessonCode'
                                        name='lessonCode'
                                        type="text"
                                        value={values.lessonCode}
                                        placeholder="Ders Kodu Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.lessonCode && errors.lessonCode}
                                        isValid={touched.lessonCode && !errors.lessonCode}
                                    />
                                    {touched.lessonCode && errors.lessonCode && <div className='text-danger'>{errors.lessonCode}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ders Adı</Form.Label>
                                    <Form.Control
                                        id='lessonName'
                                        name='lessonName'
                                        type="text"
                                        value={values.lessonName}
                                        placeholder="Ders Kodu Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.lessonName && errors.lessonName}
                                        isValid={touched.lessonName && !errors.lessonName}
                                    />
                                    {touched.lessonName && errors.lessonName && <div className='text-danger'>{errors.lessonName}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dönem</Form.Label>
                                    <Form.Select
                                        required
                                        as="select"
                                        id = "periodId"
                                        type="select"
                                        name="periodId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Dönem Seçiniz"
                                        isInvalid={touched.periodId && errors.periodId}
                                        isValid={touched.periodId && !errors.periodId}
                                        value={values.periodId}
                                    >
                                        <option value="">Seçiniz</option>
                                        {
                                            periodsDropdownData.map((e)=><option value={e.key} key={e.key}>{e.value}</option>)
                                        }
                                        
                                    </Form.Select>
                                    {touched.periodId && errors.periodId && <div className='text-danger'>{errors.periodId}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Öğretim Üyesi</Form.Label>
                                    <Form.Select
                                        required
                                        as="select"
                                        id = "lecturerId"
                                        type="select"
                                        name="lecturerId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Öğretim Elemanı Seçiniz"
                                        isInvalid={touched.lecturerId && errors.lecturerId}
                                        isValid={touched.lecturerId && !errors.lecturerId}
                                        value={values.lecturerId}
                                    >
                                        <option value="">Seçiniz</option>
                                        {
                                            lecturersDropdownData.map((e)=><option value={e.key} key={e.key}>{e.value}</option>)
                                        }
                                        
                                    </Form.Select>
                                    {touched.lecturerId && errors.lecturerId && <div className='text-danger'>{errors.lecturerId}</div>}
                                </Form.Group>
                                <button type="reset" className='btn btn-light border me-2' onClick={resetForm}>Temizle</button>
                                <button type="submit" className='btn btn-light border'>Ekle</button>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default AdminAddLesson