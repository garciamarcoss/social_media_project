import { Link } from 'react-router-dom';
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const signUserOut = async () => {
        await signOut(auth);
    }
    return (
        <div className='navbar'>
            <div className='links'>
                <Link to='/'> Home </Link>
                {!user ? (<Link to='/login'> Login </Link>) : (<Link to='/createpost'> Crear Post </Link>)}  
            </div>


            <div className='user'>
                {user && (
                    <div>
                        <p> {user?.displayName} </p>
                        <img src={user?.photoURL || ''} alt="Imagen de perfil" width='20' height='20' />
                        <button onClick={signUserOut}> LogOut </button>
                    </div>
                )}
            </div>
        </div>
    )
}