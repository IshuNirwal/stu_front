import React from 'react'
import MobileNav from '../../components/MobileNav'
import bgSupport from '../../assets/bg-support.jpg'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Link } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SocialIcon from '../../components/SocialIcon';



export default function Support() {
    return (
        <>


            <img className='pt-custom' src={bgSupport} alt='support Pages ' style={{ width: '100%' }} />
            <div className=' container pt-4'>
                <h3 className='fw-semibold pb-2'>Contact Details</h3>
                <div className='contact-item pt-3'>
                    <p className='fs-6 fw-medium'> <CallOutlinedIcon className='ms-text-secondary' /> +91 9355753537</p>
                    <p className='fs-6 fw-medium'>
                        <DraftsOutlinedIcon className='ms-text-secondary' />  &nbsp;
                        <Link mailto='customercare@salarytopup.com' className='text-decoration-none text-black'>customercare@salarytopup.com</Link>
                    </p>
                </div>

                <div className='contact-item'>
                    <p className='fs-6 fw-medium'> <AccessTimeOutlinedIcon className='ms-text-secondary' /> 9:30 AM-11:30 PM</p>
                </div>

                <div className='contact-item'>
                    <p className='fs-6 fw-medium'> <LanguageOutlinedIcon className='ms-text-secondary' /> &nbsp;
                        <Link to='https://salarytopup.com/' className='text-decoration-none text-black'>www.salarytopup.com</Link></p>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '22px' }}>
                    Need help? Our support team is available to assist you at any time. Reach out with your queries-we're always happy to help!
                    <Link to='/privacy-policy' className='text-decoration-none text-info small'> Privacy Policy</Link> and
                    <Link to='/terms-and-conditions' className='text-decoration-none text-info small'> Terms and Conditions</Link>

                </p>
               
                <p style={{ lineHeight: '22px' }}> <ApartmentIcon className='ms-text-secondary' /> B-7, New Multan Nagar, Paschim Vihar, New Delhi - 110056</p>
                <SocialIcon/>
                <h2 className='pt-2'></h2>
                <div className='ms-blank-space'></div>
            </div>


            <MobileNav />
        </>
    )
}
