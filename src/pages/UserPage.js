import { filter } from 'lodash';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
// components
import Scrollbar from '../components/scrollbar';
// sections
// import { getLoggedInUserDetails, updateUserStatus } from '../Services/ApiServices';
// import { getUsersDetailsService } from '../Services/GetAllUsersDetails';
import { UserListHead } from '../sections/@dashboard/user';
// import AddUserDialog from '../sections/@dashboard/user/AddUserDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'age', label: 'Age', alignRight: false },
  // { id: '' },
];
const selectedUsers = [];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState({});

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, setUserList] = useState([]);

  const [isDisableApprove, setIsDisableApprove] = useState(false);

  const [isDisableBan, setIsDisableBan] = useState(false);

  const [selectedUserEmail, setSelectedUserEmail] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const [header, setHeader] = useState({});
  const onChangeHeader = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
    // setHeader(...header, event.target.value);
  };
  const onSerch = () => {
    console.log(header);
    setFilterName(header);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const users = [
    {
      name: 'abc', email: 'ttt', role: '1', address: 'somewhere', age: '33'
    },
    {
      name: 'www', email: 'ppp', role: '2', address: 'somewhere', age: '25'
    },
  ]

  function onFilter(order, orderBy) {
    const filteredData = order.filter(item =>
      Object.keys(orderBy).every(key =>
        String(item[key]).toLowerCase().includes(String(orderBy[key]).toLowerCase())
      )
    );
    console.log(filteredData);

    return filteredData;
  }

  const filteredUsers = onFilter(users, filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | OSMS </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          {/* <div style={{ display: displayAddUser }}>
            <AddUserDialog />
          </div> */}
        </Stack>

        <Grid container spacing={2} style={{marginBottom: '50px'}}>
          <Grid item xs={2}>
            <TextField
              name="name"
              label="Name"
              autoComplete="given-name"
              onChange={(e) => onChangeHeader(e)}
              // error={!!errors.uomClass}
              // helperText={errors.uomClass}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              name="role"
              label="Role"
              autoComplete="given-name"
              onChange={(e) => onChangeHeader(e)}
              // error={!!errors.uomClass}
              // helperText={errors.uomClass}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              name="age"
              label="Age"
              autoComplete="given-name"
              onChange={(e) => onChangeHeader(e)}
              // error={!!errors.uomClass}
              // helperText={errors.uomClass}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
              <Button onClick={onSerch}>
                Search
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Card>
          {/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selectedUsers={selected}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.map((row) => {
                    const { name, role, email, address, age } = row;
                    const selectedUser = selected.indexOf(email) !== -1;

                    return (
                      <TableRow hover key={name} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell> */}

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{address}</TableCell>

                        <TableCell align="left">
                            {age}
                        </TableCell>

                        {/* <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            // onClick={(event) => handleOpenMenu(event, status, email)}
                          >
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}

                        {/* <Popover
                          open={Boolean(open)}
                          anchorEl={open}
                          // onClose={handleCloseMenu}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem sx={{ color: 'success.main' }} disabled={isDisableApprove} onClick={approveUser}>
                            <Iconify icon={'mdi:approve'} sx={{ mr: 2 }} />
                            Appoved
                          </MenuItem>

                          <MenuItem sx={{ color: 'error.main' }} disabled={isDisableBan} onClick={banUser}>
                            <Iconify icon={'mdi:ban'} sx={{ mr: 2 }} />
                            Banned
                          </MenuItem>
                        </Popover> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

// import { useState } from 'react';
// import { Form, Table } from 'react-bootstrap';

// const SearchableTable = () => {
//   const [searchTerms, setSearchTerms] = useState([]);

//   const data = [
//     { id: 1, name: 'John Doe', age: 25 },
//     { id: 2, name: 'Jane abc', age: 30 },
//     { id: 3, name: 'Jane rr', age: 40 },
//     { id: 4, name: 'Jane pp', age: 50 },
//     { id: 5, name: 'Jane www', age: 35 },
//   ];

//   const filteredData = data.filter(item =>
//     searchTerms.every(searchTerm =>
//       Object.values(item).some(value =>
//         value.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     )
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerms(value ? value.split(',') : []);
//   };

//   return (
//     <div>
//       <Form.Group controlId="searchForm">
//         <Form.Control
//           type="text"
//           placeholder="Search by comma-separated values..."
//           value={searchTerms.join(',')}
//           onChange={handleSearchChange}
//         />
//       </Form.Group>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             {Object.keys(data[0]).map((key) => (
//               <th key={key}>{key}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((row, index) => (
//             <tr key={index}>
//               {Object.values(row).map((value, index) => (
//                 <td key={index}>{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default SearchableTable;
