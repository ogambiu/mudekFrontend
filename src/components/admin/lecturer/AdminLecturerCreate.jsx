import React from 'react'
import Form from 'react-bootstrap/Form';
import { message } from 'antd'
import { Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query';
import { postAdminCreateUser } from '../../../services/Api';
import validations from './validations'

function AdminLecturerCreate({ handleCreateCancel }) {
    const addMutation = useMutation(postAdminCreateUser, {
        onSuccess: () => {  
            queryClient.refetchQueries("admin:users")
        }
    })

    const queryClient = useQueryClient()

    const handleSubmit = async (values) => {
        message.loading({ content: "Ekleniyor", key: "user:create", duration: 3 })
        addMutation.mutate(values, {
            onSuccess: () => {
                handleCreateCancel()
                return message.success({ content: "Başarıyla Eklendi", key: "user:create", duration: 3 })
            },
            onError: (data) => message.error({ content: `${data.response.data}`, key: "user:create", duration: 3 })
        })
    }
    return (
        <div>
            <Formik initialValues={{
                fullname: "",
                userName: "",
                email: "",
                password: "",
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
                                    <Form.Label>İsim</Form.Label>
                                    <Form.Control
                                        id='fullname'
                                        name='fullname'
                                        type="text"
                                        value={values.fullname}
                                        placeholder="İsim Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.fullname && errors.fullname}
                                        isValid={touched.fullname && !errors.fullname}
                                    />
                                    {touched.fullname && errors.fullname && <div className='text-danger'>{errors.fullname}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kullanıcı Adı</Form.Label>
                                    <Form.Control
                                        id='userName'
                                        name='userName'
                                        value={values.userName}
                                        type="text"
                                        placeholder="Kullanıcı Adı Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.userName && errors.userName}
                                        isValid={touched.userName && !errors.userName}
                                    />
                                    {touched.userName && errors.userName && <div className='text-danger'>{errors.userName}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        id='email'
                                        name='email'
                                        type="text"
                                        value={values.email}
                                        placeholder="Mail Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && errors.email}
                                        isValid={touched.email && !errors.email}
                                    />
                                    {touched.email && errors.email && <div className='text-danger'>{errors.email}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Şifre</Form.Label>
                                    <Form.Control
                                        id='password'
                                        name='password'
                                        type="password"
                                        value={values.password}
                                        placeholder="Şifre Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && errors.password}
                                        isValid={touched.password && !errors.password}
                                    />
                                    {touched.password && errors.password && <div className='text-danger'>{errors.password}</div>}
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

export default AdminLecturerCreate