import '../index.css'
import SocialMedia from '../components/SocialMedia'

export default function Footer(){
    return (
        <div className='footer'>
                <div className='container-footer'>
                    <div className='description'>
                        <h3>Japanese Shelter</h3>
                        <div>
                            <span>About</span>
                            <p>Japanese Shelter merupakan Portal Berita Jepang di Indonesia – Sumber Utama Kultur, Budaya, dan Info Terkini! Kami adalah platform berita yang berkomitmen untuk menyajikan informasi terbaru dan mendalam seputar segala hal yang berkaitan dengan Jepang, khususnya dalam hal kultur, budaya, dan perkembangan terkini di negeri matahari terbit!</p>
                        </div>
                        <SocialMedia/>
                    </div>
                    <div className='contact'>
                        <h3>Contact</h3>
                        <div>
                            <span>Address</span>
                            <p>Jl. Panjang Menuju Langit Biru No 412, <br />
                            Kota Japankarta, 112233
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    )
}