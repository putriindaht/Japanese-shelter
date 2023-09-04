import PostTable from "../../components/PostTable/PostTable"
import "./home.css"
import CustomButton from "../../components/Button/CustomButton"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "../../stores/actions/actionCreator"
import Loading from "../../components/Loading/Loading"

function HomePage(){
    const {posts, postsLoading} = useSelector((state) => state.post)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchPosts())
    },[])

    if(postsLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="post-list">
                    <h3>Post List</h3>
                    <CustomButton to="/add-post" name="Add"/>
                    <PostTable posts={posts} />
            </div> 
        </>

    )
}

export default HomePage