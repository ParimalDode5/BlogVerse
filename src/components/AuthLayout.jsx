import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Protected({children, authentication=true}) {

    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {
        if(authentication && authStatus !== authentication) {
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication) {
            navigate("/");
        }
    },[authStatus, navigate, authentication])

    return authStatus === authentication ? <>{children}</> : null;
}

export default Protected;
