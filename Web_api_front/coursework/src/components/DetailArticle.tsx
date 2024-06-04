import 'antd/dist/reset.css';
import React from 'react';
import EditDogForm from './EditDogForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Button,Spin, Col, Card } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { RollbackOutlined,LoadingOutlined,CloseSquareOutlined,CloseSquareFilled,EditOutlined,EditFilled } from '@ant-design/icons';
import { getCurrentUser } from "../services/auth.service";



const DetailArticle = () => {
const currentUser = getCurrentUser();
const { aid } = useParams();
const [dogTable, setArticle] = React.useState({id:0, dogname:'', maintext:'', summary:'',imageurl:'',  locationid:0, staffid:0, description: ''}); 
const navigate= useNavigate();
const [loading, setLoading] = React.useState(true);
const [theme, setTheme] = React.useState('outlined');

React.useEffect(() => {
  console.log(`path: ${api.uri}/dogs/${aid}`)
    axios.get(`${api.uri}/dogs/${aid}`)
      .then((res) => {
      //  console.log('article' ,article)
        setArticle(res.data);
        localStorage.setItem('e',JSON.stringify(res.data))  
        setLoading(false);
      }).then(()=>{
        setLoading(false);
      })  
      .catch((error) => {
        console.log('Error fetching dog details ')
       // console.error('Error fetching article details:', error);
      });
  }, [aid]);
  
  function getIcon (theme:string) {
    let Icon;
  
    if (theme === 'filled') 
        Icon=CloseSquareFilled      
    else 
        Icon=CloseSquareOutlined 
    return Icon;
  }
  
  
  const handleDelete = () => {
  
    setTheme('filled')
// console.log('fav link arr ', fav.links.fav)
// console.log('fav link ', fav)
  axios.delete(`${api.uri}/dogs/${aid}`, {
       
        headers: {
            "Authorization": `Basic ${localStorage.getItem('aToken')}`
          }
        }        
    )
      .then((results) =>{ console.log('respone ',JSON.stringify(results.data.message))
        if(results.data.message==="removed")
      {  
          alert("This dog is removed from the blog list")
          navigate("/");
          window.location.reload();}
        
      })
      .catch((err) => {
      console.log(`Check network problems pls. `);
         alert("Check network problems");
  })      
}

       
if(loading){
const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
return(<Spin indicator={antIcon} />);
}
else {

  const Icon = getIcon(theme)
  return (
    <>
      <h2 style={{ color: 'black' }}> Welcome to Blog Dashboard</h2>   
      
            <Col  span={24} >                                   
             <Card title={dogTable.dogname} style={{width: 300,marginLeft:"100px"}}
                   cover={<img alt="put image here" src={dogTable.imageurl} />} hoverable
                  
                   actions={[
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===dogTable.staffid)&&<EditDogForm  isNew={false} aid={aid}/>,  
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===dogTable.staffid)&& <Icon  style={{ fontSize: '32px', }} onClick={()=>handleDelete()}/>
                  ]} 
                   >               
                  <div> <h3>About me</h3>
                   <p>{dogTable.maintext}</p>
                   <h3>Summary</h3>
                   <p>{dogTable.summary}</p>
                   <h3>Detail Description</h3>
                   <p> {dogTable.description}</p>
                   <p>Location: {dogTable.locationid} of The Canine Shelter</p>
                   <Button  
        type="primary"
        icon={<RollbackOutlined />}
        onClick={() => navigate(-1)} 
      /></div> 
                 
                </Card>
               </Col>
      
    </>
  );

 }
}

export default DetailArticle;