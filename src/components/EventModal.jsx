import React from 'react';

const EventModal = ({ data, onClose }) => {
  console.log(data)
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h2 className='modal-title'>Tour Details</h2>
        <p>Date: {data.date.toDateString()}</p>
        <div>
          <h4>Available Tours:</h4>
          {data.tours.length > 0 ? (
            <ul>
              {data.tours.map((tour, index) => (
                <li key={index}>
                  <strong>Date:</strong> {new Date(tour.date).toDateString()} - <strong>Time:</strong> {tour.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tours available</p>
          )}
        </div>
        <div className="modal-buttons">
          <button
            className="styled-button"
            onClick={() => (window.location.href = '/')}
          >
            Schedule a Tour
          </button>
          <button className="styled-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default EventModal;
