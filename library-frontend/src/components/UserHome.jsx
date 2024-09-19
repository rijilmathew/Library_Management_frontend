import { useNavigate } from "react-router-dom";
import { logout } from "../reduxtoolkit/UserSlice"
import { useDispatch } from "react-redux"


const UserHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlelogout=()=>{
         dispatch(logout())
         navigate('/')
    }
  return (
    <>
    <div>UserHome</div>
    <button onClick={handlelogout}>logout</button>
    </>

  )
}

export default UserHome