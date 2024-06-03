import { Card, Row, Col, Flex} from "antd";
import articles from './articles.json'
import { Link } from 'react-router-dom';

const Articles = ()=> {
    return(
        <>
            <Flex justify="space-evenly" wrap="wrap" gap="middle"><Row>
                {
                  articles && articles.map(({id, title, alltext, imageurl})=> (
                    <Col span={8} key={id}>
                      <Card title={title} style={{width: 300}}
                         cover={<img alt="example" src={imageurl} />} hoverable>
                        <p>{alltext}</p>
                        <p></p>
                        <Link to= {`/${id}`}>Details</Link>
                      </Card>
                    </Col>
                  ))
                }
              </Row> 
            </Flex>
        </>
    )
}

export default Articles;