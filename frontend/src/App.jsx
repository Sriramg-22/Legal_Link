import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LawyersPage from './pages/LawyersPage'
import DashboardPage from './pages/DashboardPage'
import ResourcesPage from './pages/ResourcesPage'
import ArticleDetailsPage from './pages/ArticleDetailsPage'
import CaseTrackingPage from './pages/CaseTrackingPage'
import InfoPage from './pages/InfoPage'
import './App.css'

const getRouteState = (pathname, hasToken) => {
  if (pathname.startsWith('/resources/')) {
    const articleId = pathname.split('/')[2]
    return {
      page: articleId ? 'articleDetails' : 'resources',
      articleId: articleId || '',
    }
  }

  if (pathname === '/signup') {
    return { page: hasToken ? 'lawyers' : 'signup', articleId: '' }
  }

  if (pathname === '/login') {
    return { page: hasToken ? 'lawyers' : 'login', articleId: '' }
  }

  if (pathname === '/lawyers') {
    return { page: hasToken ? 'lawyers' : 'login', articleId: '' }
  }

  if (pathname === '/dashboard') {
    return { page: hasToken ? 'dashboard' : 'login', articleId: '' }
  }

  if (pathname === '/case-tracking') {
    return { page: hasToken ? 'caseTracking' : 'login', articleId: '' }
  }

  if (pathname === '/services') {
    return { page: 'services', articleId: '' }
  }

  if (pathname === '/resources') {
    return { page: 'resources', articleId: '' }
  }

  if (pathname === '/contact') {
    return { page: 'contact', articleId: '' }
  }

  return { page: hasToken ? 'lawyers' : 'home', articleId: '' }
}

const getPathFromPage = (page, hasToken, articleId = '') => {
  if (page === 'signup') return '/signup'
  if (page === 'login') return '/login'
  if (page === 'lawyers') return hasToken ? '/lawyers' : '/login'
  if (page === 'dashboard') return hasToken ? '/dashboard' : '/login'
  if (page === 'caseTracking') return hasToken ? '/case-tracking' : '/login'
  if (page === 'services') return '/services'
  if (page === 'resources') return '/resources'
  if (page === 'articleDetails') return `/resources/${articleId}`
  if (page === 'contact') return '/contact'
  return '/'
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [currentPage, setCurrentPage] = useState(() => {
    const route = getRouteState(window.location.pathname, Boolean(localStorage.getItem('token')))
    return route.page
  })
  const [currentArticleId, setCurrentArticleId] = useState(() => {
    const route = getRouteState(window.location.pathname, Boolean(localStorage.getItem('token')))
    return route.articleId
  })
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('')

  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteState(window.location.pathname, Boolean(localStorage.getItem('token')))
      setCurrentPage(route.page)
      setCurrentArticleId(route.articleId)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateToPage = (page, options = {}) => {
    const nextArticleId = options.articleId || ''
    const nextPath = getPathFromPage(page, Boolean(token), nextArticleId)
    setCurrentPage(page)
    setCurrentArticleId(nextArticleId)

    if (!options.replace) {
      window.history.pushState({}, '', nextPath)
      return
    }

    window.history.replaceState({}, '', nextPath)
  }

  const handleLogin = (newToken) => {
    setToken(newToken)
    setSignupSuccessMessage('')
    setCurrentPage('lawyers')
    setCurrentArticleId('')
    window.history.pushState({}, '', '/lawyers')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setSignupSuccessMessage('')
    setCurrentPage('home')
    setCurrentArticleId('')
    window.history.pushState({}, '', '/')
  }

  const handleFindLawyer = () => {
    navigateToPage(token ? 'lawyers' : 'login')
  }

  const handleGetLegalAdvice = () => {
    navigateToPage(token ? 'lawyers' : 'login')
  }

  const handleKnowYourRights = () => {
    navigateToPage(token ? 'lawyers' : 'login')
  }

  const handleNavigate = (page) => {
    if ((page === 'lawyers' || page === 'dashboard' || page === 'caseTracking') && !token) {
      navigateToPage('login')
      return
    }

    if (page === 'login' && token) {
      navigateToPage('lawyers')
      return
    }

    navigateToPage(page)
  }

  const handleSignupSuccess = (message) => {
    setSignupSuccessMessage(message)
    setCurrentPage('login')
    setCurrentArticleId('')
    window.history.pushState({}, '', '/login')
  }

  const renderPage = () => {
    if (currentPage === 'home') {
      return (
        <HomePage
          onFindLawyer={handleFindLawyer}
          onGetLegalAdvice={handleGetLegalAdvice}
          onKnowYourRights={handleKnowYourRights}
        />
      )
    }

    if (currentPage === 'services') {
      return (
        <InfoPage
          title="Legal Services Designed Around Real Needs"
          description="Explore practical legal support for consultations, documentation, dispute resolution, and expert guidance across key practice areas."
          cards={[
            {
              tag: 'Consultation',
              title: 'One-to-One Lawyer Matching',
              text: 'Connect with lawyers based on specialization, location, language, and experience.',
            },
            {
              tag: 'Support',
              title: 'Legal Advice Sessions',
              text: 'Book timely consultations for family, property, corporate, criminal, and civil matters.',
            },
            {
              tag: 'Access',
              title: 'Easy Appointment Booking',
              text: 'Choose your preferred lawyer, date, and time through a simple online flow.',
            },
          ]}
        />
      )
    }

    if (currentPage === 'resources') {
      return <ResourcesPage onOpenArticle={(articleId) => navigateToPage('articleDetails', { articleId })} />
    }

    if (currentPage === 'dashboard' && token) {
      return <DashboardPage />
    }

    if (currentPage === 'caseTracking' && token) {
      return <CaseTrackingPage />
    }

    if (currentPage === 'articleDetails' && currentArticleId) {
      return (
        <ArticleDetailsPage
          articleId={currentArticleId}
          onBackToResources={() => navigateToPage('resources')}
        />
      )
    }

    if (currentPage === 'contact') {
      return (
        <InfoPage
          title="Contact Legal Link"
          description="Reach out for help using the platform, getting matched with a lawyer, or understanding how to get started."
          cards={[
            {
              tag: 'Email',
              title: 'help@legallink.in',
              text: 'Share your query and our team can guide you toward the right next step.',
            },
            {
              tag: 'Phone',
              title: '+91 98765 43210',
              text: 'Connect with support during business hours for quick assistance.',
            },
            {
              tag: 'Coverage',
              title: 'Available Across India',
              text: 'Designed to connect users with legal help across major cities and regions.',
            },
          ]}
        />
      )
    }

    if (currentPage === 'login' && !token) {
      return (
        <LoginPage
          onLogin={handleLogin}
          successMessage={signupSuccessMessage}
          onNavigateToSignup={() => handleNavigate('signup')}
        />
      )
    }

    if (currentPage === 'signup' && !token) {
      return (
        <SignupPage
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={() => handleNavigate('login')}
        />
      )
    }

    if (currentPage === 'lawyers' && token) {
      return <LawyersPage />
    }

    return (
      <HomePage
        onFindLawyer={handleFindLawyer}
        onGetLegalAdvice={handleGetLegalAdvice}
        onKnowYourRights={handleKnowYourRights}
      />
    )
  }

  return (
    <div className="site-shell">
      <Navbar
        currentPage={currentPage}
        isAuthenticated={Boolean(token)}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {renderPage()}
      <Footer />
    </div>
  )
}

export default App
