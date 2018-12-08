//import myImgENG from 'assets/eng.png'
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
         <p>HAKAN BUGRA ERENTUG</p>

         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/255px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png" alt="exp" width="24" height="16"></img>
        <Link href="/">
          <a style={linkStyle}> ENG</a>
        </Link>

        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png" alt="exp" width="24" height="16"></img>
        <Link href="/indexT">
          <a style={linkStyle}> TR</a>
        </Link>
    </div>
)

export default Header

