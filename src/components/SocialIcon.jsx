import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';


export default function SocialIcon() {
    return (
        <>
            <div className='ms-social-list'>
                {/* <Link to='https://www.facebook.com/salaryontime/' target='_blank' aria-label="facebook">
                    <FacebookIcon size={50} className='socilthum-mob' style={{ color: '#1877F2' }} />
                </Link>
                <Link to='https://www.youtube.com/@salaryontimeofficial' target='_blank' aria-label="Youtube" ><YouTubeIcon size={50} className='socilthum-mob' style={{ color: '#FF0000' }} /></Link>
                <Link to='https://www.linkedin.com/company/salary-on-time' target='_blank' aria-label="LinkedIn"><LinkedInIcon size={50} className='socilthum-mob' style={{ color: '#0077B5' }} /></Link> */}
                {/* <Link to='https://www.instagram.com/salaryontime/' target='_blank' aria-label="Instagram"><InstagramIcon size={50} className='socilthum-mob' style={{ color: '#405DE6' }} /></Link> */}
            </div>
        </>
    )
}
