import Header from '../components/header.js'
import Link from 'next/link'

const expstyle ={
  marginRight:15,
}

const IndexT = () => (
    <div>
      <Header/>
      <h2>OBSERVR 2.0'a HOSGELDINIZ</h2>
      
      <ul>
        <li>
      <Link href="/exp1T" style={expstyle}>
        <a>DENEY 1</a>
      </Link>
      </li>
      <li>
      <Link href="/exp2T" style={expstyle}>
        <button>DENEY 2</button>
      </Link>
      </li>

      </ul>
    </div>
  )
  
  export default IndexT