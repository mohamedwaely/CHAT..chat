import { signOut } from 'firebase/auth';
import './style.css'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
function Navbar(){
    const navigate =useNavigate();
    const {currentUser}=useContext(AuthContext);
    return(
        <div className='navbar'>
            <span className='logo'>CHAT..chat</span>
            <div className='user'>
                <img src={currentUser.photoURL} className='uimg' alt=''></img>
                <span>{currentUser.displayName}</span>
                <button className='out' onClick={()=>{signOut(auth); navigate("/login")}}>Logout</button>
            </div>
        </div>
    )
    
}
export default Navbar;

