import FormPost from "../../components/FormPost/Form-post"
import "./addPost.css"
function AddPost(){
    return (
       <div className="start-section">
            <div className="form-add">
                <h3>Add Post</h3>
                <FormPost/>
            </div>
       </div> 
    )
}

export default AddPost