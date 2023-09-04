import '../index.css'
import { MdUpdate } from 'react-icons/md'
import { GoPerson } from 'react-icons/go'
import { formatDate } from '../helpers/formatDate'
import { useNavigate } from "react-router-dom";
export default function Cards({post}){
    const navigate = useNavigate()
    const handleClickTitle = (slug) => {
        navigate(`/post/${slug}`)
    }
    return (
        <>
            <div className="card-post">
                <img className='img-card-post' src={post.imgUrl}/>
                <span className='category-btn'>{post.Category.name}</span>
                <span onClick={() => handleClickTitle(post.slug)} className='title'>{post.title}</span>
                <div className="data-info">
                    <div className="author">
                        <span><GoPerson/></span>
                        <span>{post.User.username}</span>
                    </div>
                    <div className="date-content">
                        <span className="icon"><MdUpdate/></span>
                        <span>{formatDate(new Date(post.createdAt))}</span>
                    </div>
                </div>
            </div>
        </>
    )
}