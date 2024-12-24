import "bootstrap/dist/css/bootstrap.min.css";
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
