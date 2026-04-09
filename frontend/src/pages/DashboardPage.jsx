import { useEffect, useState } from 'react'
import axios from 'axios'

const statusBadgeClass = {
  Pending: 'text-bg-warning',
  Confirmed: 'text-bg-success',
  Completed: 'text-bg-primary',
  Cancelled: 'text-bg-danger',
}

function DashboardPage() {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [cancellingId, setCancellingId] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    setUser(parsedUser)

    const fetchBookings = async () => {
      if (!parsedUser?.id) {
        setError('Please log in to view your dashboard.')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/${parsedUser.id}`)
        setBookings(response.data)
      } catch (err) {
        setError('Unable to load your bookings right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleCancelBooking = async (bookingId) => {
    setSuccessMessage('')
    setError('')
    setCancellingId(bookingId)

    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`)
      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingId ? response.data.booking : booking,
        ),
      )
      setSuccessMessage('Booking cancelled successfully.')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to cancel this booking.')
    } finally {
      setCancellingId('')
    }
  }

  return (
    <main className="app-shell py-5">
      <div className="container py-4 py-lg-5">
        <section className="page-hero p-4 p-md-5 section-card mb-5">
          <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-3">
            User Dashboard
          </span>
          <h1 className="display-5 mb-3">Manage your profile and bookings</h1>
          <p className="lead mb-0 col-lg-8">
            Keep track of your legal consultations, review statuses, and manage
            pending appointments from one clean dashboard.
          </p>
        </section>

        <section className="card border-0 shadow-sm dashboard-profile-card section-card mb-5">
          <div className="card-body p-4 p-md-5 text-center">
            <div className="dashboard-avatar mx-auto mb-4">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <h2 className="h3 mb-2">{user?.name || 'User'}</h2>
            <p className="text-secondary mb-1">{user?.email || 'No email available'}</p>
            <span className="badge rounded-pill dashboard-role-badge mt-2 px-3 py-2">
              {user?.role || 'Client'}
            </span>
          </div>
        </section>

        <section className="dashboard-bookings-section">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 mb-lg-5">
            <div>
              <h2 className="mb-1">My Bookings</h2>
              <p className="text-secondary mb-0">
                Review your consultation history and current booking statuses.
              </p>
            </div>
          </div>

          {successMessage ? (
            <div className="alert alert-success shadow-sm" role="alert">
              {successMessage}
            </div>
          ) : null}

          {loading ? (
            <div className="card status-card border-0 shadow-sm">
              <div className="card-body py-5 text-center">
                <div className="spinner-border text-primary mb-3" role="status" />
                <p className="text-secondary">Loading your dashboard...</p>
              </div>
            </div>
          ) : null}

          {!loading && error ? (
            <div className="alert alert-danger shadow-sm" role="alert">
              {error}
            </div>
          ) : null}

          {!loading && !error && bookings.length === 0 ? (
            <div className="card empty-state border-0 shadow-sm">
              <div className="card-body py-5 text-center">
                <h3 className="mb-2">You have no bookings yet</h3>
                <p className="text-secondary mb-0">
                  Your consultation bookings will appear here once you make one.
                </p>
              </div>
            </div>
          ) : null}

          {!loading && !error && bookings.length > 0 ? (
            <div className="row g-4 g-lg-5">
              {bookings.map((booking) => (
                <div key={booking._id} className="col-12 col-xl-6">
                  <article className="card border-0 shadow-sm dashboard-booking-card h-100">
                    <div className="card-body p-4 p-lg-5">
                      <div className="d-flex align-items-start gap-4 flex-wrap flex-sm-nowrap">
                        <img
                          src={booking.lawyer?.photo}
                          alt={booking.lawyer?.name}
                          className="dashboard-lawyer-photo flex-shrink-0"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
                            <div>
                              <h3 className="h4 mb-1">{booking.lawyer?.name}</h3>
                              <p className="text-secondary mb-0">
                                {booking.lawyer?.specialization}
                              </p>
                            </div>
                            <span
                              className={`badge rounded-pill px-3 py-2 ${statusBadgeClass[booking.status] || 'text-bg-secondary'}`}
                            >
                              {booking.status}
                            </span>
                          </div>

                          <div className="d-flex flex-wrap gap-2 mb-4">
                            <span className="info-pill">Date: {booking.date}</span>
                            <span className="info-pill">Time: {booking.time}</span>
                          </div>

                          {booking.status === 'Pending' ? (
                            <button
                              type="button"
                              className="btn btn-outline-danger rounded-pill px-4"
                              onClick={() => handleCancelBooking(booking._id)}
                              disabled={cancellingId === booking._id}
                            >
                              {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
