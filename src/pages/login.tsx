import {auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


export const Login = () => {
    const navigate = useNavigate();

    const signInWhitGoogle = async () => {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate('/');
    }
    
    return (
        <div>
            <p> Iniciar Sesión con Google para continuar </p>
            <button onClick={signInWhitGoogle}> Iniciar Sesión con Google </button>
        </div>
    )

}