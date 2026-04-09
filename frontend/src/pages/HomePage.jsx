function HomePage({ onFindLawyer, onGetLegalAdvice, onKnowYourRights }) {
  return (
    <main className="app-shell py-5">
      <div className="container py-4 py-lg-5">
        <section className="home-hero p-4 p-md-5 p-xl-6 section-card">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-4 hero-badge">
                Legal Link
              </span>
              <h1 className="display-2 mb-4 home-title">
                Connecting You to the Right Legal Help, Anytime
              </h1>
              <p className="lead text-white-50 mb-5 home-copy">
                Get matched with trusted lawyers, explore legal support, and take
                the next step with confidence through one simple platform.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 gap-lg-4 flex-wrap hero-actions">
                <button
                  type="button"
                  className="btn btn-light btn-lg rounded-pill px-4 px-lg-5 hero-btn hero-btn-primary"
                  onClick={onFindLawyer}
                >
                  Find a Lawyer
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg rounded-pill px-4 px-lg-5 hero-btn"
                  onClick={onGetLegalAdvice}
                >
                  Get Legal Advice
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg rounded-pill px-4 px-lg-5 hero-btn"
                  onClick={onKnowYourRights}
                >
                  Know Your Rights
                </button>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="hero-info-card p-4 p-md-5">
                <div className="hero-feature">
                  <span className="hero-feature-label">Verified Experts</span>
                  <p>Browse lawyers by specialization, city, language, and rating.</p>
                </div>
                <div className="hero-feature">
                  <span className="hero-feature-label">Simple Booking</span>
                  <p>Pick your lawyer, date, and time in just a few clicks.</p>
                </div>
                <div className="hero-feature">
                  <span className="hero-feature-label">Always Available</span>
                  <p>Start your legal journey whenever you need trusted guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomePage
