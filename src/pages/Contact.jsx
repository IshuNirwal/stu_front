import React, { useState } from "react";
import "../css/contact.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [processing, setProcessing] = useState(false);



  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormReady =
    formData.consent &&
    formData.name &&
    formData.email &&
    formData.mobile &&
    formData.subject &&
    formData.message;


  const validate = () => {
    const errs = {};

    // Name: only letters
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errs.name = "Name should only contain letters";
    }

    // Email: basic required
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    }

    // Phone: numeric
    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^\d+$/.test(formData.mobile)) {
      errs.mobile = "Mobile number must be numeric only";
    }

    // Subject: required
    if (!formData.subject) {
      errs.subject = "Please select an inquiry type";
    }

    // Message: not numeric only
    if (!formData.message.trim()) {
      errs.message = "Message is required";
    } else if (/^\d+$/.test(formData.message)) {
      errs.message = "Message cannot be numeric only";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      const sendMail = async () => {
        if (processing) return;
        setProcessing(true);
        try {
          const resp = await fetch("https://salarytopup.in/api/SendCustomerQuery", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ name: formData.name,email:formData.email,mobile:formData.mobile,subject:formData.subject,message:formData.message }),
          });
          if (resp.status === 200) {
            const dataset = await resp.json();
            if (dataset.status === 1) {
              alert("Form Submitted Successfully")
            }
          } else {
            alert("Form Not submitted, please try again later !")
          }
        } catch (error) {
          console.error("Error sending Form:", error);
        } finally {
          setProcessing(false);
        }
      };

      sendMail()
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Salary Top up – We're Here to Help You</title>
        <meta property="og:title" content="Contact Salary Top up – We're Here to Help You" />
        <meta name="description" content="Have questions or need support? Contact Salary Top up via phone, email, or our inquiry form. We're available Mon–Sat, 9 AM–6 PM. Reach us today!" />
        <meta property="og:description" content="Have questions or need support? Contact Salary Top up via phone, email, or our inquiry form. We're available Mon–Sat, 9 AM–6 PM. Reach us today!" />
        <link rel="canonical" href="https://salarytopup.com/contact" />
      </Helmet>

      {/* Page header */}
      <section className="contact-hero">
        <div className="container">
          <span className="contact-hero-badge"><i className="fas fa-headset"></i> We're here to help</span>
          <h1>Get in <span>Touch</span></h1>
          <p>Questions, feedback or need a hand with your loan? Reach out and our team will get back to you fast.</p>
        </div>
      </section>

      <section className="contact-page">
        <div className="container">
          <div className="contact-wrapper fade-in">
            {/* Contact info (unchanged) */}
            <div className="contact-info">
              <div className="section-header">
                <h1>Contact <span className="highlight">Salary TopUp</span></h1>
                <p>Need help? We're here for you.</p>
              </div>
              <div className="contact-details">
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Our Address</h3>
                    <p>Registered Office : B-76, 2nd Floor<br />Wazirpur Industrial Area<br />Delhi 110052</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Customer Support</h3>
                    {/* <p>+91 9355753533<br />+91 8448240723<br />Monday - Saturday, 9 AM to 7 PM</p> */}
                    <p>+91 8448240723<br />Monday - Saturday, 9 AM to 7 PM</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Email Support</h3>
                    <p><a href="mailto:Customercare@salarytopup.com">Customercare@salarytopup.com</a><br/><a href="mailto:grievance@salarytopup.com">grievance@salarytopup.com</a></p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Whatsapp us</h3>
                    <p>
                    {/* <a href="https://wa.me/919899001138">+91-9899001138</a><br/> */}
                    {/* <a href="https://wa.me/918448240723">+91-8448240723</a><br /> */}
                    {/* <a href="https://wa.me/918796041166">+91-8796041166</a> */}
                    {/* <a href="https://wa.me/919355753533">+91-9355753533</a><br/> */}
                    <a href="https://wa.me/918448240723">+91-8448240723</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h3>Get in Touch</h3>
                <div className="social-links">
                  <a href="https://www.facebook.com/profile.php?id=61574094973748" className="social-link"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://x.com/SalaryTopup" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="https://www.instagram.com/salary_topup?igsh=MWF2Zzc5N3B2NDh1" className="social-link"><i className="fab fa-instagram"></i></a>
                  <a href="https://www.linkedin.com/company/salary-topup/" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} id="contact-form" className="contact-form">
                <h2>We're Here</h2>
                <p>We'd love to hear from you — send us a message.</p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span className="required">*</span></label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <small className="error">{errors.name}</small>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <small className="error">{errors.email}</small>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number <span className="required">*</span></label>
                    <input type="number" id="mobile" name="mobile" maxLength={10} placeholder="Enter your Mobile No." value={formData.mobile} onChange={handleChange} required />
                    {errors.mobile && <small className="error">{errors.mobile}</small>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Inquiry Type <span className="required">*</span></label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                      <option value="">Select Inquiry Type</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="loan">Loan Assistance</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {errors.subject && <small className="error">{errors.subject}</small>}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Your Message <span className="required">*</span></label>
                  <textarea name="message" rows="5" placeholder="Type your message here..." value={formData.message} onChange={handleChange} required />
                  {errors.message && <small className="error">{errors.message}</small>}
                </div>

                <div className="form-group full-width checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="agreeInput"
                    />
                    <span className="px-2">
                      I agree to be contacted by <strong>SalaryTopUp</strong> for alerts & promotions*
                    </span>
                  </label>

                  {errors.consent && <small className="error">{errors.consent}</small>}
                </div>


                <div className="form-group full-width">
                  <button
                    type="submit"
                    disabled={!isFormReady}
                    className={`btn ${isFormReady ? "btn-primary-contact" : "btn-disabled-contact"
                      }`}
                  >
                    <i className="fas fa-paper-plane"></i> Send Message
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
