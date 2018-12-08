import Header from '../components/header.js'
import Link from 'next/link'

const expstyle ={
  marginRight:15,
}


export default () => (
  <div>
    <Header/>
    <h2>WELCOME TO OBSERVR 2.0</h2>
   
    <ul>
      <li>
      <Link href="/exp1" style={expstyle}>
        <a>EXPERIMENT 1</a>
      </Link>
      </li>
      <li>
      <Link href="/exp2" style={expstyle}>
        <button>EXPERIMENT 2</button>
      </Link>
      </li>

      </ul>
  </div>
)