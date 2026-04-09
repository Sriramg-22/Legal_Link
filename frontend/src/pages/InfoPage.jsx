function InfoPage({ title, description, cards }) {
  return (
    <main className="app-shell py-5">
      <div className="container py-4 py-lg-5">
        <section className="page-hero p-4 p-md-5 section-card mb-5">
          <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-3">
            Legal Link
          </span>
          <h1 className="display-5 mb-3">{title}</h1>
          <p className="lead mb-0 col-lg-8">{description}</p>
        </section>

        <section className="row g-4 g-lg-5">
          {cards.map((card) => (
            <div key={card.title} className="col-12 col-md-6 col-xl-4">
              <article className="card border-0 shadow-sm info-card h-100">
                <div className="card-body p-4 p-lg-4">
                  <span className="info-card-tag">{card.tag}</span>
                  <h2 className="h4 mt-3 mb-2">{card.title}</h2>
                  <p className="text-secondary">{card.text}</p>
                </div>
              </article>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

export default InfoPage
