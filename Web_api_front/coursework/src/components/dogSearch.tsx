import 'antd/dist/reset.css';
import  { useState } from 'react';
import {  Input, message, Typography } from 'antd';
import { api } from './common/http-common';
import {Table,  Select,Col} from 'antd';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// import { Tag, Space } from 'antd';

const { Column} = Table;
const  { Search } = Input;
const { Title } = Typography;


function SearchDog() {
 let navigate: NavigateFunction = useNavigate();
 const [press, setPress] = useState("");
 const [dogsData, setDogs] = useState([]);
 const[isSearchOK,setSearch]=useState(false);
 

const onSearch= async (value:any) => {
  console.log("value ",value)
  console.log("press ",`${press}`)
 let urlPath=`${api.uri}/dogs/search`;
 if (press==="dogname"||press==="maintext") 
   urlPath+=`/?fields=${press}&q=${value}`
 else
  if(press==="dogname&fields=maintext"&&value==="")
     urlPath+=`/?fields=${press}`
 
  console.log("urlPath ",urlPath)
 
  console.log("aToken ",localStorage.getItem('aToken'))
  return(await axios.get(`${urlPath}`,{
    method: "GET",
    headers:{"Authorization": `Basic ${localStorage.getItem('aToken')}`}
  })
        .then(data => {
            console.log("dog return  ", JSON.stringify(data));
            console.log("dog data  ", data);
            if (!data.data.length || data.data.length == 0) {
                alert("No data found")
                navigate("/home");
                window.location.reload();
            }
            setDogs(data.data);
            setSearch(true);
            value = "";
        })
        .catch(err => console.log("Error fetching dog", err))
    )
}

const { Option } = Select;

function handleChange(value:any)  {
  message.info("Pls. enter at least three characters to search by email or username otherwise leave the input empty")
  
  setPress(value);
  console.log(`selected ${value}`);
}
   	

  return (
   <>
     <Col span={16} style={{ padding:'10px'}}> 
        <center><Title level={3}>Dog Search</Title></center>          
       <Search placeholder="Search Dogs"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch} />
       <Select defaultValue="all" style={{ width: 380, marginRight:'300px'}} onChange={handleChange}>
        <Option value="dogname">Dog name</Option>
        <Option value="maintext">breed</Option>
        <Option value="dogname&fields=maintext">Get all-filter by dog name & breed</Option>
        <Option value="all">Get all-without filter</Option>
        </Select>	      
  {isSearchOK&&<Table dataSource={dogsData} >
   <Column title="ID" dataIndex="id" key="id" />
   <Column title="Dogname" dataIndex="dogname" key="dogname" />
   <Column title="Breed" dataIndex="maintext" key="maintext" />
   </Table>}
   </Col>  
    <br />
    </>  
  );
  }

export default SearchDog;
