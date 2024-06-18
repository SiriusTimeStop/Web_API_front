//import React from 'react';

import 'antd/dist/reset.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { api } from './common/http-common';
import axios from 'axios';




const Staff = () => {
  const [staffs, setStaff] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get(`${api.uri}/staff`)
      .then((res) => {
        setStaff(res.data);
        localStorage.setItem('a', JSON.stringify(res.data))
      })
      .then(() => {
        setLoading(false);
      })

  }, []);



  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (<Spin indicator={antIcon} />);
  } else {
    if (!staffs) {
      return (<div>There is no article available now.</div>)
    } else {


      {return (<>
        <Row gutter={[16, 16]} style={{ margin: "15px" }}>
          {staffs.map(({ username, role }) => {
            if (role === "admin") {
              return (
                
                  <Card
                    title={role}
                    hoverable
                    style={{ width: 300, margin: "15px" }}
                  >
                    <img
                        style={{ width: "100%" }}
                        src="/src/assets/staff.png"
                        alt="shelter-img"
                        className="profile-img-card"
                      />
                      <hr/>
                    <p style={{ fontSize: "30px", fontWeight: "bold" }}>{username}</p>
                  </Card>
                
              );
            }
            return null; // Skip rendering if role is not admin
          })}
        </Row></>
      )}
    }
  }
}


export default Staff;