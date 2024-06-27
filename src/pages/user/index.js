import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from "antd";
import './user.css'
import { deleteUser, getUser, editUser, addUser } from "../../api";
import dayjs from "dayjs";


const User = () => {
  //创建form实例
  const [form] = Form.useForm()

  const [listData, setListData] = useState({
    name: '',
  })
  const [tableData, setTableData] = useState([])

  //0新增 1编辑
  const [modalType, setModalType] = useState(0)
  //modal展开
  const [isModalOpen, setIsModalOpen] = useState(false)


  //新增/编辑
  const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen)
    if (type == 'add') {
      setModalType(0)

    }
    else {
      setModalType(1)
      //深拷贝
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.birth = dayjs(cloneData.birth)
      //表单数据回显
      form.setFieldsValue(cloneData)
    }
  }
  //提交
  const handleFinish = (e) => {
    setListData({
      name: e.keyword
    })
    console.log(e);


  }
  useEffect(() => {
    getTableData()
  }, [listData])

  //删除
  const handleDelete = ({ id }) => {
    deleteUser({ id }).then(() => {
      getTableData()
    })

  }
  //弹窗ok
  const handleOk = () => {
    //表单校验
    form.validateFields().then((value) => {
      //日期参数转换
      value.birth = dayjs(value.birth).format("YYYY-MM-DD")
      console.log(value);

      //调接口
      if (modalType) {
        //编辑
        editUser(value).then(() => {
          handleCancel()
          getTableData()
        })
      } else {
        //新增
        addUser(value).then(() => {
          handleCancel()
          getTableData()
        }).catch((error) => {
          console.log(error);
        })
      }
      form.resetFields()
    })

  }
  //弹窗cancel
  const handleCancel = () => {
    setIsModalOpen(false)
    //form表单的清空
    form.resetFields()

  }

  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      console.log(data);
      setTableData(data.list)
    })

  }

  const columns = [
    {
      title: "姓名",
      dataIndex: 'name',
    },
    {
      title: "年龄",
      dataIndex: 'age',
    },
    {
      title: "性别",
      dataIndex: 'sex',
      render: (val) => {
        return val ? "女" : "男"
      }
    },
    {
      title: "出生日期",
      dataIndex: 'birth',
    },
    {
      title: "地址",
      dataIndex: 'addr',
    },
    {
      title: "操作",
      render: (rowData) => {
        return (
          <div className="flex-box">
            <Button style={{ marginRight: "5px" }} onClick={() => handleClick('adit', rowData)}>编辑</Button>
            <Popconfirm
              title="提示"
              description="此操作将删除该用户,是否继续?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button danger type="primary">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    },
  ]
  useEffect(() => {
    //调用后端接口获取用户列表数据
    getTableData()
  }, [])

  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
        <Form
          layout="inline"
          onFinish={handleFinish}
        >

          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item name="keyword">
            <Button htmlType="submit" type="primary">搜索</Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={"id"}  style={{marginTop:"15px"}}/>
      <Modal
        open={isModalOpen}
        title={modalType ? "编辑用户" : "新增用户"}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 18
          }}
          labelAlign="left"
        >
          {/* 后端传数据的时候会给我们一个标识,用来区分编辑和新增的数据,这个Form.Item用来保存下这个,但是需要把这个Item隐藏起来 */}
          {modalType == 1 && <Form.Item
            name="id"
            hidden
          >
            <Input />
          </Form.Item>}
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入姓名"
              }
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                required: true,
                message: "请输入年龄"
              }, {
                type: "number",
                message: "年龄必须是数字"
              }
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[
              {
                required: true,
                message: "性别是必要选项"
              }
            ]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                {
                  value: 0, label: "男"
                },
                { value: 1, label: "女" }

              ]}
            />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[
              {
                required: true,
                message: "请选择出生日期"
              }
            ]}
          >
            <DatePicker placeholder="请选择" format="YYYY/MM/DD"></DatePicker>
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[
              {
                required: true,
                message: "请填写地址"
              }
            ]}
          >
            <Input placeholder="请填写地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
};

export default User