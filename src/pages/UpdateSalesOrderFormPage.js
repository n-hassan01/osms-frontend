/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, ButtonGroup, Container, Grid, MenuItem, Stack, Typography } from '@mui/material';
import {
    // addSalesOrderHeaderService,
    updateSalesOrderHeaderService,
    addSalesOrderLinesService,
    callSoApprovalService,
    deleteSalesOrderLinesService,
    getInventoryItemIdList,
    getSalesOrderHeaderService,
    getSalesOrderLinesService,
    getUserProfileDetails,
} from '../Services/ApiServices';
// ----------------------------------------------------------------------

export default function Page404() {
  const navigate = useNavigate();
  const { header_id } = useParams();
  console.log('headerId', typeof header_id);

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getFormattedDate(value) {
    const date = new Date(value);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
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

  const [soHeaderDetails, setSoHeaderDetails] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSalesOrderHeaderService(parseInt(header_id, 10));
        if (response) setSoHeaderDetails(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);
  console.log('soHeaderDetails', soHeaderDetails);

  const [soLineDetails, setSoLineDetails] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSalesOrderLinesService(parseInt(header_id, 10));
        const updatedData = response.data.map((line) => ({
          ...line,
          selectedItemName: line.ordered_item,
          selectedItem: {},
          showList: false,
        }));
        console.log(updatedData);
        // if (response) setSoLineDetails(response.data);
        if (response) setSoLineDetails(updatedData);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);
  console.log('soLineDetails', soLineDetails);

  const [filteredItemList, setFilteredItemList] = useState([]);

//   const [headerInfo, setHeaderInfo] = useState({});
  const onChangeHeader = (e) => {
    setSoHeaderDetails({ ...soHeaderDetails, [e.target.name]: e.target.value });
  };
  const [showLines, setShowLines] = useState(true);
  const [headerDetails, setHeaderDetails] = useState({
    headerId: null,
    orderNumber: null,
  });

  const saveHeader = async () => {
    const requestBody = {
      shippingMethodCode: soHeaderDetails.shipping_method_code,
      description: soHeaderDetails.description,
    };
    console.log(requestBody);

    // if(headerDetails.headerId) {
    //   const response = await addSalesOrderHeaderService(requestBody);
    // }

    const response = await updateSalesOrderHeaderService(soHeaderDetails.header_id, requestBody);
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

  //   const [rows, setRows] = useState([
  //     {
  //       orderedItem: '',
  //       orderQuantityUom: '',
  //       orderedQuantity: null,
  //       soldFromOrgId: null,
  //       inventoryItemId: null,
  //       unitSellingPrice: null,
  //       selectedItemName: '',
  //       selectedItem: {},
  //       showList: false,
  //       lineId: null,
  //     },
  //   ]);

  //   const handleAddRow = () => {
  //     if (rows.length === 1) setShowLines(true);
  //     if (showLines) {
  //       setRows([
  //         ...rows,
  //         {
  //           orderedItem: '',
  //           orderQuantityUom: '',
  //           orderedQuantity: null,
  //           soldFromOrgId: null,
  //           inventoryItemId: null,
  //           unitSellingPrice: null,
  //           selectedItemName: '',
  //           selectedItem: {},
  //           showList: false,
  //           lineId: null,
  //         },
  //       ]);
  //     }
  //     console.log(rows);
  //   };

  const handleAddRow = () => {
    // if (rows.length === 1) setShowLines(true);
    if (showLines) {
      setSoLineDetails([
        ...soLineDetails,
        {
          line_id: null,
          org_id: null,
          header_id: null,
          line_type_id: null,
          line_number: null,
          ordered_item: '',
          request_date: null,
          promise_date: null,
          schedule_ship_date: null,
          order_quantity_uom: '',
          pricing_quantity: null,
          pricing_quantity_uom: null,
          cancelled_quantity: null,
          shipped_quantity: null,
          ordered_quantity: null,
          fulfilled_quantity: null,
          shipping_quantity: null,
          shipping_quantity_uom: null,
          delivery_lead_time: null,
          tax_exempt_flag: null,
          tax_exempt_number: null,
          tax_exempt_reason_code: null,
          ship_from_org_id: null,
          ship_to_org_id: null,
          invoice_to_org_id: null,
          deliver_to_org_id: null,
          ship_to_contact_id: null,
          deliver_to_contact_id: null,
          invoice_to_contact_id: null,
          sold_from_org_id: null,
          sold_to_org_id: null,
          cust_po_number: null,
          inventory_item_id: null,
          tax_date: null,
          tax_code: null,
          tax_rate: null,
          price_list_id: null,
          pricing_date: null,
          shipment_number: null,
          agreement_id: null,
          shipment_priority_code: null,
          shipping_method_code: null,
          freight_carrier_code: null,
          freight_terms_code: null,
          fob_point_code: null,
          tax_point_code: null,
          payment_term_id: null,
          invoicing_rule_id: null,
          accounting_rule_id: null,
          source_document_type_id: null,
          source_document_id: null,
          source_document_line_id: null,
          item_revision: null,
          unit_selling_price: null,
          unit_list_price: null,
          tax_value: null,
          creation_date: '',
          created_by: null,
          last_update_date: null,
          last_updated_by: null,
          last_update_login: null,
          sort_order: null,
          item_type_code: null,
          cancelled_flag: null,
          open_flag: '',
          booked_flag: '',
          salesrep_id: null,
          order_source_id: null,
          selectedItemName: '',
          selectedItem: {},
          showList: false,
        },
      ]);
    }
    // console.log(rows);
  };

  const handleInputChange = (index, name, value) => {
    setShowSaveLine(false);
    const updatedRows = [...soLineDetails];
    updatedRows[index][name] = value;
    setSoLineDetails(updatedRows);
  };

  //   const handleInputChange = (index, name, value) => {
  //     setShowSaveLine(false);
  //     const updatedRows = [...rows];
  //     updatedRows[index][name] = value;
  //     setRows(updatedRows);
  //   };

  const [showApprovalButton, setShowApprovalButton] = useState(false);

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
        navigate('/dashboard/salesOrderForm', { replace: true });
      } else {
        alert('Process failed! Please try later');
      }
      // window.location.reload();
    }
  };

  const saveLines = async () => {
    // const filteredArray = rows.filter((item) => Object.values(item).some((value) => value !== ''));
    const filteredArray = soLineDetails.filter((item) => Object.values(item).some((value) => value !== ''));
    console.log(filteredArray);

    filteredArray.forEach(async (lineInfo, index) => {
      const requestBody = {
        headerId: headerDetails.headerId,
        lineNumber: index + 1,
        inventoryItemId: lineInfo.selectedItem.inventory_item_id
          ? lineInfo.selectedItem.inventory_item_id
          : lineInfo.inventory_item_id,
        creationDate: getCurrentDate(),
        createdBy: account.user_id,
        orderedItem: lineInfo.selectedItem.description ? lineInfo.selectedItem.description : lineInfo.ordered_item,
        orderQuantityUom: lineInfo.selectedItem.primary_uom_code
          ? lineInfo.selectedItem.primary_uom_code
          : lineInfo.order_quantity_uom,
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
    const updatedRows = soLineDetails.filter((_, index) => !selectedRows.includes(index));
    setSoLineDetails(updatedRows);
    setSelectedRows([]);
  };

  //   const handleDeleteRows = () => {
  //     const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
  //     setRows(updatedRows);
  //     setSelectedRows([]);
  //   };

//   const onChecked = (event) => {
//     setHeaderInfo({ ...headerInfo, [event.target.name]: event.target.checked });
//   };

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
    // if (
    //   selectedLines.length === 0 &&
    //   rows.length > 0 &&
    //   !Object.values(rows[0]).every((value) => value === null || value === '')
    // ) {
    //   alert('Please select lines to delete');
    // } else if (selectedLines.length === 0 && rows.length === 0) {
    //   if (confirm('Are you sure to delete the requisition?')) {
    //     await deleteSalesOrderHeaderService(headerDetails.orderNumber);
    //     window.location.reload();
    //   }
    // } else if (selectedLines.length > 0 && rows.length > 0) {
    //   if (confirm('Are you sure to delete the lines?')) {
    //     handleDeleteLines();
    //     handleDeleteRows();
    //   }
    // }
  };

  // const [isReadOnly, setIsReadOnly] = useState(false);

  const handleInputItemChange = (index, event) => {
    const input = event.target.value;
    const name = 'selectedItemName';
    const show = 'showList';

    const updatedRows = [...soLineDetails];
    updatedRows[index][name] = input;
    updatedRows[index][show] = true;
    setSoLineDetails(updatedRows);
    console.log(soLineDetails);

    // Filter the original list based on the input
    console.log(inventoryItemIds);
    const filtered = inventoryItemIds.filter((item) => item.description.toLowerCase().includes(input.toLowerCase()));
    setFilteredItemList(filtered);
  };

  //   const handleInputItemChange = (index, event) => {
  //     const input = event.target.value;
  //     const name = 'selectedItemName';
  //     const show = 'showList';

  //     const updatedRows = [...rows];
  //     updatedRows[index][name] = input;
  //     updatedRows[index][show] = true;
  //     setRows(updatedRows);
  //     console.log(rows);

  //     // Filter the original list based on the input
  //     console.log(inventoryItemIds);
  //     const filtered = inventoryItemIds.filter((item) => item.description.toLowerCase().includes(input.toLowerCase()));
  //     setFilteredItemList(filtered);
  //   };

  const handleMenuItemClick = (index, item) => {
    const name = 'selectedItemName';
    const selected = 'selectedItem';
    const show = 'showList';

    const updatedRows = [...soLineDetails];
    updatedRows[index][name] = item.description;
    updatedRows[index][selected] = item;
    updatedRows[index][show] = false;
    setSoLineDetails(updatedRows);
    console.log(soLineDetails);
  };

  //   const handleMenuItemClick = (index, item) => {
  //     const name = 'selectedItemName';
  //     const selected = 'selectedItem';
  //     const show = 'showList';

  //     const updatedRows = [...rows];
  //     updatedRows[index][name] = item.description;
  //     updatedRows[index][selected] = item;
  //     updatedRows[index][show] = false;
  //     setRows(updatedRows);
  //     console.log(rows);
  //   };

  return (
    <>
      <Helmet>
        <title> OSMS | Sales Order Form </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Update Sales Order
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
                // value={headerDetails.orderNumber}
                value={soHeaderDetails.order_number}
                readOnly
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '221px' }}>
            <label htmlFor="orderedDate" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
              Ordered Date
              <input
                type="text"
                id="orderedDate"
                className="form-control"
                value={getFormattedDate(soHeaderDetails.ordered_date)}
                readOnly
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '180px' }}>
            <label
              htmlFor="shippingMethodCode"
              className="col-form-label"
              style={{ display: 'flex', fontSize: '14px' }}
            >
              Transport Type
              <input
                type="text"
                id="shippingMethodCode"
                name="shippingMethodCode"
                className="form-control"
                style={{ marginLeft: '7px' }}
                defaultValue={soHeaderDetails.shipping_method_code}
                onChange={(e) => onChangeHeader(e)}
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '390px' }}>
            <label htmlFor="description" className="col-form-label" style={{ display: 'flex', fontSize: '14px' }}>
              Description
              <textarea
                id="description"
                name="description"
                className="form-control"
                style={{ marginLeft: '7px', height: '30px', width: '390px' }}
                value={soHeaderDetails.description}
                onChange={(e) => {
                  onChangeHeader(e);
                }}
              />
            </label>
          </div>
          <div className="col-auto" style={{ width: '200px' }}>
            <label htmlFor="salesPerson" className="col-form-label" style={{ display: 'flex', fontSize: '13px' }}>
              Ordered By
              <input
                type="text"
                id="salesPerson"
                name="salesPerson"
                className="form-control"
                style={{ marginLeft: '7px' }}
                value={account.full_name}
                readOnly
              />
            </label>
          </div>
          {/* <Grid container spacing={2}>
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
          </Grid> */}
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
                        const allRowsSelected = selectedRows.length === soLineDetails.length;
                        const newSelectedRows = allRowsSelected ? [] : soLineDetails.map((_, index) => index);
                        // const allRowsSelected = selectedRows.length === rows.length;
                        // const newSelectedRows = allRowsSelected ? [] : rows.map((_, index) => index);
                        setSelectedRows(newSelectedRows);
                      }}
                      checked={selectedRows.length === soLineDetails.length && soLineDetails.length !== 0}
                      //   checked={selectedRows.length === rows.length && rows.length !== 0}
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
                  soLineDetails.map((row, index) => (
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
                          defaultValue={row.ordered_item}
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
                          name="primary_uom_code"
                          readOnly
                          value={row.selectedItem.primary_uom_code}
                          style={{ width: '80px', textAlign: 'center' }}
                          defaultValue={row.order_quantity_uom}
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="ordered_quantity"
                          defaultValue={row.ordered_quantity}
                          style={{ textAlign: 'right' }}
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      {/* <td>
                        <input
                          type="number"
                          className="form-control"
                          name="soldFromOrgId"
                          defaultValue={row.sold_from_org_id}
                          onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td> */}
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="unit_selling_price"
                          defaultValue={row.unit_selling_price}
                          style={{ textAlign: 'right' }}
                          readOnly
                          //   onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="unitSellingPrice"
                          style={{ textAlign: 'right' }}
                          value={row.ordered_quantity * row.unit_selling_price}
                          readOnly
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </form>
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
