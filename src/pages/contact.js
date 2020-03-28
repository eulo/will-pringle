import React from 'react'

import SEO from '../components/seo'

const ContactPage = () => (
  <>
    <SEO title='Contact' />
    <div className='contact'>
      <h2>Contact</h2>
      <p>
        Github: <a href="//github.com/codedrips">CodeDrips</a>
      </p>
      <p>
        Email: <a href="mailto:hello@codedrips.com">hello@codedrips.com</a>
      </p>
    </div>
  </>
)

export default ContactPage
