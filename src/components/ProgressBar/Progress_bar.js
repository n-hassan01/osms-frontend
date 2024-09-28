/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import 'bootstrap/dist/css/bootstrap.min.css';

const Progress_bar = ({ target, deposit, height, viewMode }) => {
  function getFormattedPrice(value) {
    const formattedPrice = new Intl.NumberFormat().format(Math.floor(value));
    return formattedPrice;
  }

  const validTarget = target > 0 ? target : 1; // Avoid division by zero
  const progressPercentage = Math.min((deposit / validTarget) * 100, 100);
  console.log(progressPercentage);

  let bgColor;
  if (progressPercentage <= 30) {
    bgColor = 'Crimson';
  } else if (progressPercentage <= 80) {
    bgColor = 'Gold';
  } else {
    bgColor = 'LimeGreen';
  }

  return (
    <div
      className="progress"
      style={{
        display: 'flex',
        alignItems: 'center',
        height: height,
        width: '80%', // Adjusted container width
        backgroundColor: 'SteelBlue',
        margin: '0px 0',
        border: 'none',
        borderRadius: '0px',
        position: 'relative',
      }}
    >
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={deposit.toFixed(2)}
        aria-valuemin="0"
        aria-valuemax={validTarget.toFixed(2)}
        style={{
          width: `${progressPercentage}%`, // Dynamic width based on progress
          backgroundColor: bgColor,
          height: height * 0.5,
          position: 'absolute',
          top: 10,
          left: 0,
        }}
      >
        {viewMode === 'percentage' ? (
          <>
            {progressPercentage >= 90 ? (
              // Text inside the orange line for progress >= 90
              <span
                style={{
                  position: 'absolute',
                  left: `calc(${progressPercentage}% - 60px)`, // Keep the text inside
                  color: 'black',
                }}
              >
                {`${progressPercentage.toFixed(2)}%`}
              </span>
            ) : (
              // Text outside the orange line for progress < 90
              <span
                style={{
                  position: 'absolute',
                  left: `calc(${progressPercentage}% + 55px)`, // Place text after orange line
                  color: 'black',
                }}
              >
                {`${progressPercentage.toFixed(2)}%`}
              </span>
            )}
          </>
        ) : (
          // <span style={{ marginLeft: '80%', color: 'black' }}>{`${getFormattedPrice(deposit)}`}</span>
          <>
            {deposit > target ? (
              // Text inside the orange line for progress >= 90
              <span style={{ marginLeft: '85%', color: 'black' }}>{`${getFormattedPrice(deposit)}`}</span>
            ) : (
              // Text outside the orange line for progress < 90
              <span style={{ marginLeft: '75%', color: 'black' }}>{`${getFormattedPrice(deposit)}`}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Progress_bar;
