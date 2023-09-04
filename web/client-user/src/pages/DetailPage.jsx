import '../index.css'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailPost } from '../stores/actions/actionCreator';
import Loading from '../components/Loading';
export default function DetailPage(){
    const { slug } = useParams()
    const {detailPost, postsLoading} = useSelector(state => state.post)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchDetailPost(slug))
    }, [])

    if (postsLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className="content-container">
                <span className='category-btn'>{detailPost?.Category?.name}</span>
                <h2>{detailPost?.title}</h2>
                <img className='img-detail' src={detailPost.imgUrl}/>
                <p>
                    {detailPost.content}
                </p>
                <span>Tags: </span>
                {detailPost.Tags?.map(tag => (
                    <span className='tag-name' key={tag.id}>{tag.name}</span>  
                ))}
            </div>
        </div>
    )
}