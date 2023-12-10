/* eslint-disable react/no-unknown-property */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable import/named */

import { Button, ButtonGroup, Container, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { addUserAssign, getFndUserIds, getMenuIds } from '../Services/ApiServices';

export default function MenuCreation() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [user, setUser] = useState('');
  const [showMenuLines, setShowMenuLines] = useState(false);
  const [showLines, setShowLines] = useState(true);

  const [list, setList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [tona, setTona] = useState();

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getFndUserIds();

        if (response.status === 200) {
          setList(response.data);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Extract user_name values from the list and setOriginalList
    setOriginalList(list.map((item) => item.user_name));
  }, [list]);

  useEffect(() => {
    // Set filteredList initially to originalList
    setFilteredList(originalList);
  }, [originalList]);

  const [menuids, setMenuIds] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMenuIds();
        console.log('hhh', response.data);
        if (response) setMenuIds(response.data);
        console.log(menuids);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  const [i, setI] = useState(false);
  const handleMenuItemClick = (selectedItem) => {
   
    const selectedUser = list.find((user) => user.user_name.toLowerCase() === selectedItem.toLowerCase());
    setUser(selectedUser.user_id)
    setUserInput(selectedItem);

    setFilteredList([]);
  };

  const handleInputChange = (e) => {
    setI(true);
    const input = e.target.value;
    console.log('ela', e.target.value);
    setUserInput(input);

    // Filter the original list based on the input
    const filtered = originalList.filter((item) => item.toLowerCase().includes(input.toLowerCase()));
    setFilteredList(filtered);
  };
  const [count, setCount] = useState(0);
  const saveSubMenus = async () => {
    console.log('menurows:', menurows.length);

    const filteredArray = menurows.filter((item) => Object.values(item).some((value) => value !== ''));

    let c;
    for (c = count; c < filteredArray.length; c++) {
      const lineInfo = filteredArray[c];

      const requestBody = {
        menuId: lineInfo.menuId,
        userId: lineInfo.userId,
      };

      const response = await addUserAssign(requestBody);

      if (response === 200) {
       
 
        setMenuRows([]);
        
      }
    }
    setCount(c);
    alert("Successfully added");
    navigate('/dashboard/showmenus');

    window.location.reload();
    
  };
  const [menurows, setMenuRows] = useState([
    {
      menuId: '',

      userId: user,
    },
  ]);
  const handleAddRow = () => {
    setMenuRows([
      ...menurows,
      {
        menuId: '',

        userId: user,
      },
    ]);
    console.log(menurows);
  };
  const handleInputChanges = (index, name, value) => {
    console.log('index', index);
    console.log('name', name);
    console.log('value', value);
    const updatedRows = [...menurows];
    updatedRows[index][name] = value;
    setMenuRows(updatedRows);
  };

  console.log('mm', menurows);

  return (
    <>
      <Helmet>
        <title> OSMS | System Menu </title>
      </Helmet>
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Assign Menu
          </Typography>
        </Stack>
        <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>
        

          <div>
            <form className="form-horizontal" style={{ marginTop: '3%', width: '400px' }}>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-highlight">
                  <thead>
                    <tr>
                      <th>
                        User ID <span style={{ color: 'red' }}>*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <input
                      type="text"
                      placeholder="Type User ID "
                      value={userInput}
                      onChange={handleInputChange}
                      style={{ marginTop: '18px' }}
                    />
                    {i === true && (
                      <ul style={{ marginTop: '18px' }}>
                        {filteredList.map((item, index) => (
                          <>
                            <MenuItem key={index} value={item} onClick={() => handleMenuItemClick(item)}>
                              {item}
                            </MenuItem>
                          </>
                        ))}
                      </ul>
                    )}
                      
            <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2} style={{marginTop:"5px"}}>
              <Button onClick={handleReload}>Add New User</Button>
              <Button
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  handleAddRow();

                  
                }}
              >
                Add Menu ID
              </Button>
            </ButtonGroup>
          
                  </tbody>
                </table>
              </div>
           
            </form>
          </div>

          <div>
            <form className="form-horizontal" style={{ marginTop: '4%', width: '300px' }}>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-highlight">
                  <thead>
                    <tr>
                      <th>
                        Menu Name <span style={{ color: 'red' }}>*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {showLines &&
                      menurows.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <TextField
                              select
                              fullWidth
                              name="menuId"
                              label="Menu Description"
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
                              {menuids.map((id, index) => (
                                <MenuItem key={index} value={id.menu_id}>
                                  {id.menu_description}
                                </MenuItem>
                              ))}
                            </TextField>
                          </td>
                          {/* <td>
                            <Button>
                              <AddIcon onClick={handleAddRow} />
                            </Button>
                          </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {showLines && (
                <Grid item xs={3}>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
                    <Button variant="contained" style={{ marginRight: '10px' }} onClick={saveSubMenus}>
                      Save Menu
                    </Button>
                  </ButtonGroup>
                </Grid>
              )}
            </form>
          </div>
        </Grid>
      </Container>
    </>
  );
}
