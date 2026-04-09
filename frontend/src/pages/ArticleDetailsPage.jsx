import { useEffect, useState } from 'react'
import axios from 'axios'

function ArticleDetailsPage({ articleId, onBackToResources }) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/${articleId}`)
        setArticle(response.data)
      } catch (err) {
        setError('Unable to load this article right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId])

  return (
    <main className="app-shell py-5">
      <div className="container py-4 py-lg-5">
        {loading ? (
          <div className="card status-card border-0 shadow-sm">
            <div className="card-body py-5 text-center">
              <div className="spinner-border text-primary mb-3" role="status" />
              <p className="text-secondary">Loading article...</p>
            </div>
          </div>
        ) : null}

        {!loading && error ? (
          <div className="alert alert-danger shadow-sm" role="alert">
            {error}
          </div>
        ) : null}

        {!loading && !error && article ? (
          <section className="card border-0 shadow-sm article-detail-card">
            <div className="card-body p-4 p-md-5 p-xl-5">
              <button
                type="button"
                className="btn btn-outline-dark rounded-pill px-4 mb-4"
                onClick={onBackToResources}
              >
                Back to Resources
              </button>

              <span className="info-card-tag">{article.category}</span>
              <h1 className="display-5 mt-3 mb-3">{article.title}</h1>
              <p className="article-content mb-4">{article.content}</p>

              <a
                className="btn btn-dark rounded-pill px-4"
                href={article.pdfLink}
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}

export default ArticleDetailsPage
