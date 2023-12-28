import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { List, ListItemText } from '@mui/material';
//
import { getLoggedInUserDetails, getUserMenuList } from '../Services/ApiServices';
import { StyledNavItem } from '../components/nav-section/styles';
// import navConfig from './config';
import { useUser } from '../context/UserContext';


// ----------------------------------------------------------------------

NavSectionClone.propTypes = {
  data: PropTypes.array,
};

export default function NavSectionClone() {
    
  const [account, setAccount] = useState({});
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const accountDetails = await getLoggedInUserDetails(user);
          console.log("ad",accountDetails);
          if (accountDetails.status === 200) {
            setAccount(accountDetails.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const userId = account.id;
  console.log(userId);

  const [userMenus, setUserMenus] = useState([]);
  useEffect(() => {
    const fetchUserMenus = async () => {
      try {
        // Make sure userId is available before making the second API call
        if (userId) {
          const response = await getUserMenuList(userId);
          console.log("iID",response);
          setUserMenus(response.data);
        }
      } catch (error) {
        console.error('Error fetching user menus:', error);
      }
    };

    fetchUserMenus();
  }, [userId]); // Add userId to the dependency array to trigger the effect when it changes

  console.log(userMenus);
  return (
    
      <List  sx={{ p: 1 }} style={{display:"flex",flexDirection: 'row'}}>
        {userMenus.map((item) => (
          <NavItem style={{marginLeft:"10px"}} key={item.title} item={item} />
        ))}
      </List>

  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  console.log(item);
  const { title, path, info } = item;
  const icon = '/assets/icons/navbar/ic_analytics.svg'

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
          marginLeft:"10px"
        },
      }}
    >
      {/* <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon> */}
       {/* <StyledNavItemIcon><SvgColor src={icon} sx={{ width: 1, height: 1 }} /></StyledNavItemIcon> */}

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
