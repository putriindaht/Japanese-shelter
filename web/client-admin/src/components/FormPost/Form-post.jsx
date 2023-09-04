import "./formAddPost.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addPost, editPost, fetchCategories } from "../../stores/actions/actionCreator"
import CustomButton from "../Button/CustomButton"
import {AiTwotoneDelete} from "react-icons/ai"
import ToastErrorWrapper from "../ToastErrorWrapper/ToastErrorWrapper"
import ToastSuccessWrapper from "../ToastSuccessWrapper/ToastSuccessWrapper"

function FormPost({ post }){
  const initialValue = post ? post : {
    title: '',
    imgUrl: '',
    content: '',
    categoryId: 0,
    Tags: [{name:''}, {name: ''}, {name: ''}]
  }
  const [successMessage, setSuccessMessage] = useState('')
  const {categories} = useSelector(state => state.category)
  const [errorMessage, setErrorMessage] = useState('')
  const [newPost, setNewPost] = useState(initialValue)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddPost = async (e) => {
    setErrorMessage('')
    setSuccessMessage('')
    e.preventDefault()
    let dispatchContainer
    if (post) {
      dispatchContainer = dispatch(editPost(newPost, newPost.id))
    } else {
      dispatchContainer = dispatch(addPost(newPost))
    }
    dispatchContainer
    .then(() => {
      if (post) {
        setSuccessMessage("Post updated")
      } else {
        setSuccessMessage("Post added")
      }
      setTimeout(() => {
        navigate('/')
      }, 1000)
    })
    .catch(err => {
      setErrorMessage(err)
    })
    
  }

  const handleChange = async (e) => {
    console.log(e.target.name, e.target.value)
    const {name, value} = e?.target
    if (name === 'Tags') {
      setNewPost({
        ...newPost,
        Tags: [{name: value}]
      })
    } else {
      setNewPost({
        ...newPost,
        [name]: value
      })
    }
  }

  const handleAddTag = () => {
    const newField = {name: ''}
    setNewPost({...newPost, Tags: [...newPost.Tags, newField]})
  }

  const handleDeleteButton = (index) => {
    const dataTag = [...newPost.Tags]

    dataTag.splice(index, 1)
    setNewPost({...newPost, Tags: dataTag})
  }

  const handleTagChange = (index, event) => {
    const dataTag = [...newPost.Tags]
    dataTag[index][event.target.name] = event.target.value
    setNewPost({...newPost, Tags: dataTag})
  }
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
    return (
        <div className="form-add-post">
          {successMessage && <ToastSuccessWrapper message={successMessage}/>}
          {errorMessage && <ToastErrorWrapper message={errorMessage}/>}
            <form method="post" className="form-add-container" onSubmit={handleAddPost}>
              <div className="form-add">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={newPost.title} onChange={handleChange}/>
              </div>
              <div className="form-add">
                <label htmlFor="imgUrl">Image Url</label>
                <input type="text" name="imgUrl" value={newPost.imgUrl} onChange={handleChange}/>
              </div>
              <div className="form-add">
                <label htmlFor="content">Content</label>
                <textarea name="content" id="content" cols="30" rows="10" value={newPost.content} onChange={handleChange}></textarea>
              </div>
              <div className="form-add">
                <label htmlFor="categoryId">Category</label>
                <select name="categoryId" id="categoryId" onChange={handleChange} value={newPost.categoryId}>
                  <option>select</option>
                  {categories && categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    )
                  })}
                </select>
              </div >
              <div className="form-add">
                  <label htmlFor="Tags">Tags</label>
                  {newPost.Tags && 
                    newPost.Tags.map((tag,index) => {
                      return (
                        <div key={index} className="tags-container">
                          <input type="text" name="name" value={tag?.name} onChange= {() =>  handleTagChange(index, event)}/>
                          <span className="delete-button" onClick={() =>  handleDeleteButton(index)}><AiTwotoneDelete/></span>
                        </div>
                      )
                    })
                  }
              </div>
                  <button className="add-tag-btn" type="button" onClick={handleAddTag}>Add tags</button>
              <CustomButton name="Save" type="submit"/>
            </form>
      </div>
    )
}

export default FormPost