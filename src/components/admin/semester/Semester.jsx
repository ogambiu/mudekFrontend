import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Table, Space, Popconfirm, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Formik } from 'formik'
import Form from 'react-bootstrap/Form';
import { deleteSemester, getSemesters, postSemester } from '../../../services/Api';
import validations from './validations';

function Semester() {
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery("admin:semester", getSemesters)

    const deleteMutation = useMutation(deleteSemester,
        {
            onSuccess: () => {
                queryClient.refetchQueries("admin:semester")
                queryClient.refetchQueries("admin:period")
            }
        }
    )

    const handleRemove = async (record) => {
        deleteMutation.mutate(record, {
            onSuccess: () => message.success({ content: "Dönem Silindi", key: "admin:semester:delete", duration: 3 }),
            onError: (error) => message.error({ content: `Hata`, key: "admin:semester:delete", duration: 3 }),
        })
    }

    const addMutation = useMutation(postSemester, {
        onSuccess: () => {
            queryClient.refetchQueries("admin:semester")
            queryClient.refetchQueries("admin:period")
        }
    })

    const handleSubmit = async (values) => {
        message.loading({ content: "Ekleniyor", key: "admin:semester:create", duration: 3 })
        addMutation.mutate(values, {
            onSuccess: () => {
                return message.success({ content: "Başarıyla Eklendi", key: "admin:semester:create", duration: 3 })
            },
            onError: (data) => message.error({ content: `Hata`, key: "admin:semester:create", duration: 3 })
        })
    }

    if (isLoading) return <div className='d-flex h-75 justify-content-center align-items-center'><div className="spinner-border" /></div>

    if (error) return 'Hata: ' + error.message

    const columns = [
        {
            title: 'Dönem',
            dataIndex: 'periodName',
            key: 'periodName',
        },
        {
            title: "Sil",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Dönem Sil"
                        description="Dönemi silmek istediğinize emin misiniz?"
                        onConfirm={() => handleRemove(record)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <a href="#" className="text-decoration-none">Sil</a>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Dönemler</Accordion.Header>
                    <Accordion.Body>
                        <Table className='m-0' dataSource={data.data} columns={columns} rowKey="id"/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Formik initialValues={{
                periodName: "",
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
                                    <Form.Label>Dönem Ekle</Form.Label>
                                    <Form.Control
                                        id='periodName'
                                        name='periodName'
                                        type="text"
                                        value={values.periodName}
                                        placeholder="Dönem Giriniz"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.periodName && errors.periodName}
                                        isValid={touched.periodName && !errors.periodName}
                                    />
                                    {touched.periodName && errors.periodName && <div className='text-danger'>{errors.periodName}</div>}
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

export default Semester