import AddStoreCity from "./Component/Administration/AddStoreCity";
import AddColor from "./Component/Administration/AddColor";
import AddCategories from "./Component/Administration/AddCategories"
import AddFrameTypes from "./Component/Administration/AddFrameTypes";
import AddShape from "./Component/Administration/AddShapes";
import AddMaterial from "./Component/Administration/AddMaterial";
import AddPrice from "./Component/Administration/AddPrice";
import AddProducts from "./Component/Administration/AddProducts";
import AddFinalProducts from "./Component/Administration/AddFinalProducts";
import DisplayAllColors from "./Component/Administration/DisplayAllColors";
import DisplayAllCategories from "./Component/Administration/DisplayAllCategories";
import { ToastContainer } from 'react-toastify';
import Dashboard from "./Component/Administration/Dashboard";
import AdminLogin from "./Component/Administration/AdminLogin";
import 'react-toastify/dist/ReactToastify.css';
import DisplayAllStores from "./Component/Administration/DisplayAllStores";
import {Route, BrowserRouter as Router} from 'react-router-dom';
import DisplayAllProducts from "./Component/Administration/DisplayAllProducts";
import DisplayAllFinalProducts from "./Component/Administration/DisplayAllFinalProducts";
import ProductPictures from './Component/Administration/ProductPictures'
import Image from "./Component/Administration/Image"
import Header from "./Component/UserInterface/Header";
import AddMainPage from "./Component/Administration/AddMainPage";
import DisplayStatus from "./Component/Administration/DisplayMainPage";
import ProductList from "./Component/UserInterface/ProductList"
import Home from "./Component/UserInterface/Home"
import ProductView from "./Component/UserInterface/ProductView";
import Login from "./Component/UserInterface/Login"
import SignUp from "./Component/UserInterface/SignUp"
import MainCart from "./Component/UserInterface/MainCart"
import AddressCart from "./Component/UserInterface/AddressCart"


  
  function App(props) {
    return (
    <div>
    <Router>
<Route component={AddStoreCity} path="/addstorecity" props={props.history}/>
<Route component={DisplayAllStores} path="/displayallstores" props={props.history}/>
<Route component={AddColor} path="/addcolor" props={props.history}/>
<Route component={AddShape} path="/addshape" props={props.history}/>
<Route component={AddMaterial} path="/addmaterial" props={props.history}/>
<Route component={AddFrameTypes} path="/addframetypes" props={props.history}/>
<Route component={AddPrice} path="/addprice" props={props.history}/>
<Route component={AddCategories} path="/addcategories" props={props.history}/>
<Route component={AddProducts} path="/addproducts" props={props.history}/>
<Route component={DisplayAllColors} path="/displayallcolors" props={props.history}/>
<Route component={DisplayAllCategories} path="/displayallcategories" props={props.history}/>
<Route component={DisplayAllProducts} path="/displayallproducts" props={props.history}/>
<Route component={AddFinalProducts} path="/addfinalproducts" props={props.history}/>
<Route component={DisplayAllFinalProducts} path="/displayallfinalproducts" props={props.history}/>
<Route component={Dashboard} path="/dashboard" props={props.history}/>
<Route component={AdminLogin} path="/adminlogin" props={props.history}/>
<Route component={ProductPictures} path="/productpictures" props={props.history}/>
<Route component={Image} path="/image" props={props.history}/>
<Route component={Header} path="/header" props={props.history}/>
<Route component={ProductList} path="/productlist" props={props.history}/>
<Route component={AddMainPage} path="/addmainpage" props={props.history}/>
<Route component={DisplayStatus} path="/displaystatus" props={props.history}/>
<Route component={Home} path="/home" props={props.history}/>
<Route component={ProductView} path="/productview" props={props.history} />
<Route component={Login} path="/login" props={props.history} />
<Route component={SignUp} path="/signup" props={props.history} />
<Route component={MainCart} path="/maincart" props={props.history} />
<Route component={AddressCart} path="/addresscart" props={props.history} />


    </Router>

    <ToastContainer /></div>
    );
  }
  
  export default App;