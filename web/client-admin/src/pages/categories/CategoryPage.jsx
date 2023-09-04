import "./category.css"
import CustomButton from "../../components/Button/CustomButton"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteCategory, fetchCategories } from "../../stores/actions/actionCreator"
import Loading from "../../components/Loading/Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDelete from "../../components/ConfirmDelete/ConfirmDelete"
import { useNavigate } from "react-router-dom"
import ToastWarnWrapper from "../../components/ToastWarnWrapper/ToastWarnWrapper"

function CategoryPage(){
    const [deletedMessage, setDeletedMessage] = useState('')
    const {categories, categoriesLoading} = useSelector((state) => state.category)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function confirmDelete(id) {
        toast(<ConfirmDelete onConfirm={() =>  {dispatch(deleteCategory(id)); setDeletedMessage('Category deleted')}} />, {
            autoClose: false,
            closeOnClick: false,
            draggable: false
        })
    }

    function handleClickEdit(id) {
        navigate("/category/edit-category/" + id)
    }
    
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    if (categoriesLoading) {
        return  <Loading/>

    }

    return ( 
        <>
        <div className="category-list">
            <ToastContainer />
            <ToastWarnWrapper message={deletedMessage} />
            <h3>Category List</h3>
            <CustomButton to="/category/add-category" name="Add"/>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {categories.map((category, i) => {
                    return (
                    <tr key={category.id}>
                        <td className="data-number">{i+1}</td>
                        <td className="data-category">{category.name}</td>
                        <td className="action-delete">
                            <span onClick={() => handleClickEdit(category.id)} className="material-symbols-outlined">edit_note</span>
                            <span onClick={() => confirmDelete(category.id)} className="material-symbols-outlined">delete</span>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
        </>
        
    )
}

export default CategoryPage