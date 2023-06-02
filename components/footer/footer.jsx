import React from 'react'
import FooterLink from './footerLink'
import IconGithub from '../icons/social/github'

const Footer = () => {
  return (
   <footer className='footer'>
    <nav className='footer-nav'>
    <span className='footer-item'><FooterLink text={"Github"} link={"https://github.com/williambroberts/hayyimWord"} icon={<IconGithub/>}/></span>
    </nav>

   </footer>
  )
}

export default Footer