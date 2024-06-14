//import React from 'react';

import 'antd/dist/reset.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { api } from './common/http-common';
import axios from 'axios';




const Location = () => {
  const [locations, setLocations] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get(`${api.uri}/locations`)
      .then((res) => {
        setLocations(res.data);
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
    if (!locations) {
      return (<div>There is no article available now.</div>)
    } else {


      return (<>
        <h2 style={{ color: 'DodgerBlue', fontSize: '40px', fontWeight: 'bold' }}><strong>About our Pet shelter locations</strong></h2>
        <img style={{ width: "900px" }}
          src="/src/assets/shelters.jpeg"
          alt="shelter-img"
          className="profile-img-card"
        />
        <Row gutter={[16, 16]} style={{ margin: "15px" }}>
          {
            locations && locations.map(({ id, locationsdistrict }) => (
              <Col key={id}>
                <Card
                  title={id}
                  hoverable
                  style={{ width: 300, margin: "15px" }}
                >
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>{locationsdistrict}</p>
                </Card>

              </Col>
            ))
          }
        </Row></>
      )
    }
  }
}


export default Location;