import "./formCategory.css"
import { useState} from "react"
import {useDispatch} from "react-redux"
import { addCategories, editCategory } from "../../stores/actions/actionCreator"
import { useNavigate } from "react-router-dom"
import CustomButton from "../Button/CustomButton"
import ToastErrorWrapper from "../ToastErrorWrapper/ToastErrorWrapper"
import ToastSuccessWrapper from "../ToastSuccessWrapper/ToastSuccessWrapper"

function FormCategory({ category }){
  const initialValue = category ? category.name : ''

  const [newCategory, setNewCategory] = useState(initialValue)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAdd = async (e) => {
    setErrorMessage('')
    setSuccessMessage('')
    e.preventDefault()
      let dispatchContainer
      if (category) {
        dispatchContainer = dispatch(editCategory(newCategory, category.id))
      } else {
        dispatchContainer = dispatch(addCategories(newCategory))
      }
      dispatchContainer
      .then(() => {
        if (category) {
          setSuccessMessage("Category updated")
        } else {
          setSuccessMessage("Category added")
        }
        setTimeout(() => {
          navigate('/category')
        }, 1000)
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
    
  }

  const handleChange = async (e) => {
    setNewCategory(e.target.value)
  }
    return (
        <div className="form-add-cat">
            {errorMessage && <ToastErrorWrapper message={errorMessage} />}
            {successMessage && <ToastSuccessWrapper message={successMessage} />}
            <form method="post" className="form-add-cat-container" onSubmit={handleAdd}>
              <div className="form-add-cat">
                <label htmlFor="title">Category Name</label>
                <input type="text" name="name" value={newCategory} onChange={handleChange}/>
              </div>
              <div>
                <CustomButton type="submit" name="Save"/>
              </div>
            </form>
      </div>
    )
}

export default FormCategory