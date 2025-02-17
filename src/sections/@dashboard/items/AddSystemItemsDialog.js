/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Button, Container, Grid, MenuItem, Select, Stack } from '@mui/material';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addSystemItemsChildDetails,
  addSystemItemsProcedureService,
  getItemCategoriesService,
  updateSystemItemService,
  uploadItemMasterImageService,
} from '../../../Services/ApiServices';
import { useUser } from '../../../context/UserContext';

export default function ResponsiveDialog() {
  const navigate = useNavigate();
  const { item } = useParams();
  const { user } = useUser();

  const [showLines, setShowLines] = useState(item !== 'null');

  const [itemCategories, setItemCategories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let response = {};
        if (user) response = await getItemCategoriesService(user); // Call your async function here
        if (response.status === 200) setItemCategories(response.data);
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [user]);
  console.log(itemCategories);

  let rowValue = {};
  if (item !== 'null') {
    console.log(item);
    // setShowLines(true);
    rowValue = JSON.parse(item);
  }
  console.log(rowValue);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);

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
  };

  const [rows, setRows] = useState([
    {
      inventoryItemId: rowValue.inventory_item_id,
      organizationId: rowValue.organization_id,
      inventoryItemCode: rowValue.inventory_item_code,
      description: rowValue.description,
      primaryUomCode: rowValue.primary_uom_code,
      primaryUnitOfMeasure: rowValue.primary_unit_of_measure,
      enabledFlag: rowValue.enabled_flag,
      startDateActive: rowValue.start_date_active,
      endDateActive: rowValue.end_date_active,
      buyerId: rowValue.buyer_id,
      minMinmaxQuantity: rowValue.min_minmax_quantity,
      maxMinmaxQuantity: rowValue.max_minmax_quantity,
      minimumOrderQuantity: rowValue.minimum_order_quantity,
      maximumOrderQuantity: rowValue.maximum_order_quantity,
    },
  ]);

  const handleAddRow = () => {
    if (rows.length === 1) setShowLines(true);
    if (showLines)
      setRows([
        ...rows,
        {
          inventoryItemId: null,
          organizationId: null,
          inventoryItemCode: '',
          description: '',
          primaryUomCode: '',
          primaryUnitOfMeasure: '',
          enabledFlag: '',
          startDateActive: '',
          endDateActive: '',
          buyerId: null,
          minMinmaxQuantity: null,
          maxMinmaxQuantity: null,
          minimumOrderQuantity: null,
          maximumOrderQuantity: null,
        },
      ]);
    console.log(rows);
  };

  const handleDeleteRows = () => {
    const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
    setRows(updatedRows);
    setSelectedRows([]);
  };

  const handleInputChange = (index, name, value) => {
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const [parentItem, setParentItem] = useState(rowValue);
  const handleParentInputChange = (event) => {
    setParentItem({ ...parentItem, [event.target.name]: event.target.value });
  };

  const onSubmitParent = () => {
    console.log(parentItem);
  };

  const uplodPhoto = async (event, index) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      console.log('Selected file:', selectedFile);

      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log(formData);

      const response = await uploadItemMasterImageService(user, formData);

      const imageFilename = response.data.value;
      console.log(event.target.name);
      if (event.target.name === 'parent') {
        const name = 'uploaded_filename';
        setParentItem({ ...parentItem, [name]: imageFilename });
      } else {
        const name = 'uploadedFilename';
        handleInputChange(index, name, imageFilename);
      }
    }
  };

  const newEntry = () => {
    setParentItem({});
    setRows([
      {
        inventoryItemId: rowValue.inventory_item_id,
        organizationId: rowValue.organization_id,
        inventoryItemCode: rowValue.inventory_item_code,
        description: rowValue.description,
        primaryUomCode: rowValue.primary_uom_code,
        primaryUnitOfMeasure: rowValue.primary_unit_of_measure,
        enabledFlag: rowValue.enabled_flag,
        startDateActive: rowValue.start_date_active,
        endDateActive: rowValue.end_date_active,
        buyerId: rowValue.buyer_id,
        minMinmaxQuantity: rowValue.min_minmax_quantity,
        maxMinmaxQuantity: rowValue.max_minmax_quantity,
        minimumOrderQuantity: rowValue.minimum_order_quantity,
        maximumOrderQuantity: rowValue.maximum_order_quantity,
      },
    ]);
  };

  const handleClick = async () => {
    const filteredArray = rows.filter((item) => Object.values(item).some((value) => value !== '' && value !== null));
    const currentDay = new Date().toJSON();

    try {
      if (parentItem.inventory_item_id) {
        const requestBody = {
          inventoryItemId: parentItem.inventory_item_id,
          inventoryItemCode: parentItem.inventory_item_code,
          description: parentItem.description,
          primaryUomCode: parentItem.primary_uom_code,
          startDateActive: parentItem.start_date_active,
          endDateActive: parentItem.end_date_active,
          categoryId: parentItem.category_id,
          pUploadedFilename: parentItem.uploaded_filename,
        };
        const response = await updateSystemItemService(user, requestBody);

        if (response.status === 200) {
          alert('Successfully updated!');
          navigate('/dashboard/items', { replace: true });
        } else {
          alert('Process failed! Try again');
        }
      } else {
        const requestBody = {
          inventoryItemCode: parentItem.inventory_item_code,
          description: parentItem.description,
          primaryUomCode: parentItem.primary_uom_code || '',
          startDateActive: parentItem.start_date_active || null,
          categoryId: parentItem.category_id,
          pUploadedFilename: parentItem.uploaded_filename || '',
        };
        const response = await addSystemItemsProcedureService(user, requestBody);

        if (response.status === 200) {
          const remainingItems = [];

          for (const lineInfo of filteredArray) {
            if (!lineInfo.inventoryItemCode) break;

            try {
              const itemDetails = lineInfo;
              console.log(itemDetails);

              const lineRequestBody = {
                organizationId: response.data.headerInfo[0].organization_id,
                parentInventoryItemId: response.data.headerInfo[0].inventory_item_id,
                inventoryItemCode: itemDetails.inventoryItemCode,
                description: itemDetails.description,
                primaryUomCode: response.data.headerInfo[0].primary_uom_code,
                lastUpdateDate: currentDay,
                lastUpdatedBy: 1,
                creationDate: currentDay,
                createdBy: 1,
                enabledFlag: itemDetails.enabledFlag || 'N',
                purchasingItemFlag: 'Y',
                serviceItemFlag: 'Y',
                inventoryItemFlag: 'Y',
                startDateActive: itemDetails.startDateActive || null,
                endDateActive: itemDetails.endDateActive || null,
                categoryId: response.data.headerInfo[0].category_id || null,
                uploadedFilename: itemDetails.uploadedFilename || '',
              };
              const lineResponse = await addSystemItemsChildDetails(user, lineRequestBody);

              if (lineResponse.status !== 200) {
                remainingItems.push(lineInfo);
                console.log(lineResponse);
                // alert('Process failed! Try again later');
              }
            } catch (err) {
              remainingItems.push(lineInfo);
              console.log(err.message);
              // alert('Process failed! Try again later');
            }
          }

          if (remainingItems.length === 0) {
            console.log(remainingItems);
            // navigate('/dashboard/items', { replace: true });
            // window.location.reload();
            alert('Successfully added!');
          } else {
            setRows(remainingItems);
            // alert('Process failed for some items! Try again later');
            // window.location.reload();
          }
          navigate('/dashboard/items', { replace: true });
        } else {
          console.log(response);

          alert('Process failed! Try again later');
        }
      }
    } catch (err) {
      console.log(err.message);
      alert('Process failed! Try again later');
    }
  };

  const [inputValue, setInputValue] = useState('');
  const handleItemCategoriesInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const filteredItemCategoriesOptions = itemCategories
    .filter((option) => option.segment2.toLowerCase().includes(inputValue.toLowerCase()))
    // .map((option) => ({ value: option.segment1, label: option.segment1 }));
    .map((option) => ({ value: option.category_id, label: option.segment2 }));

  return (
    <Container>
      <Stack direction="column">
        <Stack direction="row" spacing={2} mb={2}>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <span style={{ fontSize: '15px', whiteSpace: 'nowrap', marginRight: '5px' }}>Inventory Item Code*</span>
            <input
              required
              name="inventory_item_code"
              defaultValue={parentItem.inventory_item_code}
              className="form-control"
              title="Maximum 40 characters are allowed."
              style={{ backgroundColor: 'white', width: '150px', height: '38px' }}
              onChange={(e) => handleParentInputChange(e)}
            />
          </div>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <span style={{ fontSize: '15px', whiteSpace: 'nowrap', marginRight: '5px' }}>Description*</span>
            <textarea
              name="description"
              className="form-control"
              defaultValue={parentItem.description}
              title="Maximum 240 characters are allowed."
              style={{ height: 'auto', width: 'auto' }}
              onChange={(e) => handleParentInputChange(e)}
            />
          </div>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <span style={{ fontSize: '15px', whiteSpace: 'nowrap', marginRight: '5px' }}>Category*</span>
            <Select
              id="demo-simple-select"
              name="category_id"
              defaultValue={parentItem.category_id}
              style={{ marginLeft: '7px', height: '38px', width: '200px', backgroundColor: 'white' }}
              onChange={(e) => handleParentInputChange(e)}
            >
              {itemCategories.map((category, index) => (
                <MenuItem key={index} value={category.category_id}>
                  {category.segment2}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Stack>
        <Stack direction="row" spacing={2} mb={2}>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <span style={{ fontSize: '15px', whiteSpace: 'nowrap', marginRight: '5px' }}>UOM</span>
            <input
              name="primary_uom_code"
              className="form-control"
              defaultValue={parentItem.primary_uom_code}
              title="Maximum 3 characters are allowed."
              style={{ backgroundColor: 'white', width: '75px' }}
              onChange={(e) => handleParentInputChange(e)}
            />
          </div>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <span style={{ fontSize: '15px', whiteSpace: 'nowrap', marginRight: '5px' }}>Start Date Active</span>
            <input
              type="date"
              name="start_date_active"
              defaultValue={parentItem.start_date_active}
              className="form-control"
              style={{ backgroundColor: 'white' }}
              onChange={(e) => handleParentInputChange(e)}
            />
          </div>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <span style={{ fontSize: '15px', whiteSpace: 'nowrap', marginRight: '5px' }}>End Date Active</span>
            <input
              type="date"
              name="end_date_active"
              defaultValue={parentItem.end_date_active}
              className="form-control"
              style={{ backgroundColor: 'white' }}
              onChange={(e) => handleParentInputChange(e)}
            />
          </div>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <span style={{ fontSize: '15px', whiteSpace: 'nowrap', marginRight: '5px' }}>Upload image</span>
            <input
              type="file"
              name="parent"
              className="form-control"
              // defaultValue={parentItem.description}
              style={{ backgroundColor: 'white' }}
              onChange={(e) => uplodPhoto(e)}
            />
          </div>
        </Stack>
      </Stack>
      {/* </Grid> */}

      <Grid container spacing={2}>
        <Grid item xs={3} style={{ display: 'flex' }}>
          <Button
            style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black', whiteSpace: 'nowrap' }}
            onClick={handleClick}
          >
            Save
          </Button>
          <Button
            style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black', whiteSpace: 'nowrap' }}
            onClick={handleDeleteRows}
          >
            Delete
          </Button>
          <Button
            style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black', whiteSpace: 'nowrap' }}
            onClick={handleAddRow}
          >
            Add Lines
          </Button>
          <Button style={{ backgroundColor: 'lightgray', color: 'black', whiteSpace: 'nowrap' }} onClick={newEntry}>
            New Item
          </Button>
        </Grid>
      </Grid>

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
                {/* <th style={{ whiteSpace: 'nowrap' }}>
                  {sentenceCase('inventory_item_id')} <span style={{ color: 'red' }}>*</span>
                </th> */}
                <th style={{ whiteSpace: 'nowrap', width: '150px' }}>
                  {sentenceCase('inventory_item_code')} <span style={{ color: 'red' }}>*</span>
                </th>
                <th style={{ whiteSpace: 'nowrap', width: '250px' }}>{sentenceCase('description')}</th>
                {/* <th style={{ whiteSpace: 'nowrap', width: '250px' }}>{sentenceCase('Category')}</th>
                <th style={{ whiteSpace: 'nowrap', width: '75px' }}>UOM</th> */}
                <th style={{ whiteSpace: 'nowrap', width: '125px' }}>
                  {sentenceCase('enabled_flag')} <span style={{ color: 'red' }}>*</span>
                </th>
                <th style={{ whiteSpace: 'nowrap' }}>{sentenceCase('start_date_active')}</th>
                <th style={{ whiteSpace: 'nowrap' }}>{sentenceCase('end_date_active')}</th>
                <th style={{ whiteSpace: 'nowrap' }}>{sentenceCase('upload_image')}</th>
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
                      <input
                        required
                        type="number"
                        name="inventoryItemId"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        value={row.inventoryItemId}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td> */}
                    <td>
                      <input
                        required
                        name="inventoryItemCode"
                        className="form-control"
                        title="Maximum 40 characters are allowed."
                        style={{ backgroundColor: 'white', width: '150px' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <textarea
                        name="description"
                        className="form-control"
                        title="Maximum 240 characters are allowed."
                        style={{ height: '30px', width: '250px' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    {/* <td style={{ width: '250px' }}>
                      <Select
                        // value={selectedItemCategories}
                        // onChange={handleItemCategoriesChange}
                        onInputChange={handleItemCategoriesInputChange}
                        options={filteredItemCategoriesOptions}
                        placeholder="Type to select..."
                        isClearable
                        style={{ width: '250px' }}
                      />
                    </td>
                    <td>
                      <input
                        name="primaryUomCode"
                        className="form-control"
                        title="Maximum 3 characters are allowed."
                        style={{ backgroundColor: 'white', width: '75px' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td> */}
                    <td>
                      <input
                        required
                        name="enabledFlag"
                        className="form-control"
                        title="Maximum 1 character is allowed."
                        style={{ backgroundColor: 'white', width: '125px' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="startDateActive"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="endDateActive"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name="child"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => uplodPhoto(e, index)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </form>
    </Container>
  );
}
