import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import Iconify from '../components/iconify';
// external css
import '../_css/ContactPage.css';
// services
import { sendEmailService } from '../Services/ApiServices';

export default function AccountPopover() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const initialSchema = {
    userName: '',
    fromAddress: '',
    emailSubject: '',
    emailBody: '',
  };
  const [schema, setSchema] = useState(initialSchema);

  const onValueChange = (e) => {
    setSchema({ ...schema, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    const { fromAddress, emailSubject } = schema;
    const newErrors = {};

    if (!validateEmail(fromAddress)) {
      newErrors.email = !fromAddress ? 'Email is required' : 'Invalid email address';
    }

    if (!emailSubject) {
      newErrors.emailSubject = 'Subject is required';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await sendEmailService(schema);

        const alertMessage = response.status === 200 ? response.data.message : 'Service failed! Try again later';
        alert(alertMessage);

        navigate('/dashboard/app', { replace: true });
      } catch (err) {
        alert('Signup failed! Try again later');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div
      className="contact2"
      style={{
        // backgroundImage: 'url(https://media.istockphoto.com/id/1154857334/vector/stock-foreign-exchange-or-forex-illustration-with-the-world-map-infographics-and-numbers.jpg?s=612x612&w=0&k=20&c=4WefRMLiB989g3tN_D-bLqpMVpq45kDcI_Hgkkn7lS8=)',
        // backgroundImage: 'url(https://media.istockphoto.com/id/1214448534/photo/stock-market-and-financial-figures-european-economy-global-business.jpg?s=170667a&w=0&k=20&c=szwgZSFwm1c4wN_MG3VmFB7m2-ATIhrO9G7tTkO28FM=)',
        // backgroundImage: 'url(https://www.rba.gov.au/publications/bulletin/2022/jun/images/bulletin-2022-06--06.jpg)',
        // backgroundImage: 'url(https://d1sr9z1pdl3mb7.cloudfront.net/wp-content/uploads/2022/09/15175306/data-privacy-2-1024x424.jpg)',
        backgroundImage:
          'url(https://www.imf.org/-/media/Images/IMF/Publications/WEO/weo-hero-map.ashx?h=280&w=1099&la=en)',
        backgroundRepeat: 'no-repeat',
      }}
      id="contact"
    >
      <div className="container">
        <div className="row contact-container">
          <div className="col-lg-12">
            <div className="card card-shadow border-0 mb-4">
              <div className="row">
                <div className="col-lg-8">
                  <div className="contact-box p-4">
                    <h4 className="title">Get in Touch</h4>
                    <form>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              name="userName"
                              className="form-control"
                              type="text"
                              placeholder="name"
                              onChange={(e) => onValueChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              required
                              name="fromAddress"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              type="text"
                              placeholder="email"
                              onChange={(e) => onValueChange(e)}
                            />
                            {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mt-3">
                            <input
                              required
                              name="emailSubject"
                              className={`form-control ${errors.emailSubject ? 'is-invalid' : ''}`}
                              type="text"
                              placeholder="subject"
                              onChange={(e) => onValueChange(e)}
                            />
                            {errors.emailSubject ? <div className="invalid-feedback">{errors.emailSubject}</div> : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group mt-3">
                            <textarea
                              name="emailBody"
                              className="form-control"
                              type="text"
                              placeholder="message"
                              onChange={(e) => onValueChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            type="button"
                            className="btn btn-danger-gradiant mt-3 mb-3 text-white border-0 py-2 px-3"
                            onClick={sendEmail}
                          >
                            <span>
                              {' '}
                              SUBMIT NOW <i className="ti-arrow-right" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="col-lg-4 bg-image"
                  style={{
                    // backgroundImage: 'url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/1.jpg)',
                    // backgroundImage: 'url(https://www.idfreshfood.com/wp-content/uploads/2017/09/contact_us_2.jpg)',
                    backgroundColor: 'currentColor',
                  }}
                >
                  <div className="detail-box p-4">
                    <h5 className="text-white font-weight-light mb-3">Name</h5>
                    <p className="text-white op-7">Mamun Chowdhury</p>
                    <h5 className="text-white font-weight-light mb-3">ADDRESS</h5>
                    <p className="text-white op-7">Amin Bazar, Dhaka</p>
                    <h5 className="text-white font-weight-light mb-3">Email</h5>
                    <p className="text-white op-7">mamun@gmail.com</p>
                    <h5 className="text-white font-weight-light mb-3 mt-4">Phone</h5>
                    <p className="text-white op-7">251 546 9442</p>
                    <div className="round-social light">
                      <a
                        href="https://n-hassan01.github.io/PortfolioWebsite/"
                        className="text-decoration-none text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Iconify icon={'mdi:facebook'} className="icon" id="socialmedia" />
                      </a>
                      <a
                        href="https://n-hassan01.github.io/PortfolioWebsite/"
                        className="text-decoration-none text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Iconify icon={'mdi:twitter'} className="icon" id="socialmedia" />
                      </a>
                      <a
                        href="https://n-hassan01.github.io/PortfolioWebsite/"
                        className="text-decoration-none text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Iconify icon={'mdi:linkedin'} className="icon" id="socialmedia" />
                      </a>
                      <a
                        href="https://n-hassan01.github.io/PortfolioWebsite/"
                        className="text-decoration-none text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Iconify icon={'mdi:instagram'} className="icon" id="socialmedia" />
                      </a>
                      <a
                        href="https://n-hassan01.github.io/PortfolioWebsite/"
                        className="text-decoration-none text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Iconify icon={'mdi:youtube'} className="icon" id="socialmedia" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
