function Footer() {
  return (
    <footer className="app-footer mt-auto">
      <div className="container py-5">
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-5">
            <h3 className="h4 mb-3 text-white">Legal Link</h3>
            <p className="footer-copy mb-0">
              Connecting people to dependable legal support with clarity, speed,
              and confidence.
            </p>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="footer-title">Explore</h4>
            <p className="footer-link">Home</p>
            <p className="footer-link">Services</p>
            <p className="footer-link">Lawyers</p>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="footer-title">Support</h4>
            <p className="footer-link">Resources</p>
            <p className="footer-link">Contact</p>
            <p className="footer-link">Login</p>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="footer-title">Contact</h4>
            <p className="footer-copy">help@legallink.in</p>
            <p className="footer-copy">+91 98765 43210</p>
            <p className="footer-copy mb-0">Available across India</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
