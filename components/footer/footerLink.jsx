import React from 'react'
import Link from 'next/link'
const FooterLink = ({text,icon,link}) => {
  return (
    <a className="footer-link" target='_blank' href={link}>{icon}{text}</a>
  )
}

export default FooterLink