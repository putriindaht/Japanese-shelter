import "./components.css"
import { formatDate } from "../helpers/formatDate"
import {MdUpdate} from 'react-icons/md'
import { useEffect } from "react"
import { fetchCategories, fetchPosts, setSelectedCategory } from "../stores/actions/actionCreator"
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import SocialMedia from "../components/SocialMedia"
export default function Navbar(){
    const today = formatDate(new Date())
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categories = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])
    
    const handleClick = (categoryId, categoryName) => {
        navigate('/')
        dispatch(fetchPosts(categoryId, categoryName))
        dispatch(setSelectedCategory(categoryName))
    }

    const handleClickBrand = () => {
        navigate('/')
        dispatch(fetchPosts())
        dispatch(setSelectedCategory(''))
    }

    return (
        <nav className='allNav'>
            <div className='navbar'>
                <div onClick={() => handleClickBrand()} className='brand'>Japanese Shelter</div>
                <div className='container-navlist'>
                    <ul className='navList'>
                        { categories.categories?.map(category => (
                            <li className='navItem' key={category.id}>
                                <button onClick={() => handleClick(category.id, category.name)} className="category-name">{category.name}</button>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
            <div className='navBottom'>
                <div className="date">
                    <span className="icon"><MdUpdate/></span>
                    <span>{today}</span>
                </div>
                <SocialMedia/>
            </div>
        </nav>
    )
}