import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import "../css/footer.css";
import PlayStoreButton from "../components/PlayStoreButton";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column about">
            <div className="footer-logo">
              <a href="index.html">
                <span className="logo-text">Salary TopUp</span>
              </a>
            </div>
            <p className="text-white">
              Your trusted partner for emergency funds. We provide quick, collateral-free loans with transparent terms.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61574094973748" className="social-link"><FaFacebookF /></a>
              <a href="https://x.com/SalaryTopup" className="social-link"><FaTwitter /></a>
              <a href="https://www.instagram.com/salary_topup?igsh=MWF2Zzc5N3B2NDh1" className="social-link"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/salary-topup/" className="social-link"><FaLinkedinIn /></a>
            </div>
            <div style={{ marginTop: 30 }}>
              <PlayStoreButton />
            </div>
          </div>
          <div className="footer-column links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer-column links">
            <h3>Services</h3>
            <ul>
              <li><Link to="/apply-now">Apply Now</Link></li>
              <li><Link to="/repay-loan">Pay Now</Link></li>
              <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              {/* <li><Link to="/rate-and-terms">Rate and Terms</Link></li> */}
              <li><Link to="/terms-and-conditions">Rate and Terms</Link></li>
            </ul>
          </div>
          <div className="footer-column contact">
            <h3>Contact Us</h3>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <FaMapMarkerAlt className="text-primary fs-4 me-3 mt-1" />
                <span>
                  <strong>Registered Office:</strong><br />
                  B-76, 2nd Floor, Wazirpur Industrial Area, Delhi – 110052
                </span>
              </li>

              <li className="d-flex align-items-center mb-3">
                <FaPhoneAlt className="text-primary fs-5 me-3" />
                <span className="d-flex flex-column">
                  <strong>Call and Whatsapp:</strong><br />
                  {/* <a href="tel:+919355753533" className="text-decoration-none text-white">
                    +91 9355753533
                  </a> */}
                  <a href="tel:+918448240723" className="text-decoration-none text-white">
                    +91 8448240723
                  </a>
                </span>
              </li>
              
              {/* <li className="d-flex align-items-center mb-3">
                <FaWhatsapp className="text-primary fs-5 me-3" />
                <span className="d-flex flex-column"> */}
                  {/* <a href="tel:+918448240723" className="text-decoration-none text-white">
                  +91 8448240723
                </a> */}
                  {/* <a href="tel:+918796041166" className="text-decoration-none text-white">
                    +91 8796041166
                </a> */}
                  {/* <a href="tel:+919355753533" className="text-decoration-none text-white">
                    +91 9355753533
                  </a>
                  <a href="tel:+918448240723" className="text-decoration-none text-white">
                    +91 8448240723
                  </a>
                </span>
              </li> */}



              <li className="d-flex align-items-center">
                <FaEnvelope className="text-primary fs-5 me-3" />
                <a
                  href="mailto:customercare@salarytopup.com"
                  className="text-decoration-none text-white"
                >
                  customercare@salarytopup.com
                </a>
              </li>
            </ul>

          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © RBI Registered NBFC Baid Stock Broking Services Private Limited <span className="reg-number">(Reg. No. B-14.02553)</span></p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
