import '../index.css'
import {GrFacebook} from 'react-icons/gr'
import {PiInstagramLogoFill} from 'react-icons/pi'
import {GrTwitter} from 'react-icons/gr'
import {GrYoutube} from 'react-icons/gr'

export default function socialMedia(){
    return (
        <div className="social-media">
            <span className="text-follow">Follow us</span>
            <span className="socmed-icon"><GrFacebook></GrFacebook></span>
            <span className="socmed-icon"><PiInstagramLogoFill></PiInstagramLogoFill></span>
            <span className="socmed-icon"><GrTwitter></GrTwitter></span>
            <span className="socmed-icon"><GrYoutube></GrYoutube></span>
        </div>
    )
}