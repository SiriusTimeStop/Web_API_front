import React from "react";
import { Button, Form, Input, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';



const LoginForm = ()=>{
    const [isShow, setIsShow] = React.useState(false); 

    return (
        <>
            <Button icon={<UserOutlined />} onClick={()=>{setIsShow(true)}} />
            <Modal open={isShow} onCancel={()=>{setIsShow(false)}} title="Welcome Blogger" footer={[]}> 
                <Form>
                    <Form.Item label="Username" 
                    rules={[{required: true, message: 'Missing username'}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="password"
                    rules={[{required: true, message: 'Missing password'}]}>
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Button</Button>
                </Form>
            </Modal>
        </>
    )
}
export default LoginForm;