import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(props) {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb-product-detail-not-found">
      <div className="title-page-not-found">
        <button onClick={() => navigate(-1)} className="not-found">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;