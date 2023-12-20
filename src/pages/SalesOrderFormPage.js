/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Button, ButtonGroup, Container, Grid, MenuItem, Stack, Typography } from '@mui/material';
import {
  addSalesOrderHeaderService,
  addSalesOrderLinesService,
  callSoApprovalService,
  createSalesOrderNumberService,
  deleteSalesOrderHeaderService,
  deleteSalesOrderLinesService,
  getInventoryItemIdList,
  getUserProfileDetails,
  updateSalesOrderHeaderService,
  updateSalesOrderLineService,
} from '../Services/ApiServices';
// ----------------------------------------------------------------------

export default function Page404() {
  const navigate = useNavigate();
  const [transporttype, setTransporttype] = useState('');

  const handleChange = (event) => {
    setTransporttype(event.target.value);
  };

  function getCurrentDate() {
    const now = new Date();
    // const year = now.getFullYear();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    // return `${year}-${month}-${day}`;
    return `${day}/${month}/${year}`;
  }

  function getFormattedDate(value) {
    const date = new Date(value);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  // const [showSaveLine, setShowSaveLine] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);

  const [account, setAccount] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const accountDetails = await getUserProfileDetails(); // Call your async function here
        if (accountDetails.status === 200)
          setAccount(accountDetails.data); // Set the account details in the component's state
        else navigate('/login');
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, []);
  console.log(account);

  const [salesOrderNumber, setSalesOrderNumber] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await createSalesOrderNumberService(); // Call your async function here
        if (response.status === 200) setSalesOrderNumber(response.data.fn_create_so_number); // Set the account details in the component's state
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, []);
  console.log(salesOrderNumber);

  const [inventoryItemIds, setInventoryItemIds] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getInventoryItemIdList();
        if (response) setInventoryItemIds(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);
  console.log(inventoryItemIds);

  const [filteredItemList, setFilteredItemList] = useState([]);

  const [headerInfo, setHeaderInfo] = useState({});
  const onChangeHeader = (e) => {
    setHeaderInfo({ ...headerInfo, [e.target.name]: e.target.value });
  };
  const [showLines, setShowLines] = useState(true);
  const [headerDetails, setHeaderDetails] = useState({
    headerId: null,
    orderNumber: null,
  });

  const saveLines = async (value) => {
    console.log(value);
    const filteredArray = rows.filter((item) => Object.values(item).some((value) => value !== ''));
    console.log(filteredArray);

    filteredArray.forEach(async (lineInfo, index) => {
      if (lineInfo.lineId) {
        const requestBody = {
          inventoryItemId: lineInfo.selectedItem.inventory_item_id,
          orderedItem: lineInfo.selectedItem.description,
          orderQuantityUom: lineInfo.selectedItem.primary_uom_code ? lineInfo.selectedItem.primary_uom_code : '',
          orderedQuantity: lineInfo.orderedQuantity,
          unitSellingPrice: lineInfo.unitSellingPrice,
          totalPrice: lineInfo.orderedQuantity * lineInfo.unitSellingPrice,
        };
        console.log(requestBody);

        const response = await updateSalesOrderLineService(lineInfo.lineId, requestBody);

        if (response.status === 200) {
          console.log(response.data);

          alert('saved');
          setShowApprovalButton(false);
          // handleInputChange(index, 'lineId', response.data.headerInfo[0].line_id);
          // setShowSaveLine(true);
        } else {
          setShowApprovalButton(true);
        }
      } else {
        const requestBody = {
          headerId: value,
          lineNumber: index + 1,
          inventoryItemId: lineInfo.selectedItem.inventory_item_id,
          // creationDate: getCurrentDate(),
          createdBy: account.user_id,
          orderedItem: lineInfo.selectedItem.description,
          orderQuantityUom: lineInfo.selectedItem.primary_uom_code ? lineInfo.selectedItem.primary_uom_code : '',
          orderedQuantity: lineInfo.orderedQuantity,
          soldFromOrgId: lineInfo.soldFromOrgId,
          unitSellingPrice: lineInfo.unitSellingPrice,
          totalPrice: lineInfo.orderedQuantity * lineInfo.unitSellingPrice,
        };
        console.log(requestBody);

        const response = await addSalesOrderLinesService(requestBody);

        if (response.status === 200) {
          console.log(response.data);

          alert('saved');
          setShowApprovalButton(false);
          handleInputChange(index, 'lineId', response.data.headerInfo[0].line_id);
          // setShowSaveLine(true);
        } else {
          setShowApprovalButton(true);
        }
      }
    });
  };

  const saveHeader = async () => {
    if (headerDetails.headerId) {
      const requestBody = {
        lastUpdatedBy: account.user_id,
        shippingMethodCode: headerInfo.shippingMethodCode,
        description: headerInfo.description,
      };
      console.log(requestBody);

      const response = await updateSalesOrderHeaderService(headerDetails.headerId, requestBody);
      if (response.status === 200) {
        console.log(response.data);
        saveLines(headerDetails.headerId);
      } else {
        alert('Process failed! Try again');
      }
    } else {
      const requestBody = {
        orderNumber: salesOrderNumber,
        // requestDate: headerInfo.requestDate ? headerInfo.requestDate : getCurrentDate(),
        // paymentTermId: headerInfo.paymentTermId,
        createdBy: account.user_id,
        // orderTypeId: headerInfo.orderTypeId,
        lastUpdatedBy: account.user_id,
        shippingMethodCode: headerInfo.shippingMethodCode,
        // cancelledFlag: headerInfo.cancelledFlag === true ? 'Y' : 'N',
        // bookedFlag: headerInfo.bookedFlag === true ? 'Y' : 'N',
        salesrepId: account.user_id,
        // salesChannelCode: headerInfo.salesChannelCode,
        // bookedDate: headerInfo.bookedDate ? headerInfo.bookedDate : getCurrentDate(),
        description: headerInfo.description,

        shipTo: headerInfo.shipTo,
        specialDiscount: headerInfo.specialDiscount,
        specialAdjustment: headerInfo.specialAdjustment,
        totalPrice: sumTotalPrice,
      };
      console.log(requestBody);

      const response = await addSalesOrderHeaderService(requestBody);
      if (response.status === 200) {
        setHeaderDetails({
          headerId: response.data.headerInfo[0].header_id,
          orderNumber: response.data.headerInfo[0].order_number,
          // orderNumber: response.data.headerInfo[0].order_number,
        });
        console.log(response.data);
        saveLines(response.data.headerInfo[0].header_id);
      } else {
        alert('Process failed! Try again');
      }
    }
  };

  const [rows, setRows] = useState([
    {
      orderedItem: '',
      orderQuantityUom: '',
      orderedQuantity: null,
      soldFromOrgId: null,
      inventoryItemId: null,
      unitSellingPrice: null,
      totalPrice: '',
      selectedItemName: '',
      selectedItem: {},
      showList: false,
      lineId: null,
    },
  ]);

  let sumTotalPrice = 0;
  rows.forEach((element) => {
    sumTotalPrice += element.unitSellingPrice * element.orderedQuantity;
  });
  console.log(sumTotalPrice);

  const handleAddRow = () => {
    if (rows.length === 1) setShowLines(true);
    if (showLines) {
      setRows([
        ...rows,
        {
          orderedItem: '',
          orderQuantityUom: '',
          orderedQuantity: null,
          soldFromOrgId: null,
          inventoryItemId: null,
          unitSellingPrice: null,
          totalPrice: '',
          selectedItemName: '',
          selectedItem: {},
          showList: false,
          lineId: null,
        },
      ]);
    }
    console.log(rows);
  };

  const handleInputChange = (index, name, value) => {
    // setShowSaveLine(false);
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const [showApprovalButton, setShowApprovalButton] = useState(true);

  const submitRequisition = async () => {
    if (confirm('Are you sure for this requisition?')) {
      const requestBody = {
        pHierarchyId: 1,
        pTransactionId: headerDetails.headerId,
        pTransactionNum: headerDetails.orderNumber.toString(),
        pAppsUsername: account.full_name,
      };
      const response = await callSoApprovalService(requestBody);

      if (response.status === 200) {
        alert('Successfull!');
        setShowApprovalButton(true);
        navigate('/dashboard/salesOrderForm', { replace: true });
        // window.location.reload();
      } else {
        // alert('Process failed! Please try later');
        alert('Process failed! Please try later');
      }
    }
  };

  // Function to handle row selection
  const handleRowSelect = (index, row) => {
    console.log(row);
    const updatedSelectedLines = [...selectedLines];
    const lineIndex = updatedSelectedLines.indexOf(row.lineId);

    const updatedSelectedRows = [...selectedRows];
    const rowIndex = updatedSelectedRows.indexOf(index);

    if (rowIndex === -1) {
      updatedSelectedRows.push(index);
    } else {
      updatedSelectedRows.splice(rowIndex, 1);
    }

    if (lineIndex === -1) {
      updatedSelectedLines.push(row.lineId);
    } else {
      updatedSelectedLines.splice(lineIndex, 1);
    }

    setSelectedRows(updatedSelectedRows);
    setSelectedLines(updatedSelectedLines);

    console.log(selectedLines);
  };

  const handleDeleteRows = () => {
    const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
    setRows(updatedRows);
    setSelectedRows([]);
  };

  // const onChecked = (event) => {
  //   setHeaderInfo({ ...headerInfo, [event.target.name]: event.target.checked });
  // };

  const handleDeleteLines = () => {
    console.log(selectedLines);
    selectedLines.forEach(async (line) => {
      console.log(line);
      await deleteSalesOrderLinesService(line);
    });
    setSelectedLines([]);
  };

  const onClickDelete = async () => {
    // const isEmptyObject =
    //   Object.values(rows[0]).every((value) => value === null || value === '') &&
    //   !Object.values(headerDetails).every((value) => value === null);

    // console.log(isEmptyObject);
    console.log(selectedRows);

    if (
      selectedLines.length === 0 &&
      rows.length > 0 &&
      !Object.values(rows[0]).every((value) => value === null || value === '' || value === false)
    ) {
      alert('Please select lines to delete');
    } else if (selectedLines.length === 0 && rows.length === 0) {
      if (confirm('Are you sure to delete the requisition?')) {
        await deleteSalesOrderHeaderService(headerDetails.orderNumber);
        window.location.reload();
      }
    } else if (selectedLines.length > 0 && rows.length > 0) {
      if (confirm('Are you sure to delete the lines?')) {
        handleDeleteLines();
        handleDeleteRows();
      }
    }
  };

  // const [isReadOnly, setIsReadOnly] = useState(false);

  const handleInputItemChange = (index, event) => {
    const input = event.target.value;
    const name = 'selectedItemName';
    const show = 'showList';

    const updatedRows = [...rows];
    updatedRows[index][name] = input;
    updatedRows[index][show] = true;
    setRows(updatedRows);
    console.log(rows);

    // Filter the original list based on the input
    console.log(inventoryItemIds);
    const filtered = inventoryItemIds.filter((item) => item.description.toLowerCase().includes(input.toLowerCase()));
    setFilteredItemList(filtered);
  };

  const handleMenuItemClick = (index, item) => {
    const name = 'selectedItemName';
    const selected = 'selectedItem';
    const show = 'showList';

    const updatedRows = [...rows];
    updatedRows[index][name] = item.description;
    updatedRows[index][selected] = item;
    updatedRows[index][show] = false;
    setRows(updatedRows);
    console.log(rows);
  };

  console.log(showApprovalButton);

  return (
    <>
      <Helmet>
        <title> OSMS | Sales Order Form </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Create Customer Order
          </Typography>
        </Stack>
        <div className="row g-3 align-items-center">
          <Stack direction="row" alignItems="center" justifyContent="flex-start">
            <div className="col-auto" style={{ width: '160px', marginRight: '15px' }}>
              <label htmlFor="orderNumber" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
                Order Number
                <input
                  type="number"
                  id="orderNumber"
                  name="orderNumber"
                  className="form-control"
                  style={{ marginLeft: '7px', width: '100px' }}
                  value={headerDetails.orderNumber}
                  readOnly
                />
              </label>
            </div>
            <div className="col-auto" style={{ width: '160px', marginRight: '15px' }}>
              <label htmlFor="orderedDate" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
                Ordered Date
                <input type="text" id="orderedDate" className="form-control" defaultValue={getCurrentDate()} readOnly />
              </label>
            </div>

            <div className="col-auto" style={{ width: '430px' }}>
              <label htmlFor="shipTo" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
                Ship to
                <input
                  type="text"
                  id="shipTo"
                  name="shipTo"
                  className="form-control"
                  style={{ marginLeft: '5px' }}
                  onChange={(e) => onChangeHeader(e)}
                />
              </label>
            </div>
            <div className="col-auto" style={{ width: '180px', marginLeft: '10px' }}>
              <label
                htmlFor="shippingMethodCode"
                className="col-form-label"
                style={{ display: 'flex', fontSize: '13px' }}
              >
                Transport Type
                <select
                  id="shippingMethodCode"
                  name="shippingMethodCode"
                  className="form-control"
                  style={{ marginLeft: '7px' }}
                  onChange={(e) => onChangeHeader(e)}
                >
                  <option value="Self">Self</option>
                  <option value="Company">Company</option>
                  <option value="Rental">Rental</option>
                  <option value="Courier">Courier</option>
                </select>
              </label>
            </div>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="flex-start">
            <div className="col-auto" style={{ width: '180px', marginRight: '15px' }}>
              <label htmlFor="specialDiscount" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
                Special discount
                <input
                  type="number"
                  id="specialDiscount"
                  name="specialDiscount"
                  className="form-control"
                  style={{ marginLeft: '7px' }}
                  onChange={(e) => onChangeHeader(e)}
                />
              </label>
            </div>
            <div className="col-auto" style={{ width: '180px', marginRight: '15px' }}>
              <label
                htmlFor="specialAdjustment"
                className="col-form-label"
                style={{ display: 'flex', fontSize: '13px' }}
              >
                Special adjustment
                <input
                  type="number"
                  id="specialAdjustment"
                  name="specialAdjustment"
                  className="form-control"
                  style={{ marginLeft: '7px' }}
                  onChange={(e) => onChangeHeader(e)}
                  // value={getFormattedDate(soHeaderDetails.total_price)}
                />
              </label>
            </div>
            <div className="col-auto" style={{ width: '500px' }}>
              <label htmlFor="description" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
                Description
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  style={{ marginLeft: '7px', height: '30px', width: '390px' }}
                  onChange={(e) => {
                    onChangeHeader(e);
                  }}
                />
              </label>
            </div>
          </Stack>
        </div>

        <form className="form-horizontal" style={{ marginTop: '20px' }}>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-highlight">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={() => {
                        // Select or deselect all rows
                        const allRowsSelected = selectedRows.length === rows.length;
                        const newSelectedRows = allRowsSelected ? [] : rows.map((_, index) => index);
                        setSelectedRows(newSelectedRows);
                      }}
                      checked={selectedRows.length === rows.length && rows.length !== 0}
                    />
                  </th>
                  {/* <th>Line Number</th> */}
                  <th style={{ width: '420px' }}>
                    Item <span style={{ color: 'red' }}>*</span>
                  </th>
                  <th style={{ width: '80px', textAlign: 'center' }}>UOM</th>
                  <th style={{ textAlign: 'right' }}>
                    Quantity <span style={{ color: 'red' }}>*</span>
                  </th>
                  {/* <th>Sold From Org ID</th> */}
                  <th style={{ textAlign: 'right' }}>Unit Price</th>
                  <th style={{ textAlign: 'right' }}>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {showLines &&
                  rows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleRowSelect(index, row)}
                          checked={selectedRows.includes(index)}
                        />
                      </td>
                      {/* <td>
                        <input type="number" className="form-control" name="lineNumber" value={index + 1} readOnly />
                      </td> */}
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          style={{ width: '420px' }}
                          value={row.selectedItemName}
                          onChange={(e) => handleInputItemChange(index, e)}
                        />
                        {row.showList && (
                          <ul style={{ marginTop: '18px' }}>
                            {filteredItemList.map((item, itemIndex) => (
                              <>
                                <MenuItem key={itemIndex} value={item} onClick={() => handleMenuItemClick(index, item)}>
                                  {item.description}
                                </MenuItem>
                              </>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="orderQuantityUom"
                          style={{ width: '80px', textAlign: 'center' }}
                          readOnly
                          value={row.selectedItem.primary_uom_code}
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="orderedQuantity"
                          style={{ textAlign: 'right' }}
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      {/* <td>
                        <input
                          type="number"
                          className="form-control"
                          name="soldFromOrgId"
                          style={{ textAlign: 'right' }}
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td> */}
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="unitSellingPrice"
                          style={{ textAlign: 'right' }}
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="totalPrice"
                          style={{ textAlign: 'right' }}
                          value={row.orderedQuantity * row.unitSellingPrice}
                          // onClick={(e) => handleInputChange(index, e.target.name, e.target.value)}
                          readOnly
                        />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td style={{ textAlign: 'right' }}>{sumTotalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
              <Button
                style={{ whiteSpace: 'nowrap', marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                onClick={saveHeader}
              >
                Save
              </Button>
              <Button
                style={{ whiteSpace: 'nowrap', marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                onClick={onClickDelete}
              >
                Delete
              </Button>
              <Button
                style={{ whiteSpace: 'nowrap', backgroundColor: 'lightgray', color: 'black' }}
                onClick={handleAddRow}
              >
                Add Lines
              </Button>
              <Button
                style={{
                  whiteSpace: 'nowrap',
                  // display: showApprovalButton,
                  marginLeft: '10px',
                  backgroundColor: 'lightgray',
                  color: 'black',
                }}
                // disabled={showApprovalButton}
                onClick={submitRequisition}
              >
                Approval
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        {/* {showLines && (
          <Grid item xs={3}>
            <Button
              style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
              onClick={saveLines}
              disabled={showSaveLine}
            >
              Save
            </Button>
            {showApprovalButton && (
              <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
                <Button
                  style={{ display: { showApprovalButton }, backgroundColor: 'lightgray', color: 'black' }}
                  onClick={submitRequisition}
                >
                  Approval
                </Button>
              </ButtonGroup>
            )}
          </Grid>
        )} */}
      </Container>
    </>
  );
}
