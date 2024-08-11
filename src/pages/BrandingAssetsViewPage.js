/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { filter } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// @mui
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
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
import { useUser } from '../context/UserContext';
// components
import Scrollbar from '../components/scrollbar';
// sections
import {
  checkUserActionAssignment,
  deleteBankDepositAttachmentService,
  getAllCustomerService,
  getBankAccountsViewService,
  getBankBranchesByBankService,
  getBankListService,
  getBankReconIdDetails,
  getBrandingAssetsViewData,
  getDepositTypesService,
  getShopsListService,
  getUserProfileDetails,
  upldateBankDepositService,
  uploadBankDepositAttachmentService,
} from '../Services/ApiServices';
import Iconify from '../components/iconify';
// import DepositListToolbar from '../sections/@dashboard/deposits/depositListToolbar';
import { UserListHead } from '../sections/@dashboard/user';

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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-padding the month
  const day = String(date.getDate()).padStart(2, '0'); // Zero-padding the day

  // return `${day}/${month}/${year}`;
  return `${year}-${month}-${day}`;
}

function getFormattedDateWithTime(value) {
  const dateObject = new Date(value);

  // Extract date and time components
  const formattedDate = dateObject.toLocaleDateString();
  const formattedTime = dateObject.toLocaleTimeString();
  const date = new Date(formattedDate);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}    ${formattedTime}`;
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
  const [customerGroups, setCustomerGroups] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rowData, setRowData] = useState({});

  const { user } = useUser();
  console.log(user);

  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const handleOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(false);
  };

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

  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          const requestBody = {
            userId: account.user_id,
            actionId: 1,
          };
          const accountDetails = await checkUserActionAssignment(user, requestBody); // Call your async function here

          if (accountDetails.status === 200) {
            setCanEdit(accountDetails.data.value);
          } // Set the account details in the component's state
        }
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [account]);
  console.log(canEdit);

  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          console.log(account.user_id);
          const response = await getBrandingAssetsViewData(user);

          if (response.status === 200) {
            // const filteredList = response.data.filter((item) => item.status === 'RECONCILED');
            setUserList(response.data);
            const customerGroupList = [...new Set(response.data.map((obj) => obj.shop_name))];
            const customerList = [...new Set(response.data.map((obj) => obj.item_name))];
            setCustomerGroups(customerGroupList);
            setCustomers(customerList);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account]);
  console.log(USERLIST);

  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          const response = await getAllCustomerService(user);

          if (response.status === 200) {
            setCustomerList(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account]);
  console.log(customerList);

  const [depositTypeList, setDepositTypeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          const response = await getDepositTypesService(user);

          if (response.status === 200) {
            setDepositTypeList(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account]);
  console.log(depositTypeList);

  const [bankList, setBankList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getBankListService();

        if (response.status === 200) {
          setBankList(response.data);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);
  console.log(bankList);

  const [bankBranchList, setBankBranchList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        if (rowData.company_cust_bank_id) {
          const response = await getBankBranchesByBankService(rowData.company_cust_bank_id);

          if (response.status === 200) {
            setBankBranchList(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [rowData.company_cust_bank_id]);
  console.log(bankBranchList);

  const [customerBankAccountList, setCustomerBankAccountList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const response = await getBankAccountsViewService(user);

          if (response.status === 200) {
            setCustomerBankAccountList(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [user]);
  console.log(customerBankAccountList);

  const [bankReconIdAll, setBankReconIdAll] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const bankReconIdDetails = await getBankReconIdDetails(user); // Call your async function here
          if (bankReconIdDetails.status === 200) {
            setBankReconIdAll(bankReconIdDetails.data);
          } // Set the account details in the component's state
        }
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [user]);
  console.log(bankReconIdAll);

  const [shopDetails, setShopDetails] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getShopsListService(user);
        console.log(response.data);
        if (response) setShopDetails(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [user]);
  console.log(shopDetails);

  function getFormattedPrice(value) {
    const formattedPrice = new Intl.NumberFormat().format(value);
    console.log(parseInt(formattedPrice, 10));

    return formattedPrice;
  }
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [openForFilter, setOpenForFilter] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleCloseForFilter = () => {
  //   setOpenForFilter(false);
  // };

  const [imageSrc, setImageSrc] = useState(null);
  //

  let TABLE_HEAD = [];
  if (canEdit) {
    TABLE_HEAD = [
      { id: 'attachment', label: 'Division Name', alignRight: false },
      { id: 'status', label: 'District Name', alignRight: false },
      { id: 'remarks', label: 'Thana Name', alignRight: false },
      { id: 'deposit_date', label: 'Address', alignRight: false },
      { id: 'entry_date', label: 'Shop Name', alignRight: false },
      { id: 'entry_date', label: 'Brand Code', alignRight: false },
      { id: 'deposit_bank_account', label: 'Item Name', alignRight: false },
      { id: 'company_name', label: 'Item Category', alignRight: false },
      { id: 'customer_code', label: 'Remarks', alignRight: false },
      { id: 'edit', label: 'Edit', alignRight: false },
      // { id: '' },
    ];
  } else {
    TABLE_HEAD = [
      { id: 'attachment', label: 'Division Name', alignRight: false },
      { id: 'status', label: 'District Name', alignRight: false },
      { id: 'remarks', label: 'Thana Name', alignRight: false },
      { id: 'deposit_date', label: 'Address', alignRight: false },
      { id: 'entry_date', label: 'Shop Name', alignRight: false },
      { id: 'entry_date', label: 'Brand Code', alignRight: false },
      { id: 'deposit_bank_account', label: 'Item Name', alignRight: false },
      { id: 'company_name', label: 'Item Category', alignRight: false },
      { id: 'customer_code', label: 'Remarks', alignRight: false },
      { id: 'edit', label: 'Edit', alignRight: false },
      // { id: '' },
    ];
  }

  // const filteredStatusOptions = bankReconIdAll
  //   .filter((option) => option.short_name.toLowerCase().includes(inputValue.toLowerCase()))
  //   .map((option) => ({ value: option.short_name, label: option.short_name }));

  const filteredShopsOptions = shopDetails
    .filter((option) => option.shop_name.toLowerCase().includes(inputValue.toLowerCase()))
    .map((option) => ({ value: option.shop_name, label: option.shop_name }));

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const [filterInfo, setFilterInfo] = useState({
    shop: '',
  });

  const handleShopNameChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    filterInfo.shop = selectedOption.value;
  };

  const handleShopNameInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleClearDate = async () => {
    // Clear the shop filter
    setFilterInfo({
      shop: '',
    });

    // Reset the data in the table to show all records
    const response = await getBrandingAssetsViewData(user);
    if (response) setUserList(response.data);

    setOpenFilterDialog(false); // Close the dialog after clearing the filter
  };

  const handleDateFilter = async () => {
    let filteredData = USERLIST;

    // Apply filter based on selected shop
    if (filterInfo.shop) {
      filteredData = filteredData.filter((item) => item.shop_name === filterInfo.shop);
    }

    // Update the state with the filtered data
    setUserList(filteredData);
    setOpenFilterDialog(false); // Close the dialog after filtering
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  const exportData = filteredUsers.map((item) => ({
    'Division Name': item.division_name,
    'District Name': item.district_name,
    'Thana Name': item.thana_name,
    Address: item.address,
    'Shop Name': item.shop_name,
    'Brand Code': item.brand_code,
    'Item Name': item.item_name,
    'Item Category': item.item_category,
    Remarks: item.remarks,
  }));

  // edit features
  const [openEdit, setOpenEdit] = useState(false);

  const onValueChange = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const closeDialog = () => {
    setFilteredCustomerList([]);
    setShowFilteredCustomerList(false);

    setFilteredPaymentMethodList([]);
    setShowFilteredPaymentMethodList(false);

    setFilteredPaymentTypeList([]);
    setShowFilteredPaymentTypeList(false);

    setFilteredDepositorBankList([]);
    setShowFilteredDepositorBankList(false);

    setFilteredDepositorBankBranchList([]);
    setShowFilteredDepositorBankBranchList(false);

    setFilteredCompanyBankAccountList([]);
    setShowFilteredCompanyBankAccountList(false);

    setOpenEdit(false);
  };

  const openEditDialog = (event) => {
    console.log(event);
    setRowData(event);
    setOpenEdit(true);
  };

  const onEditDeposit = async () => {
    const requestBody = {
      depositDate: rowData.deposit_date,
      amount: rowData.amount,
      payFromCustomer: rowData.pay_from_customer,
      depositTypeId: rowData.deposit_type_id,
      depositorName: rowData.depositor_name,
      companyCustBankId: rowData.company_cust_bank_id,
      companyCustBankBranchId: rowData.company_cust_bank_branch_id,
      remittanceBankAccountId: rowData.remittance_bank_account_id,
      receiptNumber: rowData.receipt_number,
      invoiceNumber: rowData.invoice_number,
      uploadedFilename: rowData.uploaded_filename,
      remarks: rowData.remarks,
      lastUpdatedBy: user.user_id,
      cashReceiptId: rowData.cash_receipt_id,
    };
    const response = await upldateBankDepositService(user, requestBody);

    const alertMessage = response.status === 200 ? 'Updated successfully' : 'Process failed! Try again';
    alert(alertMessage);
    closeDialog();
  };

  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [showCustomerList, setShowFilteredCustomerList] = useState(false);

  const handleInputCustomerChange = (event) => {
    setShowFilteredCustomerList(true);

    const input = event.target.value;
    const name = 'customer_name';
    setRowData({ ...rowData, [name]: input });

    console.log(customerList);
    const filtered = customerList.filter((item) => item.full_name.toLowerCase().includes(input.toLowerCase()));
    console.log(filtered);
    setFilteredCustomerList(filtered);
  };

  const handleCustomerClick = (value) => {
    const cName = value.full_name;
    const cId = value.cust_account_id;

    const name1 = 'customer_name';
    const name2 = 'pay_from_customer';
    setRowData({
      ...rowData,
      [name1]: cName,
      [name2]: cId,
    });

    setShowFilteredCustomerList(false);
  };

  // payment method
  const paymentMethodList = [...new Set(depositTypeList.map((value) => value.deposit_type_name))];
  const [filteredPaymentMethodList, setFilteredPaymentMethodList] = useState([]);
  const [showPaymentMethodList, setShowFilteredPaymentMethodList] = useState(false);

  const handleInputPaymentMethodChange = (event) => {
    setShowFilteredPaymentMethodList(true);

    const input = event.target.value;
    const name = 'deposit_type_name';
    setRowData({ ...rowData, [name]: input });

    const filtered = paymentMethodList.filter((item) => item.toLowerCase().includes(input.toLowerCase()));
    console.log(filtered);
    setFilteredPaymentMethodList(filtered);
  };

  const handlePaymentMethodClick = (value) => {
    const name1 = 'deposit_type_name';
    setRowData({ ...rowData, [name1]: value });

    setShowFilteredPaymentMethodList(false);
  };

  // payment type
  const paymentTypeList = depositTypeList.filter((value) => value.deposit_type_name === rowData.deposit_type_name);
  const [filteredPaymentTypeList, setFilteredPaymentTypeList] = useState([]);
  const [showPaymentTypeList, setShowFilteredPaymentTypeList] = useState(false);

  const handleInputPaymentTypeChange = (event) => {
    setShowFilteredPaymentTypeList(true);

    const input = event.target.value;
    const name = 'deposit_type';
    setRowData({ ...rowData, [name]: input });

    const filtered = paymentTypeList.filter((item) => item.deposit_type.toLowerCase().includes(input.toLowerCase()));
    setFilteredPaymentTypeList(filtered);
  };

  const handlePaymentTypeClick = (value) => {
    const name1 = 'deposit_type';
    const name2 = 'deposit_type_id';
    setRowData({
      ...rowData,
      [name1]: value.deposit_type,
      [name2]: value.deposit_type_id,
    });

    setShowFilteredPaymentTypeList(false);
  };

  // depositor bank
  const [filteredDepositorBankList, setFilteredDepositorBankList] = useState([]);
  const [showDepositorBankList, setShowFilteredDepositorBankList] = useState(false);

  const handleInputDepositorBankChange = (event) => {
    setShowFilteredDepositorBankList(true);

    const input = event.target.value;
    const name = 'depositor_bank';
    setRowData({ ...rowData, [name]: input });

    const filtered = bankList.filter((item) => item.bank_name.toLowerCase().includes(input.toLowerCase()));
    setFilteredDepositorBankList(filtered);
  };

  const handleDepositorBankClick = (value) => {
    const name1 = 'depositor_bank';
    const name2 = 'company_cust_bank_id';
    setRowData({
      ...rowData,
      [name1]: value.bank_name,
      [name2]: value.bank_id,
    });

    setShowFilteredDepositorBankList(false);
  };

  // depositor bank Branch
  const [filteredDepositorBankBranchList, setFilteredDepositorBankBranchList] = useState([]);
  const [showDepositorBankBranchList, setShowFilteredDepositorBankBranchList] = useState(false);

  const handleInputDepositorBankBranchChange = (event) => {
    setShowFilteredDepositorBankBranchList(true);

    const input = event.target.value;
    const name = 'depositor_branch';
    setRowData({ ...rowData, [name]: input });

    const filtered = bankBranchList.filter((item) => item.bank_branch_name.toLowerCase().includes(input.toLowerCase()));
    setFilteredDepositorBankBranchList(filtered);
  };

  const handleDepositorBankBranchClick = (value) => {
    const name1 = 'depositor_branch';
    const name2 = 'company_cust_bank_branch_id';
    setRowData({
      ...rowData,
      [name1]: value.bank_branch_name,
      [name2]: value.bank_branch_id,
    });

    setShowFilteredDepositorBankBranchList(false);
  };

  // company bank account
  const [filteredCompanyBankAccountList, setFilteredCompanyBankAccountList] = useState([]);
  const [showCompanyBankAccountList, setShowFilteredCompanyBankAccountList] = useState(false);

  const handleInputCompanyBankAccountChange = (event) => {
    setShowFilteredCompanyBankAccountList(true);

    const input = event.target.value;
    const name = 'company_account';
    setRowData({ ...rowData, [name]: input });

    const list = customerBankAccountList.filter((value) => value.deposit_type_set_id === rowData.deposit_type_set_id);
    console.log(list);
    const filtered = list.filter((item) => item.bank_account_name.toLowerCase().includes(input.toLowerCase()));
    setFilteredCompanyBankAccountList(filtered);
  };

  const handleCompanyBankAccountClick = (value) => {
    const name1 = 'company_account';
    const name2 = 'remittance_bank_account_id';
    const name3 = 'company_bank';
    const name4 = 'company_name';
    setRowData({
      ...rowData,
      [name1]: value.bank_account_name,
      [name2]: value.bank_account_id,
      [name3]: value.bank_name,
      [name4]: value.company_name,
    });

    setShowFilteredCompanyBankAccountList(false);
  };

  // image upload and delete method
  const uplodPhoto = async (event, existedFileName) => {
    try {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        console.log('Selected file:', selectedFile);

        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadResponse = await uploadBankDepositAttachmentService(user, formData);
        console.log(uploadResponse.data);

        if (uploadResponse.status === 200) {
          const requestBody = {
            fileName: existedFileName,
          };
          const deleteResponse = await deleteBankDepositAttachmentService(user, requestBody);

          if (deleteResponse.status === 200) {
            const input = uploadResponse.data.value;
            const name = 'uploaded_filename';
            setRowData({ ...rowData, [name]: input });
          } else {
            throw new Error('File delete failed!');
          }
        } else {
          throw new Error('File upload failed!');
        }
      } else {
        throw new Error('File not selected!');
      }
    } catch (error) {
      console.log(error.message);
      alert('Process failed! Try again');
    }
  };

  return (
    <>
      <Helmet>
        <title> COMS | Branding Assets View Page </title>
      </Helmet>

      <div style={{ margin: '0 22px' }}>
        <Box position="relative" width="100%" height="100px">
          {' '}
          {/* Adjust height as needed */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
            }}
          >
            <CSVLink data={exportData} className="btn btn-success" style={{ width: '120px' }}>
              Export Table
            </CSVLink>
            <Button
              onClick={handleOpenFilterDialog}
              variant="contained"
              sx={{
                margin: 1,
              }}
            >
              Filter Criteria
            </Button>
          </Stack>
        </Box>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table ref={tableref}>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  enableReadonly
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      shop_id,
                      division_name,
                      district_name,
                      thana_name,
                      address,
                      shop_name,
                      brand_code,
                      item_name,
                      item_category,
                      remarks,
                    } = row;

                    const selectedUser = selected.indexOf(shop_id) !== -1;

                    return (
                      <TableRow hover key={shop_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {division_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {district_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {thana_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {address}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {shop_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {brand_code}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {item_name}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {item_category}
                        </TableCell>
                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                          {remarks}
                        </TableCell>

                        {canEdit && (
                          <TableCell padding="checkbox">
                            <IconButton size="large" color="primary" onClick={(e) => openEditDialog(row)}>
                              <Iconify icon={'tabler:edit'} />
                            </IconButton>
                          </TableCell>
                        )}
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

                <Dialog
                  open={openFilterDialog}
                  onClose={handleCloseFilterDialog}
                  sx={{ '& .MuiDialog-paper': { maxWidth: '100%', height: '250px' } }}
                >
                  <Stack />
                  <DialogContent>
                    <Stack spacing={1.5} direction="row">
                      <div className="col-auto" style={{ marginRight: '20px', display: 'flex' }}>
                        <div className="col-auto" style={{ display: 'flex', marginRight: '10px', width: 'auto' }}>
                          <span style={{ marginRight: '5px' }}>Shop Name</span>
                          <div style={{ width: '180px' }}>
                            <Select
                              value={filterInfo.shop ? { value: filterInfo.shop, label: filterInfo.shop } : null}
                              // value={selectedOption}
                              // onChange={onFilterDetails}
                              onChange={handleShopNameChange}
                              onInputChange={handleShopNameInputChange}
                              options={filteredShopsOptions}
                              placeholder="Type to select..."
                              isClearable
                            />
                          </div>
                        </div>
                        {/* <Button onClick={onFilterDate}>Filter</Button> */}
                      </div>
                    </Stack>
                    <Button onClick={handleDateFilter}>Filter</Button>
                    <Button onClick={handleClearDate}>Clear</Button>
                  </DialogContent>
                </Dialog>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </>
  );
}
