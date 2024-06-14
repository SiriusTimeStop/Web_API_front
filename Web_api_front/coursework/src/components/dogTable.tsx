import 'antd/dist/reset.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import {LoadingOutlined} from '@ant-design/icons';
import PostIcon from './posticon';
import Displaycomment from './comments';
import SearchDog from './dogSearch';



const dogTable = () => {
  const [dogTable, setDogTable] = React.useState(null);  
  const [loading, setLoading] = React.useState(true);    
  React.useEffect(()=>{
    axios.get(`${api.uri}/dogs`)
      .then((res)=>{
        setDogTable(res.data);   
        localStorage.setItem('a',JSON.stringify(res.data))                        
      })
      .then(()=>{
        setLoading(false);
      })  
            
  }, []);
   
  
 
  if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return(<Spin indicator={antIcon} />);
  } else {
    if(!dogTable){
      return(<div>There is no dog blog available now.</div>)
    } else {
       
    
      return(<>
      <Col span={12}>
      { <SearchDog/>}
      </Col>
        <Row gutter={[16,16]} style={{marginLeft:"15px"}}>
          {
            dogTable && dogTable.map(({id, dogname, maintext, imageurl, links})=> (
            <Col key={id}>                                          
             <Card title={dogname} style={{width: 300}}
                   cover={<img alt="example" src={imageurl} style={{height:"250px",width:"300px"}}/>} hoverable
                   actions={[
                    <PostIcon type="like" countLink={links.likes} id={id} />,
                    <Displaycomment    msgLink={links.msg} id={id}/>,
                    <PostIcon type="heart" FavLink={links.fav} id={id}/>
                  
                  ]} 
                   > 

                   <p>{maintext}</p>

                  <Link to= {`/${id}`}>Details</Link>
                 
                </Card>
                
              </Col>
            ))

          }
        </Row></>
      )
    }
  }
}


export default dogTable;