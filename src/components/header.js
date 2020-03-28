import React from 'react'

import Link from '../utils/link'

const Header = () => (
  <header>
    <div className='header__inner'>
      <h1><Link to='/' data-text='Will.Pringle' className='glitch'>Will.Pringle</Link></h1>
      <nav>
        <ul>
          <li><Link to='/projects'>projects</Link></li>
          <li><Link to='/contact'>contact</Link></li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header
