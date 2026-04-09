import { useEffect, useState } from 'react'
import axios from 'axios'
import LawyerCard from '../components/LawyerCard'
const API = import.meta.env.VITE_API_URL;
function LawyersPage() {
  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLawyer, setSelectedLawyer] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [bookingMessage, setBookingMessage] = useState('')
  const [bookingError, setBookingError] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)

  const filteredLawyers = lawyers.filter((lawyer) => {
    const query = searchTerm.toLowerCase()

    return (
      lawyer.name.toLowerCase().includes(query) ||
      lawyer.specialization.toLowerCase().includes(query)
    )
  })

  const selectedLawyerData = lawyers.find((lawyer) => lawyer._id === selectedLawyer)
  const availableSlots = selectedLawyerData?.availableSlots || []
  const storedUser = localStorage.getItem('user')
  const currentUser = storedUser ? JSON.parse(storedUser) : null

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get(`${API}/api/lawyers`)
        setLawyers(response.data)
      } catch (err) {
        setError('Unable to load lawyers. Please make sure the backend is running.')
      } finally {
        setLoading(false)
      }
    }

    fetchLawyers()
  }, [])

  const handleBookingSubmit = async (event) => {
    event.preventDefault()
    setBookingMessage('')
    setBookingError('')
    setBookingLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        userId: currentUser?.id,
        lawyer: selectedLawyer,
        date: bookingDate,
        time: bookingTime,
      })

      setBookingMessage(
        `Booking confirmed with ${response.data.booking.lawyer.name} on ${response.data.booking.date} at ${response.data.booking.time}.`,
      )
      setBookingDate('')
      setBookingTime('')
      setSelectedLawyer('')
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Unable to create booking.')
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <main className="app-shell py-5">
      <div className="container py-4 py-lg-5">
        <section className="page-hero p-4 p-md-5 section-card mb-5">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <div>
              <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-3">
                Legal Link Directory
              </span>
              <h1 className="display-4 mb-3">Find trusted lawyers across India</h1>
              <p className="lead mb-0 col-lg-8">
                Explore experienced legal professionals by specialization, language,
                rating, and city.
              </p>
            </div>
          </div>
        </section>

        <section className="card border-0 shadow-sm booking-panel section-card mb-5">
          <div className="card-body p-4 p-lg-5 p-xl-5">
            <div className="row g-4 g-xl-5 align-items-end">
              <div className="col-12 col-lg-4">
                <h2 className="mb-2">Book a Consultation</h2>
                <p className="text-secondary">
                  Choose a lawyer, preferred date, and time to save your booking.
                </p>
              </div>
              <div className="col-12 col-lg-8">
                <form onSubmit={handleBookingSubmit}>
                  <div className="row g-3 g-lg-4">
                    <div className="col-12 col-md-4">
                      <label htmlFor="lawyer" className="form-label">
                        Lawyer
                      </label>
                      <select
                        id="lawyer"
                        className="form-select form-select-lg"
                        value={selectedLawyer}
                        onChange={(event) => {
                          setSelectedLawyer(event.target.value)
                          setBookingTime('')
                        }}
                        required
                      >
                        <option value="">Select lawyer</option>
                        {filteredLawyers.map((lawyer) => (
                          <option key={lawyer._id} value={lawyer._id}>
                            {lawyer.name} - {lawyer.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-3">
                      <label htmlFor="booking-date" className="form-label">
                        Date
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        className="form-control form-control-lg"
                        value={bookingDate}
                        onChange={(event) => setBookingDate(event.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <label className="form-label">
                        Available Slots
                      </label>
                      <div className="slot-group">
                        {selectedLawyer ? (
                          availableSlots.length > 0 ? (
                            availableSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                className={`btn slot-button ${bookingTime === slot ? 'slot-button-active' : 'btn-outline-dark'}`}
                                onClick={() => setBookingTime(slot)}
                              >
                                {slot}
                              </button>
                            ))
                          ) : (
                            <p className="text-secondary small mb-0">
                              No slots available for this lawyer.
                            </p>
                          )
                        ) : (
                          <p className="text-secondary small mb-0">
                            Select a lawyer to view available slots.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-2 d-grid">
                      <label className="form-label d-none d-md-block">&nbsp;</label>
                      <button
                        type="submit"
                        className="btn btn-dark btn-lg rounded-pill"
                        disabled={bookingLoading}
                      >
                        {bookingLoading ? 'Saving...' : 'Book'}
                      </button>
                    </div>
                  </div>
                </form>

                {bookingMessage ? (
                  <div className="alert alert-success mt-3 mb-0" role="alert">
                    {bookingMessage}
                  </div>
                ) : null}

                {bookingError ? (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {bookingError}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="card status-card border-0 shadow-sm">
            <div className="card-body py-5 text-center">
              <div className="spinner-border text-primary mb-3" role="status" />
              <p className="text-secondary">Loading lawyers...</p>
            </div>
          </div>
        ) : null}

        {!loading && error ? (
          <div className="alert alert-danger shadow-sm" role="alert">
            {error}
          </div>
        ) : null}

        {!loading && !error && lawyers.length === 0 ? (
          <div className="card empty-state border-0 shadow-sm">
            <div className="card-body py-5 text-center">
              <h3 className="mb-2">No lawyers found</h3>
              <p className="text-secondary mb-0">
                Seed your database and refresh to view available profiles.
              </p>
            </div>
          </div>
        ) : null}

        {!loading && !error && lawyers.length > 0 ? (
          <section className="lawyers-section">
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4 mb-lg-5">
              <div>
                <h2 className="mb-1">Available Lawyers</h2>
                <p className="text-secondary">
                  {filteredLawyers.length} profiles ready to explore
                </p>
              </div>
              <div className="search-panel">
                <label htmlFor="lawyer-search" className="form-label small text-uppercase fw-semibold search-label">
                  Search Lawyers
                </label>
                <input
                  id="lawyer-search"
                  type="text"
                  className="form-control form-control-lg search-input"
                  placeholder="Search by name or specialization"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            {filteredLawyers.length === 0 ? (
              <div className="card empty-state border-0 shadow-sm">
                <div className="card-body py-5 text-center">
                  <h3 className="mb-2">No matching lawyers found</h3>
                  <p className="text-secondary mb-0">
                    Try a different lawyer name or specialization.
                  </p>
                </div>
              </div>
            ) : (
              <div className="row g-4 g-lg-5">
                {filteredLawyers.map((lawyer) => (
                  <div key={lawyer._id} className="col-12 col-md-6 col-xl-4">
                    <LawyerCard
                      lawyer={lawyer}
                      onSelect={setSelectedLawyer}
                      isSelected={selectedLawyer === lawyer._id}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : null}
      </div>
    </main>
  )
}

export default LawyersPage
