import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { Post } from './post';

export interface Post {
    id: string;
    userID: string;
    title: string;
    description: string;
    username: string;
}

export const Main = () => {
    const [postList, setPostList] = useState<Post[] | null>(null)
    const postsRef = collection(db, 'posts')
    const getPost = async () => {
        const data = await getDocs(postsRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[])
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <div>
            {postList?.map((post, i) => (
                <Post post={post} key={i} />
            ))}
        </div>
    )
}