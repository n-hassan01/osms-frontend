import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useUser } from '../context/UserContext';
import { getSoSalesTargetIncentiveService, getUserProfileDetails } from '../Services/ApiServices';

const SalesGauge = () => {
  const { user } = useUser();
  const [account, setAccount] = useState({});
  const [standardBarList, setStandardBarList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const accountDetails = await getUserProfileDetails(user); // Call your async function here
          if (accountDetails.status === 200) setAccount(accountDetails.data); // Set the account details in the component's state
        }
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [user]);
  console.log(account);

  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          const response = await getSoSalesTargetIncentiveService(user); // Assuming this function is defined

          if (response.status === 200) {
            setStandardBarList(response.data);
          }
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account]);
  console.log(standardBarList);

  const salesTarget = standardBarList[0].sales_target;
  const collectedSales = standardBarList[0].sum;
  const currentDay = 15;
  // Calculate percentage of the sales target achieved
  const percentage = Math.min((collectedSales / salesTarget) * 100, 100);

  // Calculate the rotation for the day indicator (0 to 360 degrees)
  const dayPercentage = (currentDay / 30) * 100;

  return (
    <div style={{ width: '200px', margin: 'auto', position: 'relative' }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          pathColor: '#4caf50', // Green path for progress
          textColor: '#333', // Dark text color
          trailColor: '#d6d6d6', // Light gray trail
          backgroundColor: '#f3f3f3', // Optional background color
        })}
      />
      {/* Dot indicator for days */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `rotate(${(dayPercentage / 100) * 360}deg) translate(-50%, -110px)`,
          width: '12px',
          height: '12px',
          backgroundColor: '#ff5722', // Orange dot
          borderRadius: '50%',
          zIndex: 1, // Ensures the dot appears above the gauge
        }}
      />
      {/* <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Collected: {collectedSales.toLocaleString()} / Target: {salesTarget.toLocaleString()}
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#777' }}>Day: {currentDay} / 30</p>
      </div> */}
    </div>
  );
};

export default SalesGauge;
