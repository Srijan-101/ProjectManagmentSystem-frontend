
import {isAuth } from '../helper/helper';
import NavBar from '../components/nav'
import Hometask from './Hometask';
import Homeproject from './Homeproject';




const Home = ({history}) =>{
  

    return (
    <>
         <NavBar/>
        <div class="container m-4">
        <div class="columns">
          <div class="column is-full">
              <Hometask/>
            <Homeproject/>
          </div>
        </div>
      </div>
    </>
    )
}

export default Home;