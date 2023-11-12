import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonGroup, Container, Grid, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
// components
// import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function Page404() {
  const [headerInfo, setHeaderInfo] = useState([{ expanded: false }]);
  const [sections, setSections] = useState([{ expanded: false }]);

  const expandLines = (index) => {
    console.log(index);
    const updatedSections = [...sections];
    console.log(updatedSections);
    updatedSections[index] = { expanded: true };
    console.log(updatedSections);
    setSections(updatedSections);
    console.log(sections);
  };

  const onChange = () => {};
  const saveHeader = () => {};

  return (
    <>
      <Helmet>
        <title> OSMS | Requisition </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Requisition Form
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {/* <Grid item xs={1.5}>
            <TextField
              required
              name="requestNumber"
              label="Request Number"
              autoComplete="given-name"
              // onChange={(e) => onValueChange(e)}
              // error={!!errors.unitOfMeasure}
              // helperText={errors.unitOfMeasure}
            />
          </Grid> */}
          <Grid item xs={2}>
            <TextField
              type="number"
              name="transactionTypeId"
              label="Transaction Type ID"
              autoComplete="given-name"
              // onChange={(e) => onValueChange(e)}
              // error={!!errors.uomCode}
              // helperText={errors.uomCode}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              name="moveOrderType"
              label="Move Order Type"
              autoComplete="given-name"
              // onChange={(e) => onValueChange(e)}
              // error={!!errors.uomClass}
              // helperText={errors.uomClass}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              type="number"
              name="organizationId"
              label="Organization ID"
              autoComplete="given-name"
              // onChange={(e) => onValueChange(e)}
              // error={!!errors.uomClass}
              // helperText={errors.uomClass}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="fromSubinventoryCode"
              label="From Subinventory Code"
              autoComplete="given-name"
              // onChange={(e) => onValueChange(e)}
              // error={!!errors.uomClass}
              // helperText={errors.uomClass}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="toSubinventoryCode"
              label="To Subinventory Code"
              autoComplete="given-name"
              // onChange={(e) => onValueChange(e)}
              // error={!!errors.uomClass}
              // helperText={errors.uomClass}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="date"
              name="dateRequired"
              label="Date Required"
              //   onChange={(e) => onValueChange(e)}
              //   error={!!errors.startDateActive}
              //   helperText={errors.startDateActive}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextareaAutosize
              name="description"
              placeholder="Description.."
              autoComplete="given-name"
              // onChange={(e) => onValueChange(e)}
              // error={!!errors.description}
              // helperText={errors.description}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
              <Button onClick={() => saveHeader}>
                Save
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        {sections.map((section, index) => (
          <div key={index}>
            {section.expanded && (
              <Grid container spacing={2} style={{ marginTop: '2px' }}>
                <Grid item xs={2}>
                  <TextField
                    required
                    type="number"
                    name="headerId"
                    label="Header ID"
                    autoComplete="given-name"
                    // onChange={(e) => onValueChange(e)}
                    // error={!!errors.uomCode}
                    // helperText={errors.uomCode}
                  />
                </Grid>
                {/* <Grid item xs={2}>
                  <TextField
                    required
                    type="number"
                    name="headerId"
                    label="Header ID"
                    autoComplete="given-name"
                    // onChange={(e) => onValueChange(e)}
                    // error={!!errors.uomCode}
                    // helperText={errors.uomCode}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    required
                    type="number"
                    name="lineNumber"
                    label="Line Number"
                    autoComplete="given-name"
                    // onChange={(e) => onValueChange(e)}
                    // error={!!errors.uomClass}
                    // helperText={errors.uomClass}
                  />
                </Grid> */}
                <Grid item xs={2}>
                  <TextField
                    required
                    type="number"
                    name="inventoryItemId"
                    label="Inventory Item ID"
                    autoComplete="given-name"
                    // onChange={(e) => onValueChange(e)}
                    // error={!!errors.uomClass}
                    // helperText={errors.uomClass}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="fromSubinventoryCode"
                    label="From Subinventory Code"
                    //   onChange={(e) => onValueChange(e)}
                    //   error={!!errors.startDateActive}
                    //   helperText={errors.startDateActive}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    required
                    name="uomCode"
                    label="Uom Code"
                    autoComplete="given-name"
                    // onChange={(e) => onValueChange(e)}
                    // error={!!errors.uomClass}
                    // helperText={errors.uomClass}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    name="requiredQuantity"
                    label="Required Quantity"
                    autoComplete="given-name"
                    // onChange={(e) => onValueChange(e)}
                    // error={!!errors.uomClass}
                    // helperText={errors.uomClass}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    required
                    type="date"
                    name="dateRequired"
                    label="Date Required"
                    //   onChange={(e) => onValueChange(e)}
                    //   error={!!errors.startDateActive}
                    //   helperText={errors.startDateActive}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </div>
        ))}
        <form className="form-horizontal" style={{marginTop: '20px'}}>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-highlight">
              <thead>
                <tr>
                  <th>Inventory Item ID</th>
                  <th>From Subinventory Code</th>
                  <th>Uom Code</th>
                  <th>Required Quantity</th>
                  <th>Date Required</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select className="form-control" name="inventoryItemId">
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" className="form-control" name="fromSubinventoryCode" />
                  </td>
                  <td>
                    <select className="form-control" name="uomCode">
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </td>
                  <td>
                    <input type="number" className="form-control" name="requiredQuantity" />
                  </td>
                  <td>
                    <input type="date" className="form-control" name="dateRequired" />
                  </td>
                  <td>
                    {/* <Iconify icon={'mdi:approve'} sx={{ mr: 3 }} /> */}
                    {/* <input type="text" className="form-control"/> */}
                    <Button>
                      <AddIcon />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </Container>
    </>
  );
}
