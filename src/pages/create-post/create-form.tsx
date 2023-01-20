import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

export const CreateForm = () => {
    const navigate = useNavigate();
    
    const [user] = useAuthState(auth);
    //Interface para representar el tipo de dato de data
    interface CreateFormData {
        title: string;
        description: string;
    }

    //Esto va primero
    const schema = yup.object().shape({
        title: yup.string().required('Debes agregar un titulo'),
        description: yup.string().required('Debes agregar una descripción')
    })
    //Esto va después
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })


    const postsRef = collection(db, 'posts')

    //Esta es la función para el handleSubmit
    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })

        navigate('/')
    }

    return (
        <form onSubmit = {handleSubmit(onCreatePost)}>
            <input placeholder='Titulo...'  {...register("title")} />
            <p style={{ color: "red" }}> {errors.title?.message} </p>
            <textarea placeholder='Descripción...'  {...register("description")} />
            <p style={{ color: "red" }}> {errors.description?.message} </p>
            <input type='submit' className="submitForm" />
        </form>
    )
}