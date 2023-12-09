/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Button, Container, Grid } from '@mui/material';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSystemItemsDetails } from '../../../Services/ApiServices';

export default function ResponsiveDialog() {
  const navigate = useNavigate();

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

  const [rows, setRows] = useState([]);
  const [showLines, setShowLines] = useState(false);

  const handleAddRow = () => {
    setShowLines(true);
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

  const handleClick = async () => {
    const filteredArray = rows.filter((item) => Object.values(item).some((value) => value !== '' && value !== null));
    console.log(filteredArray);

    for (const [index, lineInfo] of filteredArray.entries()) {
      try {
        const itemDetails = lineInfo;
        const currentDay = new Date().toJSON();

        const requestBody = {
          inventoryItemId: itemDetails.inventoryItemId,
          // organizationId: itemDetails.organizationId,
          inventoryItemCode: itemDetails.inventoryItemCode,
          description: itemDetails.description,
          primaryUomCode: itemDetails.primaryUomCode,
          primaryUnitOfMeasure: itemDetails.primaryUnitOfMeasure,
          lastUpdateDate: currentDay,
          lastUpdatedBy: 'Admin',
          creationDate: currentDay,
          createdBy: 'Admin',
          enabledFlag: itemDetails.enabledFlag,
          purchasingItemFlag: 'y',
          serviceItemFlag: 'y',
          inventoryItemFlag: 'y',
          startDateActive: itemDetails.startDateActive || null,
          endDateActive: itemDetails.endDateActive || null,
          buyerId: itemDetails.buyerId,
          minMinmaxQuantity: itemDetails.minMinmaxQuantity,
          maxMinmaxQuantity: itemDetails.maxMinmaxQuantity,
          minimumOrderQuantity: itemDetails.minimumOrderQuantity,
          maximumOrderQuantity: itemDetails.maximumOrderQuantity,
        };

        const response = await addSystemItemsDetails(requestBody);

        if (response.status === 200) {
          // alert('Successfully added!');
          filteredArray.splice(index, 1);
        } else {
          console.log(response);
          // alert('Process failed! Try again later');
        }
      } catch (err) {
        console.log(err.message);
        // alert('Process failed! Try again later');
      }
    }

    if (filteredArray.length === 0) {
      console.log(filteredArray);
      navigate('/dashboard/items', { replace: true });
      // window.location.reload();
    } else {
      setRows(filteredArray);
      alert('Process failed! Try again later');
      // window.location.reload();
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3} style={{ display: 'flex' }}>
          <Button style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }} onClick={handleClick}>
            Save
          </Button>
          <Button
            style={{ marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
            onClick={handleDeleteRows}
          >
            Delete
          </Button>
          <Button style={{ backgroundColor: 'lightgray', color: 'black' }} onClick={handleAddRow}>
            Add Lines
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
                <th>
                  {sentenceCase('inventory_item_id')} <span style={{ color: 'red' }}>*</span>
                </th>
                <th>
                  {sentenceCase('inventory_item_code')} <span style={{ color: 'red' }}>*</span>
                </th>
                <th>{sentenceCase('primary_uom_code')}</th>
                <th>{sentenceCase('primary_unit_of_measure')}</th>
                <th>
                  {sentenceCase('enabled_flag')} <span style={{ color: 'red' }}>*</span>
                </th>
                <th>{sentenceCase('start_date_active')}</th>
                <th>{sentenceCase('end_date_active')}</th>
                <th>{sentenceCase('buyer_id')}</th>
                <th>{sentenceCase('min_minmax_quantity')}</th>
                <th>{sentenceCase('max_minmax_quantity')}</th>
                <th>{sentenceCase('minimum_order_quantity')}</th>
                <th>{sentenceCase('maximum_order_quantity')}</th>
                <th>{sentenceCase('description')}</th>
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
                      <input
                        required
                        type="number"
                        name="inventoryItemId"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        required
                        name="inventoryItemCode"
                        className="form-control"
                        title="Maximum 40 characters are allowed."
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        name="primaryUomCode"
                        className="form-control"
                        title="Maximum 3 characters are allowed."
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        name="primaryUnitOfMeasure"
                        className="form-control"
                        title="Maximum 25 characters are allowed."
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        required
                        name="enabledFlag"
                        className="form-control"
                        title="Maximum 1 character is allowed."
                        style={{ backgroundColor: 'white' }}
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
                        type="number"
                        name="buyerId"
                        className="form-control"
                        title="Maximum 9 digits are allowed."
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="minMinmaxQuantity"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="maxMinmaxQuantity"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="minimumOrderQuantity"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="maximumOrderQuantity"
                        className="form-control"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                      />
                    </td>
                    <td>
                      <textarea
                        name="description"
                        className="form-control"
                        title="Maximum 240 characters are allowed."
                        style={{ height: '30px' }}
                        onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
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
