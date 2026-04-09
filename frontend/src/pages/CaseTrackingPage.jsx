import { useEffect, useState } from 'react'
import axios from 'axios'

function CaseTrackingPage() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    const userId = parsedUser?.id

    const fetchCases = async () => {
      if (!userId) {
        setError('Please log in to view case tracking.')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/cases/${userId}`)
        setCases(response.data)
      } catch (err) {
        setError('Unable to load case tracking details right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  return (
    <main className="app-shell py-5">
      <div className="container py-4 py-lg-5">
        <section className="page-hero p-4 p-md-5 section-card mb-5">
          <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-3">
            Case Tracking
          </span>
          <h1 className="display-5 mb-3">Follow every milestone in one place</h1>
          <p className="lead mb-0 col-lg-8">
            Track the latest updates for your matters with a simple case timeline
            showing what has been filed, scheduled, progressed, or completed.
          </p>
        </section>

        {loading ? (
          <div className="card status-card border-0 shadow-sm">
            <div className="card-body py-5 text-center">
              <div className="spinner-border text-primary mb-3" role="status" />
              <p className="text-secondary">Loading case updates...</p>
            </div>
          </div>
        ) : null}

        {!loading && error ? (
          <div className="alert alert-danger shadow-sm" role="alert">
            {error}
          </div>
        ) : null}

        {!loading && !error && cases.length === 0 ? (
          <div className="card empty-state border-0 shadow-sm">
            <div className="card-body py-5 text-center">
              <h3 className="mb-2">No cases found</h3>
              <p className="text-secondary mb-0">
                Case timelines will appear here when your legal matters are added.
              </p>
            </div>
          </div>
        ) : null}

        {!loading && !error && cases.length > 0 ? (
          <section className="row g-4 g-lg-5">
            {cases.map((caseItem) => (
              <div key={caseItem._id} className="col-12 col-xl-6">
                <article className="card border-0 shadow-sm case-card h-100">
                  <div className="card-body p-4 p-lg-5">
                    <h2 className="h3 mb-4">{caseItem.title}</h2>

                    <div className="timeline">
                      {caseItem.updates.map((update, index) => (
                        <div
                          key={`${caseItem._id}-${update.status}-${update.date}`}
                          className={`timeline-item ${index === caseItem.updates.length - 1 ? 'is-last' : ''}`}
                        >
                          <div className="timeline-marker">
                            <span className="timeline-dot" />
                            {index !== caseItem.updates.length - 1 ? (
                              <span className="timeline-line" />
                            ) : null}
                          </div>
                          <div className="timeline-content">
                            <h3 className="h6 mb-1">{update.status}</h3>
                            <p className="text-secondary mb-0">{update.date}</p>
                          </div>
                        </div>
                      ))}
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

export default CaseTrackingPage
