import { FieldChooser, PivotGrid } from 'devextreme-react/pivot-grid';
import 'devextreme/dist/css/dx.light.css';
import { useEffect, useState } from 'react';
import { getDrillDownCustomerDepositAnalytic, getDrillView, getUserProfileDetails } from '../Services/ApiServices';
import { useUser } from '../context/UserContext'; // Assuming you have a user context

const PivotGridTable = () => {
  const [userList, setUserList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { user } = useUser();
  const [account, setAccount] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const accountDetails = await getUserProfileDetails(user); // Assuming this function is defined
          if (accountDetails.status === 200) {
            setAccount(accountDetails.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          console.log(account.user_id);
          const response = await getDrillDownCustomerDepositAnalytic(user); // Assuming this function is defined

          if (response.status === 200) {
            setUsersList(response.data);
          }
          console.log('drillcustomer', response);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account]);
  console.log(usersList);

  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          console.log(account.user_id);
          const response = await getDrillView(user); // Assuming this function is defined

          if (response.status === 200) {
            setUserList(response.data);
          }
          console.log('drillview', response);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account]);

  console.log(userList);

  const samplesData = usersList.map((item) => ({
    customerGroup: item.customer_group, // Assuming deposit_type_name as category
    customerName: item.customer_name,
    depositDate: item.deposit_date,
    todaysDeposit: item.todays_deposit,
    sevenDayDeposit: item.seven_day_deposit, // Assuming company_name as subcategory
    monthlyDeposit: item.monthly_deposit, // Assuming customer_name as product
  }));

  console.log(usersList);
  const datasSource = {
    store: {
      type: 'array',
      key: 'depositDate', // Assuming 'sum' can act as a unique identifier
      data: samplesData,
    },
    fields: [
      {
        caption: 'Customer Group ',
        dataField: 'customerGroup',
        area: 'row',
      },
      {
        caption: 'Customer Name ',
        dataField: 'customerName',
        area: 'row',
      },

      {
        caption: 'Todays Deposit ',
        dataField: 'todaysDeposit',
        area: 'column',
      },

      {
        caption: 'Seven Day Deposit',
        dataField: 'sevenDayDeposit',
        area: 'column',
      },
      {
        caption: 'Monthly Deposit',
        dataField: 'monthlyDeposit',
        area: 'column',
      },

      {
        caption: 'Sum',
        dataField: 'monthlyDeposit',
        dataType: 'number',
        summaryType: 'sum',
        format: 'currency',
        area: 'data',
      },
    ],
  };

  return (
    <>
      <PivotGrid
        id="pivotGrid"
        showBorders
        dataSource={datasSource} // Change this to userList or the data received from API
        allowSorting
        allowSortingBySummary
        allowFiltering
        height={600}
        width={'100%'}
      >
        <FieldChooser enabled />
      </PivotGrid>
    </>
  );
};

export default PivotGridTable;
