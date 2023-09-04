import { useParams } from "react-router-dom"
import FormPost from "../../components/FormPost/Form-post"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchDetailPost } from "../../stores/actions/actionCreator"
import Loading from "../../components/Loading/Loading"
export default function EditPostPage() {
    const {slug} = useParams()
    const {post, postsLoading} = useSelector((state) => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDetailPost(slug))

    },[])
    if (postsLoading) {
        return <Loading/>
    }
    return (
        <div className="start-section">
             <div className="form-edit">
                 <h3>Edit Post</h3>
                 <FormPost post={post} />
             </div>
        </div> 
     )
} 
