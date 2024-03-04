import React from 'react'
import { Table, Space, Popconfirm, message, Modal } from 'antd'
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import AdminLecturerEdit from '../../../components/admin/lecturer/AdminLecturerEdit';
import AdminLecturerCreate from '../../../components/admin/lecturer/AdminLecturerCreate';
import { deleteUsers, fetchAdminUsers } from '../../../services/Api';

function AdminLecturerPage() {
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery("admin:users", fetchAdminUsers)

    const deleteMutation = useMutation(deleteUsers,
        {
            onSuccess: () => {
                queryClient.refetchQueries("admin:users")
            }
        }
    )
        
    const handleRemove = (record) => {
        deleteMutation.mutate(record.id, {
            onSuccess: () => message.success({ content: "Öğretim Üyesi Silindi", key: "admin:delete", duration: 3 }),
            onError: (error) => message.error({ content: `${error}`, key: "admin:delete", duration: 3 }),
        })
    }

    const [modalData, setModalData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const showModal = (record) => {
        setModalData(record)
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const handleCreateCancel = () => {
        setIsCreateModalOpen(false)
    }

    if (isLoading) return <div className='d-flex h-75 justify-content-center align-items-center'><div className="spinner-border"/></div>

    if (error) return 'Hata: ' + error.message

    const columns = [
        {
            title: 'İsim',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Kullanıcı Adı',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'E-Posta',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Kullanıcıyı Düzenle',
            dataIndex: 'edit',
            key: 'edit',
            render: (index, record) => (
                <button className="btn btn-primary" onClick={() => showModal(record)}>
                    Düzenle
                </button>
            ),
        },
        {
            title: "Sil",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Kullanıcıyı Sil"
                        description="Kullanıcıyı silmek istediğinize emin misiniz?"
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
        <div className='d-sm-flex flex-column p-3 p-sm-5 pt-sm-3'>
            <div className='text-center text-sm-end'>
                <button className='btn btn-primary mx-0 mx-sm-5' onClick={() => showCreateModal()}>Yeni Öğretim Üyesi Ekle</button>
            </div>
            <Table className='mt-3 mx-0 mx-sm-5' dataSource={data} columns={columns} rowKey="id" size="small" />
            <Modal title="Öğretim Üyesi Düzenleme" open={isModalOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel} cancelText="Kapat">
                <AdminLecturerEdit modalData={modalData} handleCancel={handleCancel} key={modalData.id} />
            </Modal>
            <Modal title="Öğretim Üyesi Ekle" open={isCreateModalOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCreateCancel} cancelText="Kapat">
                <AdminLecturerCreate handleCreateCancel={handleCreateCancel} />
            </Modal>
        </div>
    )
}

export default AdminLecturerPage