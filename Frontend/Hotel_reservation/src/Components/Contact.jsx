import React from 'react'

const Contact = () => {
  return (
    <div>
        <div>
  {/* loader  */}
  <div className="loader_bg">
    <div className="loader"><img src="images/loading.gif" alt="#" /></div>
  </div>
  {/* end loader */}
  {/* header */}
  {/* <header>
 
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
            <div className="full">
              <div className="center-desk">
                <div className="logo">
                  <a href="index.html"><img src="images/logo.png" alt="#" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
            <nav className="navigation navbar navbar-expand-md navbar-dark ">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarsExample04">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <a className="nav-link" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                  </li>
              
                  <li className="nav-item">
                    <a className="nav-link" href="/gallery">Gallery</a>
                  </li>
                 
                  <li className="nav-item active">
                    <a className="nav-link" href="/contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header> */}
  {/* end header inner */}
  {/* end header */}
  <div className="back_re">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title">
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*  contact */}
  <div className="contact">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form id="request" className="main_form">
            <div className="row">
              <div className="col-md-12 ">
                <input className="contactus" placeholder="Name" type="type" name="Name" /> 
              </div>
              <div className="col-md-12">
                <input className="contactus" placeholder="Email" type="type" name="Email" /> 
              </div>
              <div className="col-md-12">
                <input className="contactus" placeholder="Phone Number" type="type" name="Phone Number" />                          
              </div>
              <div className="col-md-12">
                <textarea className="textarea" placeholder="Message" type="type" message="Name" defaultValue={"Message"} />
              </div>
              <div className="col-md-12">
                <button className="send_btn">Send</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <div className="map_main">
            <div className="map-responsive">
              <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France" width={600} height={400} frameBorder={0} style={{border: 0, width: '100%'}} allowFullScreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* end contact */}
  {/*  footer */}
  <footer>
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className=" col-md-4">
            <h3>Contact US</h3>
            <ul className="conta">
              <li><i className="fa fa-map-marker" aria-hidden="true" /> Address</li>
              <li><i className="fa fa-mobile" aria-hidden="true" /> +01 1234569540</li>
              <li> <i className="fa fa-envelope" aria-hidden="true" /><a href="#"> demo@gmail.com</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Menu Link</h3>
            <ul className="link_menu">
              <li><a href="/">Home</a></li>
              <li><a href="/about"> about</a></li>
      
              <li><a href="/gallery">Gallery</a></li>
             
              <li className="active"><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>News letter</h3>
            <form className="bottom_form">
              <input className="enter" placeholder="Enter your email" type="text" name="Enter your email" />
              <button className="sub_btn">subscribe</button>
            </form>
            <ul className="social_icon">
              <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-youtube-play" aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <p>
                © 2019 All Rights Reserved. Design by <a href="https://html.design/"> Free Html Templates</a>
                <br /><br />
                Distributed by <a href="https://themewagon.com/" target="_blank">ThemeWagon</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

    </div>
  )
}

export default Contact