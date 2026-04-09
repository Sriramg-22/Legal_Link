import { useEffect, useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;
function ResourcesPage({ onOpenArticle }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API}/api/articles`)
        setArticles(response.data)
      } catch (err) {
        setError('Unable to load articles right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <main className="app-shell py-5">
      <div className="container py-4 py-lg-5">
        <section className="page-hero p-4 p-md-5 section-card mb-5">
          <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-3">
            Legal Knowledge Hub
          </span>
          <h1 className="display-5 mb-3">Resources for smarter legal decisions</h1>
          <p className="lead mb-0 col-lg-8">
            Explore practical legal articles across rights awareness, property law,
            and employment law in a simple readable format.
          </p>
        </section>

        {loading ? (
          <div className="card status-card border-0 shadow-sm">
            <div className="card-body py-5 text-center">
              <div className="spinner-border text-primary mb-3" role="status" />
              <p className="text-secondary">Loading articles...</p>
            </div>
          </div>
        ) : null}

        {!loading && error ? (
          <div className="alert alert-danger shadow-sm" role="alert">
            {error}
          </div>
        ) : null}

        {!loading && !error && articles.length === 0 ? (
          <div className="card empty-state border-0 shadow-sm">
            <div className="card-body py-5 text-center">
              <h3 className="mb-2">No articles found</h3>
              <p className="text-secondary mb-0">
                Articles will appear here once they are available.
              </p>
            </div>
          </div>
        ) : null}

        {!loading && !error && articles.length > 0 ? (
          <section className="row g-4 g-lg-5">
            {articles.map((article) => (
              <div key={article._id} className="col-12 col-md-6 col-xl-4">
                <article className="card border-0 shadow-sm article-card h-100">
                  <div className="card-body p-4 p-lg-4 d-flex flex-column">
                    <span className="info-card-tag">{article.category}</span>
                    <h2 className="h4 mt-3 mb-3">{article.title}</h2>
                    <p className="text-secondary mb-4">
                      {article.content.slice(0, 100)}
                      {article.content.length > 100 ? '...' : ''}
                    </p>

                    <div className="mt-auto d-flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-dark rounded-pill px-4"
                        onClick={() => onOpenArticle(article._id)}
                      >
                        Read More
                      </button>
                      <a
                        className="btn btn-outline-dark rounded-pill px-4"
                        href={article.pdfLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  )
}

export default ResourcesPage
