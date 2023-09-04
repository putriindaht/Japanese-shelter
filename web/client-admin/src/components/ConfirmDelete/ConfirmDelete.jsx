import React from "react"
import "./confirm.css"

function ConfirmDelete({ closeToast, onConfirm }) {
    return (
        <div>
            <p>Are you sure?</p>
            <div className="confirm-container">
                <button className="yes-confirm" onClick={onConfirm}>Yes</button>
                <button className="no-confirm" onClick={closeToast}>No</button>
            </div>
        </div>
    )
}
export default ConfirmDelete