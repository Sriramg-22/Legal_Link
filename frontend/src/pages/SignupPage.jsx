import { useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;
function SignupPage({ onSignupSuccess, onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Client',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('All fields are required')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API}/api/auth/signup`, formData)
      setSuccess(response.data.message || 'Signup successful')
      onSignupSuccess('Signup successful. Please log in with your new account.')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-shell d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-lg auth-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-3">
                    Legal Link
                  </span>
                  <h1 className="h2 mb-2">Create Account</h1>
                  <p className="text-secondary">
                    Sign up to connect with legal help quickly and simply.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control form-control-lg"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signup-email" className="form-label">
                      Email
                    </label>
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      className="form-control form-control-lg"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signup-password" className="form-label">
                      Password
                    </label>
                    <input
                      id="signup-password"
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="form-select form-select-lg"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="Client">Client</option>
                      <option value="Lawyer">Lawyer</option>
                    </select>
                  </div>

                  {error ? (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  ) : null}

                  {success ? (
                    <div className="alert alert-success py-2" role="alert">
                      {success}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100 rounded-pill mt-2"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Signup'}
                  </button>
                </form>

                <p className="text-center text-secondary mt-4 mb-0">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="auth-link-button"
                    onClick={onNavigateToLogin}
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignupPage
