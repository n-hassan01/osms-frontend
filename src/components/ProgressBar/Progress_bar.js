/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import 'bootstrap/dist/css/bootstrap.min.css';

const Progress_bar = ({ target, deposit, maxDeposit, height }) => {
  console.log(target, deposit, maxDeposit, height);

  // Normalize the deposit based on the maximum deposit value
  const progress = maxDeposit > 0 ? (deposit / maxDeposit) * 100 : 0; // Cap progress at 100%
  console.log(progress);
  let bgColor;
  if (progress < 10) {
    bgColor = 'Red'; // Low progress
  } else if (progress < 20) {
    bgColor = 'Crimson'; // Medium progress
  } else if (progress < 30) {
    bgColor = 'IndianRed'; // Medium progress
  } else if (progress < 40) {
    bgColor = 'Orange'; // Medium progress
  } else if (progress < 50) {
    bgColor = 'DarkOrange'; // Medium progress
  } else if (progress < 60) {
    bgColor = 'SeaGreen'; // Medium progress
  } else if (progress < 70) {
    bgColor = 'Olive'; // Medium progress
  } else if (progress < 80) {
    bgColor = 'SpringGreen'; // Medium progress
  } else if (progress < 90) {
    bgColor = 'MediumSeaGreen'; // Medium progress
  } else {
    bgColor = 'green'; // High progress
  }

  return (
    <div
      className="progress"
      style={{
        height: height,
        backgroundColor: 'blue', // Parent background color
      }}
    >
      {/* Height is dynamic */}
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={progress.toFixed(2)}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          width: `${Math.min(progress, 100)}%`,
          backgroundColor: 'orange', // Child background color
        }}
      >
        {`${progress.toFixed(2)}%`}
      </div>
    </div>
  );
};

export default Progress_bar;
