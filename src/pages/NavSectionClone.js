import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Button, List, ListItemText } from '@mui/material';
//
import { getLoggedInUserDetails, getUserMenuList } from '../Services/ApiServices';
import { StyledNavItem } from '../components/nav-section/styles';
import { useUser } from '../context/UserContext';

// ----------------------------------------------------------------------

NavSectionClone.propTypes = {
  data: PropTypes.array,
};

export default function NavSectionClone() {
  const [account, setAccount] = useState({});
  const { user } = useUser();
  const [showAll, setShowAll] = useState(false);

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

  const userId = account.id;

  const [userMenus, setUserMenus] = useState([]);
  useEffect(() => {
    const fetchUserMenus = async () => {
      try {
        if (user) {
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

  console.log(userMenus);

  // Define the number of items to initially show and the button text
  const itemsToShowInitially = 6;
  const buttonText = showAll ? 'Show Less' : 'Show More';

  // Define the maximum height for the list
  const maxListHeight = 200; // Adjust as needed

  return (
    <div style={{ maxHeight: maxListHeight, overflowY: 'auto' }}>
      <List
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'row',
          gap: 2, // Adjust the gap between items as needed
          flexWrap: 'wrap',
        }}
      >
        {userMenus.slice(0, showAll ? userMenus.length : itemsToShowInitially).map((item, index) => (
          <NavItem key={item.title} item={item} sx={{ marginLeft: '10px', marginBottom: '10px' }} />
        ))}
      </List>
      {userMenus.length > itemsToShowInitially && <Button onClick={() => setShowAll(!showAll)}>{buttonText}</Button>}
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
  const icon = '/assets/icons/navbar/ic_analytics.svg';

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
          marginLeft: '10px',
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
