function LawyerCard({ lawyer, onSelect, isSelected }) {
  return (
    <div className={`card lawyer-card h-100 shadow-sm ${isSelected ? 'selected-lawyer-card' : ''}`}>
      <div className="card-body p-4 p-xl-4 d-flex flex-column">
        <div className="mb-4">
          <img
            src={lawyer.photo}
            alt={lawyer.name}
            className="lawyer-card-image w-100 rounded-4"
          />
        </div>

        <div className="text-start mb-4">
          <h5 className="mb-2">{lawyer.name}</h5>
          <p className="text-secondary fw-semibold mb-3">{lawyer.specialization}</p>
          <div className="d-flex flex-wrap gap-2">
            <span className="info-pill">{lawyer.experience} years exp.</span>
            <span className="info-pill">⭐ {lawyer.rating}/5</span>
          </div>
        </div>

        <div className="text-start mb-4">
          <p className="mb-3 text-body-secondary">
            <strong className="text-dark">Location:</strong> {lawyer.location}
          </p>
          <div className="d-flex flex-wrap gap-2">
            {lawyer.languages.map((language) => (
              <span key={`${lawyer._id}-${language}`} className="language-chip">
                {language}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto text-start">
          <button
            type="button"
            className={`btn w-100 rounded-pill ${isSelected ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => onSelect(lawyer._id)}
          >
            {isSelected ? 'Selected' : 'Select Lawyer'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LawyerCard
