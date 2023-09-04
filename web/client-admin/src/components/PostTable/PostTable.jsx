import { useNavigate } from "react-router-dom"
import "./postTable.css"
import { useDispatch } from "react-redux"
import { deletePost } from "../../stores/actions/actionCreator"
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete"
import { ToastContainer, toast } from "react-toastify"

function PostTable({ posts }){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClickEdit = (slug) => {
    navigate(`/edit-post/${slug}`)
  }

  function confirmDelete(id) {
    toast(<ConfirmDelete onConfirm={() => {dispatch(deletePost(id))}} />, {
        autoClose: false,
        closeOnClick: false,
        draggable: false
    })
  }

  return (
    <>
      <ToastContainer />
      <table className="post-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Image</th>
            <th>Content</th>
            <th>Category</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => {
            return <tr key={post.id}>
              <td>{i+1}</td>
            <td>{post.title}</td>
            <td><img src={post.imgUrl} width="100px" height="100px"/></td>
            <td>{post.content}</td>
            <td>{post.Category.name}</td>
            <td>{post.User.username}</td>
            <td >
              <div className="action-post">
                <span onClick={() => handleClickEdit(post.slug)} className="material-symbols-outlined">edit_note</span>
                <span onClick={() => confirmDelete(post.id)} className="material-symbols-outlined">delete</span>
              </div>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </>
  )
}

export default PostTable