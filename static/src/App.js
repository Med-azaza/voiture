import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import VoitureDetails from './VoitureDetails';
import NavBar from './Header/NavBar'
import Login from './User/Login'
import Register from './User/Register'
import UserList  from './User/UserList'
import UserEdit from './User/UserEdit'
import Api from './Api'
function App() {
  return (
    <Router>
      <NavBar/>
      <Route path='/' component={Home} exact></Route>
      <Route path='/voiture/:id' component={VoitureDetails} />
      <Route path='/login' component={Login} />
           <Route path='/admin/userlist' component={UserList}/>
           <Route path='/admin/user/:id/edit' component={UserEdit} />
           <Route path='/register' component={Register} />

           <Api/>  

           <div className="copyright">
            <p className="p_copyright">Copyright © voiture. All right reserved| application devaloped by Mabrouka khalfa</p>
        </div>  
        </Router>
  );
}

export default App;
