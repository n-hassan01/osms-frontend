/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import 'bootstrap/dist/css/bootstrap.min.css';

const Progress_bar = ({ target, deposit, maxDeposit, height }) => {
  console.log(target, deposit, maxDeposit, height);

  // Normalize the deposit based on the maximum deposit value
  const progress = maxDeposit > 0 ? (deposit / maxDeposit) * 100 : 0;
  console.log(progress);

  let bgColor;
  if (progress < 10) {
    bgColor = 'Red';
  } else if (progress < 20) {
    bgColor = 'Crimson';
  } else if (progress < 30) {
    bgColor = 'IndianRed';
  } else if (progress < 40) {
    bgColor = 'Orange';
  } else if (progress < 50) {
    bgColor = 'DarkOrange';
  } else if (progress < 60) {
    bgColor = 'SeaGreen';
  } else if (progress < 70) {
    bgColor = 'Olive';
  } else if (progress < 80) {
    bgColor = 'SpringGreen';
  } else if (progress < 90) {
    bgColor = 'MediumSeaGreen';
  } else {
    bgColor = 'green';
  }

  return (
    <div
      className="progress"
      style={{
        display: 'flex', // Enable flexbox on parent
        alignItems: 'center', // Center child vertically
        height: height, // Parent height
        width: '100%', // Full width
        maxWidth: '500px', // Maximum width
        backgroundColor: 'MediumBlue', // Parent background color
        margin: '0px 0', // Vertical margin
      }}
    >
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={progress.toFixed(2)}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          width: `${Math.min(progress, 100)}%`, // Adjust width based on progress
          backgroundColor: 'DarkOrange', // Dynamic background color
          height: height * 0.7,
          borderTopRightRadius: '8px', // Add border radius only to the top-right
          borderBottomRightRadius: '8px', // Add border radius only to the bottom-right
          borderTopLeftRadius: progress >= 100 ? '8px' : '0px', // Ensure the left side has a radius if progress is 100%
          borderBottomLeftRadius: progress >= 100 ? '8px' : '0px', // Child height is 70% of the parent height
        }}
      >
        {`${progress.toFixed(2)}%`}
      </div>
    </div>
  );
};

export default Progress_bar;
