import { useState } from 'react'
import axios from 'axios'

function LoginPage({ onLogin, successMessage, onNavigateToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })

      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      onLogin(token)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-shell d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card border-0 shadow-lg auth-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <span className="badge rounded-pill text-bg-light text-uppercase px-3 py-2 mb-3">
                    Legal Link
                  </span>
                  <h1 className="h2 mb-2">Login</h1>
                  <p className="text-secondary">
                    Sign in with your email and password
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>

                  {successMessage ? (
                    <div className="alert alert-success py-2" role="alert">
                      {successMessage}
                    </div>
                  ) : null}

                  {error ? (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100 rounded-pill mt-2"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>

                <p className="text-center text-secondary mt-4 mb-0">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    className="auth-link-button"
                    onClick={onNavigateToSignup}
                  >
                    Signup
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

export default LoginPage
