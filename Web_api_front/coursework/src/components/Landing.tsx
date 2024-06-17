import 'antd/dist/reset.css';
import { Row, Col} from 'antd';
import BriefArticle from './BriefArticle'

const Landing = () => {
  return (
    <>
      <Row gutter={[16,16]} style={{marginLeft:"15px"}}>
        <BriefArticle />
      </Row>
    </>
  )
}

export default Landing;