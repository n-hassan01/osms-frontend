import { Stack, TextField, TextareaAutosize } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSystemItemsDetails } from '../../../Services/ApiServices';
import Iconify from '../../../components/iconify';

export default function ResponsiveDialog() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [errors, setErrors] = useState({});

  const initialValue = {
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
  };
  const [itemDetails, setItemDetails] = useState(initialValue);

  const validateInventoryItemId = (inputValue) => inputValue <= 999999999999999;
  const validateInventoryItemCode = (inputValue) => inputValue.length <= 40;
  const validateDescription = (inputValue) => inputValue.length <= 240;
  const validateEnabledFlag = (inputValue) => inputValue.length > 1;
  const validateBuyerId = (inputValue) => inputValue <= 999999999;

  const onValueChange = (e) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    const {
      inventoryItemId,
      inventoryItemCode,
      primaryUomCode,
      description,
      primaryUnitOfMeasure,
      enabledFlag,
      buyerId,
    } = itemDetails;
    const newErrors = {};

    // Validate inventoryItemId
    if (!inventoryItemId || !validateInventoryItemId(inventoryItemId)) {
      newErrors.inventoryItemId = !inventoryItemId
        ? 'Inventory Item Code is required'
        : 'Inventory Item Code must be maximum 15 digits long';
    }

    // Validate inventoryItemCode
    if (!validateInventoryItemCode(inventoryItemCode) || !inventoryItemCode) {
      newErrors.inventoryItemCode = !inventoryItemCode
        ? 'Inventory Item Code is required'
        : 'Inventory Item Code must be maximum 40 characters long';
    }

    // Validate description
    if (description && !validateDescription(description)) {
      newErrors.description = 'Description must be maximum 240 characters long';
    }

    // Validate primaryUomCode
    if (primaryUomCode && !validateDescription(primaryUomCode)) {
      newErrors.primaryUomCode = 'Primary Uom Code must be maximum 25 characters long';
    }

    // Validate primaryUnitOfMeasure
    if (primaryUnitOfMeasure && !validateDescription(primaryUnitOfMeasure)) {
      newErrors.primaryUnitOfMeasure = 'Primary Unit Of Measure must be maximum 25 characters long';
    }

    // Validate buyerId
    if (buyerId && !validateBuyerId(buyerId)) {
      newErrors.buyerId = 'Buyer Id must be maximum 9 digits long';
    }

    // Validate enabledFlag
    if (validateEnabledFlag(enabledFlag) || !enabledFlag) {
      newErrors.enabledFlag = !enabledFlag
        ? 'Inventory Item Code is required'
        : 'Inventory Item Code should be either y or n';
    }

    console.log(newErrors);
    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      try {
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

        console.log(requestBody);

        if (response.status === 200) {
          alert('Successfully added!');
        } else {
          console.log(response);
          alert('Process failed! Try again later');
        }

        handleClose();
        navigate('/items', { replace: true });
        window.location.reload();
      } catch (err) {
        console.log(err.message);
        alert('Process failed! Try again later');
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        color="primary"
        onClick={handleClickOpen}
      >
        Add System Items
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        {/* <DialogTitle id="responsive-dialog-title">{'Add New itemDetails'}</DialogTitle> */}
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              required
              type="number"
              name="inventoryItemId"
              label={sentenceCase('inventory_item_id')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.inventoryItemId}
              helperText={errors.inventoryItemId}
            />

            {/* <TextField
              required
              type="number"
              name="organizationId"
              label={sentenceCase('organization_id')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.organizationId}
              helperText={errors.organizationId}
            /> */}

            <TextField
              required
              name="inventoryItemCode"
              label={sentenceCase('inventory_item_code')}
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.inventoryItemCode}
              helperText={errors.inventoryItemCode}
            />

            <TextareaAutosize
              name="description"
              placeholder="Description.."
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.description}
              helperText={errors.description}
            />

            <TextField
              name="primaryUomCode"
              label={sentenceCase('primary_uom_code')}
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.primaryUomCode}
              helperText={errors.primaryUomCode}
            />

            <TextField
              name="primaryUnitOfMeasure"
              label={sentenceCase('primary_unit_of_measure')}
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.primaryUnitOfMeasure}
              helperText={errors.primaryUnitOfMeasure}
            />

            <TextField
              required
              name="enabledFlag"
              label={sentenceCase('enabled_flag')}
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.enabledFlag}
              helperText={errors.enabledFlag}
            />

            <TextField
              type="date"
              name="startDateActive"
              label={sentenceCase('start_date_active')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.startDateActive}
              helperText={errors.startDateActive}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              type="date"
              name="endDateActive"
              label={sentenceCase('end_date_active')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.endDateActive}
              helperText={errors.endDateActive}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              type="number"
              name="buyerId"
              label={sentenceCase('buyer_id')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.buyerId}
              helperText={errors.buyerId}
            />

            <TextField
              type="number"
              name="minMinmaxQuantity"
              label={sentenceCase('min_minmax_quantity')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.minMinmaxQuantity}
              helperText={errors.minMinmaxQuantity}
            />

            <TextField
              type="number"
              name="maxMinmaxQuantity"
              label={sentenceCase('max_minmax_quantity')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.maxMinmaxQuantity}
              helperText={errors.maxMinmaxQuantity}
            />

            <TextField
              type="number"
              name="minimumOrderQuantity"
              label={sentenceCase('minimum_order_quantity')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.minimumOrderQuantity}
              helperText={errors.minimumOrderQuantity}
            />

            <TextField
              type="number"
              name="maximumOrderQuantity"
              label={sentenceCase('maximum_order_quantity')}
              onChange={(e) => onValueChange(e)}
              error={!!errors.maximumOrderQuantity}
              helperText={errors.maximumOrderQuantity}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClick}>
            Submit
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
