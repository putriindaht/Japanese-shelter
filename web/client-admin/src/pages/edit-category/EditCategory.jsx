import { useDispatch, useSelector } from "react-redux"
import FormCategory from "../../components/FormCategory/FormCategory"
import { fetchCategoryDetail } from "../../stores/actions/actionCreator"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import Loading from "../../components/Loading/Loading"
function EditCategory(){
    const { id } = useParams()
    const {categoryDetail, categoriesLoading} = useSelector((state) => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoryDetail(id))
    },[])
    
    
    if (categoriesLoading) {
        return <Loading />
    }

    return (
       <div className="start-section">
            <h3>Edit Category</h3>
            <FormCategory category={categoryDetail} />
       </div> 
    )
}

export default EditCategory