/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { useUser } from '../../../context/UserContext';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import {
  approveBankDepositService,
  dowloadBankDepositReceiptService,
  getAllBankDepositsForAccountsService,
  getUserProfileDetails,
} from '../../../Services/ApiServices';
// import SystemItemListToolbar from '../sections/@dashboard/items/SystemItemListToolbar';
import { UserListHead } from '../user';
import DepositListToolbar from './depositListToolbar';

// ----------------------------------------------------------------------

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
  console.log(query);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    console.log(filter(array, (_user) => _user.search_all.toLowerCase().indexOf(query.toLowerCase()) !== -1));
    return filter(array, (_user) => _user.search_all.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function getFormattedDate(value) {
  const date = new Date(value);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export default function UserPage() {
  const tableref = useRef(null);

  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, setUserList] = useState([]);

  const { user } = useUser();
  console.log(user);

  const [account, setAccount] = useState({});
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
        if (account) {
          console.log(account.user_id);
          const response = await getAllBankDepositsForAccountsService(user);

          if (response.status === 200) {
            const filteredList = response.data.filter((item) => item.status === 'NEW' || item.status === 'REVERSED');
            setUserList(filteredList);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account]);
  console.log(USERLIST);

  function getFormattedPrice(value) {
    const formattedPrice = new Intl.NumberFormat().format(value);
    console.log(parseInt(formattedPrice, 10));

    return formattedPrice;
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [imageSrc, setImageSrc] = useState(null);
  const viewAttachment = async (value) => {
    try {
      const filename = value;
      const requestBody = {
        fileName: filename,
      };
      const response = await dowloadBankDepositReceiptService(user, requestBody);

      if (response.status === 200) {
        const base64String = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const dataURL = `data:image/jpeg;base64,${base64String}`;
        setImageSrc(dataURL);
      } else {
        console.log('Image download failed. Server returned status:', response.status);
      }
    } catch (error) {
      console.error('Error during image download:', error);
    } finally {
      setOpen(true); // This will be executed regardless of success or failure
    }
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableref.current,
    filename: 'sales_order_data',
    sheet: 'SalesOrderData',
  });

  const TABLE_HEAD = [
    { id: 'attachment', label: 'Receipt Attachment', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'deposit_date', label: 'Deposit Date', alignRight: false },
    { id: 'amount', label: sentenceCase('amount'), alignRight: true },
    { id: 'type', label: 'Deposit Type', alignRight: false },
    { id: 'company_bank_name', label: 'Company Bank', alignRight: false },
    { id: 'deposit_bank_account', label: 'Company Account', alignRight: false },
    { id: 'company_name', label: 'Company Name', alignRight: false },
    { id: 'deposit_bank', label: 'Deposit From Bank', alignRight: false },
    { id: 'deposit_bank_branch', label: 'Deposit From Branch', alignRight: false },
    { id: 'receipt_number', label: 'Receipt Number', alignRight: false },
    { id: 'customer', label: sentenceCase('customer'), alignRight: false },
    { id: 'employee_name', label: sentenceCase('Employee'), alignRight: false },
    { id: 'user_name', label: 'User Name', alignRight: false },
    { id: 'depositor', label: 'Depositor', alignRight: false },
    { id: 'remarks', label: 'Remarks', alignRight: false },
    { id: 'invoice_number', label: 'Invoice Number', alignRight: false },
    // { id: 'employee_name', label: 'Employee Name', alignRight: false },
    // { id: '' },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.cash_receipt_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    selectedUsers.push(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
    console.log(selected);
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

  const approveDeposits = async (deposits) => {
    if (deposits.length > 0) {
      try {
        const approvalPromises = deposits.map(async (element) => {
          const requestBody = {
            action: 'RECONCILED',
            cashReceiptId: element,
          };
          const response = await approveBankDepositService(user, requestBody);
        });

        await Promise.all(approvalPromises);
        window.location.reload();
      } catch (error) {
        console.error('Error during deposit approval:', error);
      }
    } else {
      alert('Please select atleast one deposit to approve');
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> COMS | Deposits </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          {/* <Typography variant="h4" gutterBottom>
            Deposit Collection List
          </Typography> */}
          <Button
            variant="text"
            startIcon={<Iconify icon="mdi:approve" />}
            color="primary"
            onClick={() => approveDeposits(selected)}
            style={{ backgroundColor: 'lightgray', color: 'black', padding: '9px' }}
          >
            Reconcile
          </Button>
          {/* <Button
            variant="text"
            startIcon={<Iconify icon="mdi:approve" />}
            color="primary"
            onClick={() => approveDeposits(selected)}
            style={{ backgroundColor: 'lightgray', color: 'black', padding: '9px' }}
          >
            Reject
          </Button> */}
          <Button
            startIcon={<Iconify icon="mdi-chevron-double-down" />}
            style={{ backgroundColor: 'lightgray', color: 'black', padding: '9px', textAlign: 'right' }}
            onClick={onDownload}
          >
            Export
          </Button>
        </Stack>

        <Card>
          <DepositListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selectedUsers={selected}
            enableDelete
            user={user}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table ref={tableref}>
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
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      amount,
                      cash_receipt_id,
                      company_account,
                      company_bank,
                      company_name,
                      deposit_date,
                      deposit_type_name,
                      depositor_bank,
                      depositor_branch,
                      depositor_name,
                      full_name,
                      receipt_number,
                      remarks,
                      status,
                      uploaded_filename,
                      user_name,
                      employee_name,
                      invoice_number,
                      customer_name,
                    } = row;

                    const selectedUser = selected.indexOf(cash_receipt_id) !== -1;
                    // const selectedUser = selected.findIndex((object) => object.itemId === cash_receipt_id) !== -1;

                    return (
                      <TableRow hover key={cash_receipt_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, cash_receipt_id)}
                            // onChange={(event) => handleClick(event, { itemId: cash_receipt_id })}
                          />
                        </TableCell>

                        <TableCell align="left">
                          <button style={{ width: '100%' }} onClick={() => viewAttachment(uploaded_filename)}>
                            view
                          </button>
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {status}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {getFormattedDate(deposit_date)}
                        </TableCell>
                        <TableCell align="right" style={{ whiteSpace: 'nowrap' }}>
                          {getFormattedPrice(amount)}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {deposit_type_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {company_bank}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {company_account}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {company_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {depositor_bank}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {depositor_branch}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {receipt_number}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {customer_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {employee_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {user_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {depositor_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {remarks}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {invoice_number}
                        </TableCell>
                        {/* <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {user_name}
                        </TableCell> */}
                        {/* <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {employee_name}
                        </TableCell> */}
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

                <Dialog open={open} onClose={handleClose}>
                  <Stack />
                  <DialogContent>
                    <Stack spacing={1.5} direction="row">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '400px' }}
                          loading="lazy"
                        />
                      ) : (
                        <CircularProgress />
                        // <p>No photo available</p>
                      )}
                    </Stack>
                  </DialogContent>
                </Dialog>
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
