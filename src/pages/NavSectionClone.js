import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { ListItemText } from '@mui/material';
import styled from 'styled-components'; // Import styled from styled-components
//
import { getLoggedInUserDetails, getUserMenuList } from '../Services/ApiServices';
import { useUser } from '../context/UserContext';

// ----------------------------------------------------------------------

// Include the CSS directly within your styled components

const StyledScrollMenu = styled.div`
  background-color: rgb(206, 212, 218) 1px 1px;
  overflow-x: auto;
  white-space: nowrap;

  .nav-item {
    display: inline-block;
    color: black;
    text-align: center;
    padding: 14px;
    text-decoration: none;
  }

  .nav-item:hover {
    background-color: #e0e0e0;
  }
`;

NavSectionClone.propTypes = {
  data: PropTypes.array,
};

export default function NavSectionClone() {
  const [account, setAccount] = useState({});
  const { user } = useUser();
  const [userMenus, setUserMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const accountDetails = await getLoggedInUserDetails(user);
          console.log('ad', accountDetails);
          if (accountDetails.status === 200) {
            setAccount(accountDetails.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchUserMenus = async () => {
      try {
        if (user) {
          const accountDetails = await getLoggedInUserDetails(user);
          const userId = accountDetails.data.id;
          const response = await getUserMenuList(userId, user);
          console.log('iID', response);
          setUserMenus(response.data);
        }
      } catch (error) {
        console.error('Error fetching user menus:', error);
      }
    };

    fetchUserMenus();
  }, [user]);

  // Define the maximum height for the list
  const maxListHeight = 200; // Adjust as needed

  return (
    <div style={{ maxHeight: maxListHeight, overflowY: 'auto', marginLeft: '20px', marginRight: '20px' }}>
      <StyledScrollMenu>
        {userMenus.map((item, index) => (
          <NavItem key={item.title} item={item} />
        ))}
      </StyledScrollMenu>
    </div>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  console.log(item);
  const { title, path, info } = item;

  return (
    <RouterLink to={path} className="nav-item">
      <ListItemText disableTypography primary={title} />
      {info && info}
    </RouterLink>
  );
}
