import { Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../contexts/AuthContext'
import { fetchLectuterLesson } from '../../services/Api'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

function LecturerLessonsPage() {
    const { user } = useAuth()
    const { isLoading, error, data } = useQuery("user:lessons", () => fetchLectuterLesson(user.userId))
    if (isLoading) return <div className='d-flex h-75 justify-content-center align-items-center'><div className="spinner-border" /></div>

    if (error) return 'Hata: ' + error.message

    const lessons = data.data

    const columns = [
        {
            title: 'İsim',
            dataIndex: 'lecturerName',
            key: 'lecturerName',
        },
        {
            title: 'Dönem',
            dataIndex: 'periodName',
            key: 'periodName',
        },
        {
            title: 'Ders Kodu',
            dataIndex: 'lessonCode',
            key: 'lessonCode',
        },
        {
            title: 'Ders Adı',
            dataIndex: 'lessonName',
            key: 'lessonName',
        },
        {
            title: 'Müdek Dökümanları',
            dataIndex: 'mudekDocs',
            key: 'mudekDocs',
            render: (record) => (
                <Upload >
                    <Button className='d-flex align-items-center' icon={<UploadOutlined />}>Yükle</Button>
                </Upload>
            )
        },
    ]
    return (
        <div className='d-sm-flex flex-column p-3 p-sm-5 pt-sm-3'>
            <Table className='mt-3 mx-0 mx-sm-5' dataSource={lessons} columns={columns} rowKey="lessonId" size="small" />
        </div>
    )
}

export default LecturerLessonsPage