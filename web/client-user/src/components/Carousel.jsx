import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./components.css"
import Slider from "react-slick";
import {MdUpdate} from 'react-icons/md'
import { GoPerson } from 'react-icons/go'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { fetchPosts } from "../stores/actions/actionCreator";
import { formatDate } from "../helpers/formatDate";
export default function Carousel(){
    const posts = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <div className="container-carousel">
            <Slider cssEase="linear" autoplay speed={500} infinite slidesToShow={1} slidesToScroll={1} className="slider">
                {posts.posts?.map(post => (
                    <div key={post.id}>
                        <div className="slider-content">
                            <img className='img-content' src={post.imgUrl}/>
                            <div className="data-content">
                                <div>
                                    <span className="category-btn">{post.Category.name}</span>
                                </div>
                                <div>
                                    <h2>{post.title}</h2>
                                </div>
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
                        </div>
                    </div>
                    ))
                }
            </Slider>
      </div>
    )
}