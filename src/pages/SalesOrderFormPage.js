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
  deleteSalesOrderHeaderService,
  deleteSalesOrderLinesService,
  getInventoryItemIdList,
  getUserProfileDetails
} from '../Services/ApiServices';
// ----------------------------------------------------------------------

export default function Page404() {
  const navigate = useNavigate();

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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
  const [showLines, setShowLines] = useState(false);
  const [headerDetails, setHeaderDetails] = useState({
    headerId: null,
    orderNumber: null,
  });

  const saveHeader = async () => {
    const requestBody = {
      orderedDate: getCurrentDate(),
      requestDate: headerInfo.requestDate ? headerInfo.requestDate : getCurrentDate(),
      paymentTermId: headerInfo.paymentTermId,
      createdBy: account.user_id,
      orderTypeId: headerInfo.orderTypeId,
      lastUpdatedBy: account.user_id,
      shippingMethodCode: headerInfo.shippingMethodCode,
      cancelledFlag: headerInfo.cancelledFlag === true ? 'Y' : 'N',
      bookedFlag: headerInfo.bookedFlag === true ? 'Y' : 'N',
      salesrepId: account.user_id,
      salesChannelCode: headerInfo.salesChannelCode,
      bookedDate: headerInfo.bookedDate ? headerInfo.bookedDate : getCurrentDate(),
    };
    console.log(requestBody);

    // if(headerDetails.headerId) {
    //   const response = await addSalesOrderHeaderService(requestBody);
    // }

    const response = await addSalesOrderHeaderService(requestBody);
    if (response.status === 200) {
      setHeaderDetails({
        headerId: response.data.headerInfo[0].header_id,
        orderNumber: response.data.headerInfo[0].order_number,
      });
      console.log(response.data);
    } else {
      alert('Process failed! Try again');
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
      selectedItemName: '',
      selectedItem: {},
      showList: false,
      lineId: null,
    },
  ]);

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
    setShowSaveLine(false);
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const [showApprovalButton, setShowApprovalButton] = useState(false);

  const submitRequisition = async () => {
    if (confirm('Are you sure for this requisition?')) {
      const requestBody = {
        pHierarchyId: 1,
        pTransactionId: 1,
        pTransactionNum: '1',
        pAppsUsername: 'asm',
      };
      const response = await callSoApprovalService(requestBody);

      if(response.status === 200) {
        alert("Successfull!");
        navigate('/dashboard/salesOrderForm', { replace: true });
      } else {
        alert("Process failed! Please try later");
      }
      // window.location.reload();
    }
  };

  const saveLines = async () => {
    const filteredArray = rows.filter((item) => Object.values(item).some((value) => value !== ''));
    console.log(filteredArray);

    filteredArray.forEach(async (lineInfo, index) => {
      const requestBody = {
        headerId: headerDetails.headerId,
        lineNumber: index + 1,
        inventoryItemId: lineInfo.selectedItem.inventory_item_id,
        creationDate: getCurrentDate(),
        createdBy: account.user_id,
        orderedItem: lineInfo.selectedItem.description,
        orderQuantityUom: lineInfo.selectedItem.primary_uom_code ? lineInfo.selectedItem.primary_uom_code : '',
        orderedQuantity: lineInfo.orderedQuantity,
        soldFromOrgId: lineInfo.soldFromOrgId,
        unitSellingPrice: lineInfo.unitSellingPrice,
      };
      console.log(requestBody);

      const response = await addSalesOrderLinesService(requestBody);

      if (response.status === 200) {
        console.log(response.data);

        setShowApprovalButton(true);
        handleInputChange(index, 'lineId', response.data.headerInfo[0].line_id);
        setShowSaveLine(true);
      } else {
        setShowApprovalButton(false);
      }
    });
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);
  const [showSaveLine, setShowSaveLine] = useState(false);

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

  const onChecked = (event) => {
    setHeaderInfo({ ...headerInfo, [event.target.name]: event.target.checked });
  };

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

    if (
      selectedLines.length === 0 &&
      rows.length > 0 &&
      !Object.values(rows[0]).every((value) => value === null || value === '')
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

  return (
    <>
      <Helmet>
        <title> OSMS | Sales Order Form </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Sales Order Form
          </Typography>
        </Stack>
        <div className="row g-3 align-items-center">
          <div className="col-auto" style={{ width: '160px' }}>
            <label htmlFor="orderNumber" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
              Order Number
              <input
                type="number"
                id="orderNumber"
                name="orderNumber"
                className="form-control"
                style={{ marginLeft: '7px' }}
                value={headerDetails.orderNumber}
                readOnly
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '221px' }}>
            <label htmlFor="orderedDate" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
              Ordered Date
              <input type="date" id="orderedDate" className="form-control" defaultValue={getCurrentDate()} readOnly />
            </label>
          </div>
          <div className="col-auto" style={{ width: '221px' }}>
            <label
              htmlFor="requestDate"
              className="col-form-label"
              style={{ display: 'flex', fontSize: '13px' }}
              onChange={(e) => onChangeHeader(e)}
            >
              Request Date
              <input
                type="date"
                id="requestDate"
                name="requestDate"
                className="form-control"
                defaultValue={getCurrentDate()}
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '180px' }}>
            <label htmlFor="paymentTermId" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
              Payment Term ID
              <input
                type="number"
                id="paymentTermId"
                name="paymentTermId"
                className="form-control"
                style={{ marginLeft: '7px' }}
                onChange={(e) => onChangeHeader(e)}
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '180px' }}>
            <label
              htmlFor="shippingMethodCode"
              className="col-form-label"
              style={{ display: 'flex', fontSize: '14px' }}
            >
              Shipping Method
              <input
                type="text"
                id="shippingMethodCode"
                name="shippingMethodCode"
                className="form-control"
                style={{ marginLeft: '7px' }}
                onChange={(e) => onChangeHeader(e)}
              />
            </label>
          </div>
          <div className="col-auto">
            <label htmlFor="cancelledFlag" className="col-form-label" style={{ display: 'flex', fontSize: '14px' }}>
              Cancelled
              <input
                type="checkbox"
                id="cancelledFlag"
                name="cancelledFlag"
                style={{ marginLeft: '7px' }}
                onChange={(e) => onChecked(e)}
                disabled
              />
            </label>
          </div>
          <div className="col-auto">
            <label htmlFor="bookedFlag" className="col-form-label" style={{ display: 'flex', fontSize: '14px' }}>
              Booked
              <input
                type="checkbox"
                id="bookedFlag"
                name="bookedFlag"
                style={{ marginLeft: '7px' }}
                // onChange={handleRowSelect}
                onChange={(e) => onChecked(e)}
                disabled
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '221px' }}>
            <label htmlFor="bookedDate" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
              Booked Date
              <input
                type="date"
                id="bookedDate"
                name="bookedDate"
                className="form-control"
                defaultValue={getCurrentDate()}
                onChange={(e) => onChangeHeader(e)}
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '200px' }}>
            <label htmlFor="salesPerson" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
              Sales Person
              <input
                type="text"
                id="salesPerson"
                name="salesPerson"
                className="form-control"
                style={{ marginLeft: '7px' }}
                defaultValue={account.full_name}
                readOnly
              />
            </label>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
                <Button
                  style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                  onClick={saveHeader}
                >
                  Save
                </Button>
                <Button
                  style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                  onClick={onClickDelete}
                >
                  Delete
                </Button>
                <Button style={{ backgroundColor: 'lightgray', color: 'black' }} onClick={handleAddRow}>
                  Add Lines
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
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
                  <th>Line Number</th>
                  <th>
                    Ordered Item <span style={{ color: 'red' }}>*</span>
                  </th>
                  <th>Order Quantity Uom</th>
                  <th>Ordered Quantity</th>
                  <th>Sold From Org ID</th>
                  <th>Unit Selling Price</th>
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
                      <td>
                        <input type="number" className="form-control" name="lineNumber" value={index + 1} readOnly />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          style={{ width: 'auto' }}
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
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="soldFromOrgId"
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="unitSellingPrice"
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </form>
        {showLines && (
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
        )}
      </Container>
    </>
  );
}
