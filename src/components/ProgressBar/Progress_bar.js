import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

/* eslint-disable object-shorthand */
/* eslint-disable camelcase */

const Progress_bar = ({ target, deposit, height, viewMode, threshold_1, threshold_2 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');

  const getFormattedPrice = (value) => new Intl.NumberFormat().format(Math.floor(value));

  const validTarget = target > 0 ? target : 1; // Avoid division by zero
  const progressPercentage = Math.min((deposit / validTarget) * 100, 100);
  const incompleteAmount = target - deposit;
  const isComplete = deposit >= target;

  // Update tooltip content based on hover state
  useEffect(() => {
    if (isHovered) {
      if (isComplete) {
        setTooltipContent('✔️ Progress complete! 🎉');
      } else {
        setTooltipContent(
          `💡 Incomplete: ${getFormattedPrice(incompleteAmount)} (${(100 - progressPercentage).toFixed(2)}% remaining)`
        );
      }
    } else {
      setTooltipContent('');
    }
  }, [isHovered, deposit, target, progressPercentage, incompleteAmount, isComplete]);

  // Dynamic background gradient based on thresholds
  const gradientBackground = `linear-gradient(to right,
    FireBrick 0%,
    FireBrick ${threshold_1}%,
    Gold ${threshold_1}%,
    Gold ${threshold_1 + threshold_2}%,
    ForestGreen ${threshold_1 + threshold_2}%,
    ForestGreen 100%)`;

  const styles = {
    progressContainer: {
      height: height,
      width: '80%',
      margin: '0px 0',
      position: 'relative',
      background: gradientBackground,
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      transition: 'background 0.4s ease',
    },
    progressBar: {
      width: `${progressPercentage}%`,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      height: height * 0.5,
      position: 'absolute',
      top: 10,
      left: 0,
      zIndex: 1,
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      transition: 'width 0.4s ease, transform 0.2s ease',
      boxShadow: isHovered ? '0 4px 10px rgba(0, 0, 0, 0.5)' : '0 2px 5px rgba(0, 0, 0, 0.2)',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    },
    progressText: {
      position: 'absolute',
      right: '10px',
      color: 'black',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    tooltip: {
      position: 'absolute',
      bottom: '120%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      visibility: isHovered ? 'visible' : 'hidden',
      opacity: isHovered ? 1 : 0,
      transition: 'opacity 0.3s ease',
      zIndex: 2,
      whiteSpace: 'nowrap',
    },
  };

  return (
    <div
      className="progress-container"
      style={styles.progressContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip for progress information */}
      <div style={styles.tooltip}>{tooltipContent}</div>

      {/* Dynamic progress bar */}
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={deposit.toFixed(2)}
        aria-valuemin="0"
        aria-valuemax={validTarget.toFixed(2)}
        style={styles.progressBar}
      >
        {viewMode === 'percentage' ? (
          <span style={styles.progressText}>{`${progressPercentage.toFixed(2)}%`}</span>
        ) : (
          <span style={styles.progressText}>{getFormattedPrice(deposit)}</span>
        )}
      </div>
    </div>
  );
};

export default Progress_bar;
