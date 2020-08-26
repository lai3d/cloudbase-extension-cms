import React, { useState } from 'react'
import { useRequest, history } from 'umi'
import ProList from '@ant-design/pro-list'
import { getUserRoles, deleteUserRole } from '@/services/role'
import { Button, Tag, Modal, Skeleton, Typography } from 'antd'

export default (): React.ReactElement => {
  const [reload, setReload] = useState(0)

  const { data, loading } = useRequest(() => getUserRoles(), {
    refreshDeps: [reload],
  })

  if (loading) {
    return <Skeleton />
  }

  return (
    <ProList<string>
      actions={[
        <Button
          key="new"
          size="small"
          type="primary"
          onClick={() => history.push('/settings/role/create')}
        >
          新建
        </Button>,
      ]}
      rowKey="id"
      dataSource={data}
      renderItem={(item: any) => ({
        title: (
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            {item.roleName}
          </Typography.Title>
        ),
        subTitle: item.type === 'system' && <Tag color="#2575e6">系统</Tag>,
        actions: [
          // <Button
          //     size="small"
          //     key="edit"
          //     type="primary"
          //     onClick={() => {
          //         setUserAction('edit')
          //         setSelectedUser(item)
          //         setModalVisible(true)
          //     }}
          // >
          //     编辑
          // </Button>,
          <Button
            danger
            size="small"
            key="delete"
            type="primary"
            disabled={item.type === 'system'}
            onClick={() => {
              Modal.confirm({
                title: `确认删除角色【${item.roleName}】？`,
                onOk: async () => {
                  await deleteUserRole(item._id)
                  setReload(reload + 1)
                },
              })
            }}
          >
            删除
          </Button>,
        ],
        description: <div>{item.description}</div>,
      })}
    />
  )
}