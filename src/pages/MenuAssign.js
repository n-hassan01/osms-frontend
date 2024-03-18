/* eslint-disable react/no-unknown-property */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable import/named */

import { Button, Container, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { addUserAssign, getFndUserIds, getMenusDetails, getSelectIdsMenus } from '../Services/ApiServices';
import { useUser } from '../context/UserContext';

// Add this import statement

export default function MenuCreation() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userInput, setUserInput] = useState('');
  // const [user, setUser] = useState('');
  const [showMenuLines, setShowMenuLines] = useState(true);
  const [selectid, setSelectid] = useState('');
  const [list, setList] = useState([]);
  const [menuslist, setMenuslist] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [account, setAccount] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const accountDetails = await getUserProfileDetails(user); // Call your async function here
          if (accountDetails.status === 200) {
            setAccount(accountDetails.data);
          } // Set the account details in the component's state
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
        const response = await getFndUserIds();
        console.log(response);
        if (response.status === 200) {
          setList(response.data);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
      console.log(list);
    }

    fetchData();
  }, []);

  const [menuids, setMenuIds] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMenusDetails(user);
        console.log('hhh', response);
        if (response) setMenuIds(response.data);
        console.log(menuids);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  const [count, setCount] = useState(0);
  const saveSubMenus = async () => {
    console.log('menurows:', menurows.length);

    const filteredArray = menurows.filter((item) => Object.values(item).some((value) => value !== ''));

    let c;
    for (c = count; c < filteredArray.length; c++) {
      const lineInfo = filteredArray[c];
      console.log(lineInfo);

      const requestBody = {
        menuId: lineInfo.menuId,
        userId: lineInfo.userId,
      };

      const response = await addUserAssign(requestBody);

      if (response.status === 200) {
        // Move this line outside the loop to clear the rows only once after all iterations
        setMenuRows([]);
      }
    }
    setCount(c);
    alert('Successfully added');
    navigate('/dashboard/menuassign');

    window.location.reload();
  };

  const [menurows, setMenuRows] = useState([
    {
      menuId: '',
      userId: '',
      userName: '',

      showList: false,
    },
  ]);
  console.log(userInput);

  const handleAddRow = () => {
    if (menurows.length === 1) setShowMenuLines(true);
    if (showMenuLines) {
      setMenuRows([
        ...menurows,
        {
          menuId: '',
          userId: '',
          userName: '',

          showList: false,
        },
      ]);
    }
    console.log(menurows);
  };

  const handleInputChanges = (index, name, value) => {
    console.log('index', index);
    console.log('name', name);
    console.log('value', value);
    const updatedRows = [...menurows];
    updatedRows[index][name] = value;
    // setSelectedItem(null);
    setMenuRows(updatedRows);
  };
  const handleInputItemChange = (index, event) => {
    console.log(event);
    const input = event.target.value;

    const username = 'userName';

    const show = 'showList';

    const updatedRows = [...menurows];

    updatedRows[index][username] = input;

    updatedRows[index][show] = true;

    setMenuRows(updatedRows);
    console.log(menurows);

    // Filter the original list based on the input

    const filtered = list.filter((item) => item.user_name.toLowerCase().includes(input.toLowerCase()));
    setFilteredList(filtered);
  };

  const handleMenuItemClick = (index, item) => {
    console.log(index);
    console.log(item.user_id);
    console.log(item.user_name);
    setSelectid(item.user_id);
    console.log(selectid);

    const name = 'userId';
    const username = 'userName';
    const show = 'showList';

    const updatedRows = [...menurows];
    updatedRows[index][name] = item.user_id;
    updatedRows[index][username] = item.user_name;

    updatedRows[index][show] = false;
    console.log(updatedRows);
    setMenuRows(updatedRows);
    setSelectedItem(item);
    console.log(menurows);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(selectid);
        const response = await getSelectIdsMenus(user, selectid);
        console.log(response);
        if (response.status === 200) {
          setMenuslist(response.data);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
      console.log(list);
    }

    fetchData();
  }, [selectid]);

  const handleClose = () => {
    navigate('/dashboard/menuassign');

    window.location.reload();

    setOpen(false);
  };

  console.log('mm', menurows);

  return (
    <>
      <Helmet>
        <title> COMS | System Menu </title>
      </Helmet>
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Assign Menu
          </Typography>
        </Stack>
        <Grid item xs={3}>
          {/* <Button
            style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
            onClick={() => {
              handleAddRow();
            }}
          >
            <span style={{ font: 'bold' }}>+ </span> New Menu Assign
          </Button> */}
{/* 
          <Button style={{ fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }} onClick={handleClose}>
            Cancel
          </Button> */}
        </Grid>
        <Grid
          container
          spacing={2}
          style={{ display: 'flex', flexDirection: 'row', marginLeft: '0px', marginTop: '10px' }}
        >
          <div>
            <form className="form-horizontal" style={{ marginTop: '5%' }}>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-highlight">
                  <thead>
                    <tr>
                      <th>
                        User Name <span style={{ color: 'red' }}>*</span>
                      </th>
                      <th>Active Menu</th>
                      <th>
                        Menu Description <span style={{ color: 'red' }}>*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {showMenuLines &&
                      menurows.map((row, index) => (
                        <tr key={index}>
                          <td style={{ width: '190px' }}>
                            <input
                              select
                              type="text"
                              name="userId"
                              placeholder="Type User Name"
                              value={row.userName}
                              onChange={(e) => handleInputItemChange(index, e)}
                              //  onChange={(e) => handleInputChanges(index, e.target.name, e.target.value)}
                              style={{ marginTop: '18px' }}
                            />
                            {row.showList && (
                              <ul style={{ marginTop: '18px' }}>
                                {filteredList.map((item, itemIndex) => (
                                  <MenuItem
                                    key={itemIndex}
                                    defaultValue={item.user_name}
                                    onClick={(e) => handleMenuItemClick(index, item)}
                                  >
                                    {item.user_name}
                                  </MenuItem>
                                ))}
                              </ul>
                            )}
                          </td>

                          <td>
                            {selectedItem && menuslist.length > 0
                              ? menuslist.map((item, i) => (
                                  <div key={i}>
                                    <TextField value={item.menu_description} />
                                  </div>
                                ))
                              : null}
                          </td>

                          <td>
                            <TextField
                              select
                              fullWidth
                              name="menuId"
                              label="Menu Name"
                              autoComplete="given-name"
                              onChange={(e) => handleInputChanges(index, e.target.name, e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{ backgroundColor: 'white' }}
                            >
                              <MenuItem value={null}>
                                <em />
                              </MenuItem>
                              {/* Check if menuids is defined before mapping over it */}
                              {menuids &&
                                menuids.map((id, index) => (
                                  <MenuItem key={index} value={id.menu_id}>
                                    {id.menu_description}
                                  </MenuItem>
                                ))}
                            </TextField>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {showMenuLines && (
                <Grid item xs={2} style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
                    onClick={saveSubMenus}
                  >
                    Submit
                  </Button>

                  <Button
                    style={{ fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              )}
            </form>
          </div>
        </Grid>
      </Container>
    </>
  );
}
