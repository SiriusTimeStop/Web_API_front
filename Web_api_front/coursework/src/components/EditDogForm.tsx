import 'antd/dist/reset.css';
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Input, Button,  Modal, Typography} from 'antd';
import { EditOutlined,EditFilled } from '@ant-design/icons';
import axios from "axios";
import { api } from './common/http-common';
import { getCurrentUser } from "../services/auth.service";
const { Title } = Typography;
const { TextArea } = Input;
    
const EditDogForm: React.FC = (props:any) => {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isShow, setIsShow] = React.useState(false); 
    const aa:any = JSON.parse(localStorage.getItem('e') || "{}");
   // console.log("aa  ", aa)
    //console.log('aa.title ',aa.title)
    const contentRules = [
        {required: true, message: 'Please input somethings'}    
      ]
      
      const handleFormSubmit  = (values: any) => {
        const t = values.dogname;
        const a = values.maintext;
        const s = values.summary;
        const l = values.locationid;
        const d = values.description;
        const u = values.imageurl;
        const currentUser = getCurrentUser();
       
       // console.log('new dogTable '+ t,a,s,d,u,currentUser.id);
        const postDogTable = {
          dogname: t,
          maintext: a,
          summary:s,
          locationid:l,
          description:d,
          imageurl:u,
          staffid: currentUser.id
        }
       
        if(props.isNew==false){
       console.log(`path: ${api.uri}/dogs${props.aid}`)
        axios.put(`${api.uri}/dogs/${props.aid}`, postDogTable, {
            headers: {
              'Authorization': `Basic ${localStorage.getItem('aToken')}`
            }
          })
            .then((res)=> {
            alert("Dog blog updated")
            console.log(res.data);
            localStorage.removeItem("e");
             navigate("/");
            window.location.reload();
        });
      }
       else
       {console.log(`path: ${api.uri}/dogs`)
        axios.post(`${api.uri}/dogs`, postDogTable, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('aToken')}`
        }
      })
        .then((res)=> {
        alert("New dog blog created")
        console.log(res.data);
         navigate("/");
        window.location.reload();
      });
      }
    }
  return (
    <>
      <Button icon={<EditOutlined />} onClick={()=>{setIsShow(true)}} />
      <Modal open={isShow} onCancel={()=>{setIsShow(false)}} title="Welcome Blogger" footer={[]}> 
    <p></p>
    {props.isNew?(<Title level={3} style={{color:"#0032b3"}}>Create New Dog Blog</Title>):(<Title level={3} style={{color:"#0032b3"}}>Update Dog Blog</Title>)}
    <Form name="dogTable" onFinish={(values)=>handleFormSubmit(values)}>
      <Form.Item name="dogname" label="The dog name" rules={contentRules}>
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.dogname} />)}
      </Form.Item>
      <Form.Item name="maintext" label="About the dog" rules={contentRules}>
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.maintext} />)}       
      </Form.Item>
      <Form.Item name="summary" label="Summary" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.summary} />)}
      </Form.Item>

      <Form.Item name="locationid" label="Dog location" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.locationid} />)}
      </Form.Item>

      <Form.Item name="description" label="Detail Description" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.description} />)}
      </Form.Item>
      <Form.Item name="imageurl" label="ImageURL" >
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.imageurl} />)}  
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>     
    </Form>
    </Modal>
    </>
  );
};


export default EditDogForm;
