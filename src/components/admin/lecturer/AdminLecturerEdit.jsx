import React from 'react'
import Form from 'react-bootstrap/Form';
import { message } from 'antd'
import { Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query';
import validations from './validations'
import { updateUsers } from '../../../services/Api';

function AdminLecturerEdit({ modalData, handleCancel }) {
    const queryClient = useQueryClient()
    const updateMutation = useMutation(updateUsers, {
        onSuccess: () => {
            queryClient.refetchQueries("admin:users")
        }
    })

    const handleSubmit = (values) => {
        message.loading({ content: "Güncelleniyor", key: "user:update", duration: 3 })
        updateMutation.mutate({...values,id: modalData.id}, {
            onSuccess: () => {
                handleCancel()
               return message.success({ content: "Başarıyla Güncellendi", key: "user:update", duration: 3 })
            },
            onError: (data) => message.error({ content: `${data.response.data}`, key: "user:update", duration: 3 })
        })
    }

    return (
        <div>
            <Formik initialValues={{
                fullname: modalData.fullname,
                userName: modalData.userName,
                email: modalData.email,
                password: "",
            }}
                validationSchema={validations}
                onSubmit={handleSubmit}
            >
                {
                    ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                        <div>
                            <Form onSubmit={handleSubmit}>
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
                                        isValid={!errors.fullname}
                                    />
                                    {touched.fullname && errors.fullname && <div className='text-danger'>{errors.fullname}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kullanıcı Adı</Form.Label>
                                    <Form.Control
                                        id='userName'
                                        name='userName'
                                        type="text"
                                        value={values.userName}
                                        placeholder="Kullanıcı Adı Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.userName && errors.userName}
                                        isValid={!errors.userName}
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
                                        isValid={!errors.email}
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
                                <button type="submit" className='btn btn-light border'>Güncelle</button>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default AdminLecturerEdit