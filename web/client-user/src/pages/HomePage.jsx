import '../index.css'
import Carousel from "../components/Carousel";
import Cards from '../components/Cards';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { fetchPosts } from '../stores/actions/actionCreator';
import Loading from '../components/Loading';

export default function HomePage(){
    const dispatch = useDispatch()
    const { posts, postsLoading } = useSelector(state => state.post)
    const { selectedCategory } = useSelector(state => state.category)
    useEffect(() => {
        dispatch(fetchPosts())
    },[])

    return (
        <div>
            <div className="place-carousel">
                <Carousel/>
            </div>
            {postsLoading && <Loading />}
            <div className='main'>
                <div className='contents'>
                    <h2 className='head-content'>{ selectedCategory || "Berita Jepang hari ini"}</h2>
                    <div className='container-card'>
                        {posts.map(post => (
                            <Cards key={post.id} post={post}/>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}