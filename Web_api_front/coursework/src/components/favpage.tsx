import 'antd/dist/reset.css';
import '../App.css';
import FavCard from './FavCard'

function FavPage() {
  return (
    <> 
    <p></p>
    <h2 style={{ color: 'DodgerBlue', fontSize: '40px', fontWeight: 'bold' }}>Favorite Dogs</h2>     
     
      <FavCard style={{ margin: "10px" }} />
    </>
  )
}
export default FavPage;