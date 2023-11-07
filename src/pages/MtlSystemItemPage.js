/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { sentenceCase } from 'change-case';
import { format } from 'date-fns';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { getSytemItems, updateSystemItems } from '../Services/ApiServices';
import AddSystemItemsDialog from '../sections/@dashboard/items/AddSystemItemsDialog';
import SystemItemListToolbar from '../sections/@dashboard/items/SystemItemListToolbar';
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.inventory_item_id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, setUserList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersDetails = await getSytemItems();

        if (usersDetails) {
          const systemItems = usersDetails.data.results.map((data) => updateSystemItemsInfo(data));
          setUserList(systemItems);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  function updateSystemItemsInfo(data) {
    if (data.last_update_date) {
      const date = new Date(data.last_update_date);

      data.last_update_date = format(date, 'yyyy-MM-dd');
    }

    if (data.creation_date) {
      const date = new Date(data.creation_date);

      data.creation_date = format(date, 'yyyy-MM-dd');
    }

    if (data.start_date_active) {
      const date = new Date(data.start_date_active);

      data.start_date_active = format(date, 'yyyy-MM-dd');
    }

    if (data.end_date_active) {
      const date = new Date(data.end_date_active);

      data.end_date_active = format(date, 'yyyy-MM-dd');
    }

    return data;
  }

  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const [rowData, setRowData] = useState(null);

  const onValueChange = (e) => {
    console.log(rowData);
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const handleClickOpen = (row) => {
    console.log(row);
    setRowData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isDisable = true;
  const validateInventoryItemCode = (password) => password.length <= 40;
  const validatePrimaryUomCode = (password) => password.length <= 3;
  const ValidatePrimaryUnitOfMeasure = (password) => password.length <= 25;
  const validateDescription = (password) => password.length <= 240;
  // const validateEnabledFlag = (inputValue) => inputValue.length > 1;
  const validateBuyerId = (inputValue) => inputValue <= 999999999;

  const handleEdit = async () => {
    const {
      inventory_item_id,
      organization_id,
      inventory_item_code,
      description,
      primary_uom_code,
      primary_unit_of_measure,
      // enabled_flag,
      start_date_active,
      end_date_active,
      buyer_id,
      min_minmax_quantity,
      max_minmax_quantity,
      minimum_order_quantity,
      maximum_order_quantity,
    } = rowData;

    const newErrors = {};
    // Validate inventory_item_code
    if (!validateInventoryItemCode(inventory_item_code) || !inventory_item_code) {
      newErrors.inventory_item_code = !inventory_item_code
        ? 'Inventory_Item_Code is required'
        : 'Inventory_Item_Code must be maximum 40 characters long';
    }

    // Validate primary_uom_code
    if (primary_uom_code && !validatePrimaryUomCode(primary_uom_code)) {
      newErrors.primary_uom_code = 'Primary Uom Code must be maximum 3 characters long';
    }

    // Validate primary_unit_of_measure
    if (primary_unit_of_measure && !ValidatePrimaryUnitOfMeasure(primary_unit_of_measure)) {
      newErrors.primary_unit_of_measure = 'Primary_Unit_Of_Measure must be maximum 25 characters long';
    }

    // Validate description
    if (description && !validateDescription(description)) {
      newErrors.description = 'Description must be maximum 240 characters long';
    }

    // Validate buyerId
    if (buyer_id && !validateBuyerId(buyer_id)) {
      newErrors.buyer_id = 'Buyer Id must be maximum 9 digits long';
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const currentDay = new Date().toJSON();

        const requestBody = {
          inventoryItemId: inventory_item_id,
          organizationId: organization_id,
          inventoryItemCode: inventory_item_code,
          description: rowData.description ? rowData.description : '',
          primaryUomCode: primary_uom_code,
          primaryUnitOfMeasure: primary_unit_of_measure,
          lastUpdateDate: currentDay,
          lastUpdatedBy: 'Admin',
          // enabledFlag: enabled_flag,
          startDateActive: start_date_active || null,
          endDateActive: end_date_active || null,
          buyerId: buyer_id,
          minMinmaxQuantity: min_minmax_quantity,
          maxMinmaxQuantity: max_minmax_quantity,
          minimumOrderQuantity: minimum_order_quantity,
          maximumOrderQuantity: maximum_order_quantity,
        };

        const response = await updateSystemItems(requestBody);

        if (response.status === 200) {
          alert('Successfully updated!');
        } else {
          console.log(response);
          alert('Process failed! Try again later');
        }

        handleClose();
        navigate('/items', { replace: true });
        window.location.reload();
        console.log(requestBody);
      } catch (err) {
        console.log(err.message);
        alert('Process failed! Try again later');
      }
    } else {
      setErrors(newErrors);
    }
  };

  // const TABLE_HEAD = Object.keys(USERLIST[0]).map((column => ({id: column, label: sentenceCase(column), alignRight: false})));
  // TABLE_HEAD.push({id: ''})
  const TABLE_HEAD = [
    { id: 'inventory_item_id', label: sentenceCase('inventory_item_id'), alignRight: false },
    { id: 'organization_id', label: sentenceCase('organization_id'), alignRight: false },
    { id: 'inventory_item_code', label: sentenceCase('inventory_item_code'), alignRight: false },
    { id: 'description', label: sentenceCase('description'), alignRight: false },
    { id: 'primary_uom_code', label: sentenceCase('primary_uom_code'), alignRight: false },
    { id: 'primary_unit_of_measure', label: sentenceCase('primary_unit_of_measure'), alignRight: false },
    { id: 'enabled_flag', label: sentenceCase('enabled_flag'), alignRight: false },
    { id: 'start_date_active', label: sentenceCase('start_date_active'), alignRight: false },
    { id: 'end_date_active', label: sentenceCase('end_date_active'), alignRight: false },
    { id: 'buyer_id', label: sentenceCase('buyer_id'), alignRight: false },
    { id: 'min_minmax_quantity', label: sentenceCase('min_minmax_quantity'), alignRight: false },
    { id: 'max_minmax_quantity', label: sentenceCase('max_minmax_quantity'), alignRight: false },
    { id: 'minimum_order_quantity', label: sentenceCase('minimum_order_quantity'), alignRight: false },
    { id: 'maximum_order_quantity', label: sentenceCase('maximum_order_quantity'), alignRight: false },
    { id: '' },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => {
        const ss = { itemId: n.inventory_item_id, orgId: n.organization_id };
        return ss;
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.inventory_item_id);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    selectedUsers.push(name);
    let newSelected = [];
    newSelected = newSelected.concat(selected, name);

    setSelected(newSelected);
  };
  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   console.log(name);
  //   console.log(selectedIndex);
  //   selectedUsers.push(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  //   console.log(typeof selectedUsers);
  // };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> OSMS | System Items </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mtl System Items
          </Typography>
          <div>
            <AddSystemItemsDialog />
          </div>
        </Stack>

        <Card>
          <SystemItemListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selectedUsers={selected}
          />

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
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      inventory_item_id,
                      organization_id,
                      inventory_item_code,
                      description,
                      primary_uom_code,
                      primary_unit_of_measure,
                      enabled_flag,
                      start_date_active,
                      end_date_active,
                      buyer_id,
                      min_minmax_quantity,
                      max_minmax_quantity,
                      minimum_order_quantity,
                      maximum_order_quantity,
                    } = row;

                    const rowValues = [
                      inventory_item_id,
                      organization_id,
                      inventory_item_code,
                      description,
                      primary_uom_code,
                      primary_unit_of_measure,
                      enabled_flag,
                      start_date_active,
                      end_date_active,
                      buyer_id,
                      min_minmax_quantity,
                      max_minmax_quantity,
                      minimum_order_quantity,
                      maximum_order_quantity,
                    ];
                    // const selectedUser = selected.indexOf(inventory_item_id) !== -1;
                    // const selectedUser = selected.indexOf(inventory_item_id) !== -1 && selected.indexOf(organization_id) !== -1;
                    // const selectedUser = selected.indexOf({ itemId: inventory_item_id, orgId: organization_id }) !== -1;
                    const selectedUser =
                      selected.findIndex(
                        (object) => object.itemId === inventory_item_id && object.orgId === organization_id
                      ) !== -1;

                    return (
                      <TableRow hover key={inventory_item_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUser}
                            // onChange={(event) => handleClick(event, inventory_item_id)}
                            onChange={(event) =>
                              handleClick(event, { itemId: inventory_item_id, orgId: organization_id })
                            }
                          />
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, inventory_item_id)} /> */}
                        </TableCell>

                        {rowValues.map((value) => (
                          <TableCell align="left">{value}</TableCell>
                        ))}

                        <TableCell padding="checkbox">
                          <IconButton size="large" color="primary" onClick={() => handleClickOpen(row)}>
                            <Iconify icon={'tabler:edit'} />
                          </IconButton>
                        </TableCell>
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

                {rowData && (
                  <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                    <DialogContent>
                      <Stack spacing={3}>
                        <TextField
                          required
                          disabled={isDisable}
                          type="number"
                          name="inventory_item_id"
                          label={sentenceCase('inventory_item_id')}
                          value={rowData.inventory_item_id}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.inventoryItemId}
                          helperText={errors.inventoryItemId}
                        />

                        <TextField
                          required
                          disabled={isDisable}
                          type="number"
                          name="organization_id"
                          label={sentenceCase('organization_id')}
                          value={rowData.organization_id}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.organizationId}
                          helperText={errors.organizationId}
                        />

                        <TextField
                          required
                          name="inventory_item_code"
                          label={sentenceCase('inventory_item_code')}
                          autoComplete="given-name"
                          value={rowData.inventory_item_code}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.inventoryItemCode}
                          helperText={errors.inventoryItemCode}
                        />

                        <TextareaAutosize
                          name="description"
                          placeholder="Description.."
                          autoComplete="given-name"
                          value={rowData.description}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.description}
                          helperText={errors.description}
                        />

                        <TextField
                          name="primary_uom_code"
                          label={sentenceCase('primary_uom_code')}
                          autoComplete="given-name"
                          value={rowData.primary_uom_code}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.primaryUomCode}
                          helperText={errors.primaryUomCode}
                        />

                        <TextField
                          name="primary_unit_of_measure"
                          label={sentenceCase('primary_unit_of_measure')}
                          autoComplete="given-name"
                          value={rowData.primary_unit_of_measure}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.primaryUnitOfMeasure}
                          helperText={errors.primaryUnitOfMeasure}
                        />

                        <TextField
                          required
                          disabled={isDisable}
                          name="enabled_flag"
                          label={sentenceCase('enabled_flag')}
                          autoComplete="given-name"
                          value={rowData.enabled_flag}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.enabledFlag}
                          helperText={errors.enabledFlag}
                        />

                        <TextField
                          type="date"
                          name="start_date_active"
                          label={sentenceCase('start_date_active')}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.startDateActive}
                          helperText={errors.startDateActive}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={rowData.start_date_active}
                        />

                        <TextField
                          type="date"
                          name="end_date_active"
                          label={sentenceCase('end_date_active')}
                          value={rowData.end_date_active}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.endDateActive}
                          helperText={errors.endDateActive}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                        <TextField
                          type="number"
                          name="buyer_id"
                          label={sentenceCase('buyer_id')}
                          value={rowData.buyer_id}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.buyerId}
                          helperText={errors.buyerId}
                        />

                        <TextField
                          type="number"
                          name="min_minmax_quantity"
                          label={sentenceCase('min_minmax_quantity')}
                          value={rowData.min_minmax_quantity}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.minMinmaxQuantity}
                          helperText={errors.minMinmaxQuantity}
                        />

                        <TextField
                          type="number"
                          name="max_minmax_quantity"
                          label={sentenceCase('max_minmax_quantity')}
                          value={rowData.max_minmax_quantity}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.maxMinmaxQuantity}
                          helperText={errors.maxMinmaxQuantity}
                        />

                        <TextField
                          type="number"
                          name="minimum_order_quantity"
                          label={sentenceCase('minimum_order_quantity')}
                          value={rowData.minimum_order_quantity}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.minimumOrderQuantity}
                          helperText={errors.minimumOrderQuantity}
                        />

                        <TextField
                          type="number"
                          name="maximum_order_quantity"
                          label={sentenceCase('maximum_order_quantity')}
                          value={rowData.maximum_order_quantity}
                          onChange={(e) => onValueChange(e)}
                          error={!!errors.maximumOrderQuantity}
                          helperText={errors.maximumOrderQuantity}
                        />
                      </Stack>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleEdit}>
                        Submit
                      </Button>
                      <Button onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
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
