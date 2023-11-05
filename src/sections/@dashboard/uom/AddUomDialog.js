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
import { addUomDetails } from '../../../Services/ApiServices';
import Iconify from '../../../components/iconify';

export default function ResponsiveDialog() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [errors, setErrors] = useState({});

  const initialUser = {
    unitOfMeasure: '',
    uomCode: '',
    uomClass: '',
    lastUpdateDate: '',
    lastUpdatedBy: '',
    createdBy: '',
    creationDate: '',
    lastUpdateLogin: null,
    description: '',
  };
  const [user, setUser] = useState(initialUser);

  const validateUom = (password) => password.length <= 25;
  const validateUomCode = (password) => password.length <= 3;
  const validateUomClass = (password) => password.length <= 10;
  const validateDescription = (password) => password.length <= 50;

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = async () => {
    const { unitOfMeasure, uomCode, uomClass, description } = user;
    const newErrors = {};

    // Validate unitOfMeasure
    if (!validateUom(unitOfMeasure) || !unitOfMeasure) {
      newErrors.unitOfMeasure = !unitOfMeasure
        ? 'Unit Of Measure is required'
        : 'Unit Of Measure must be maximum 25 characters long';
    }

    // Validate uomCode
    if (!validateUomCode(uomCode) || !uomCode) {
      newErrors.uomCode = !uomCode ? 'Uom Code is required' : 'Uom Code must be maximum 3 characters long';
    }

    // Validate uomClass
    if (!validateUomClass(uomClass) || !uomClass) {
      newErrors.uomClass = !uomClass ? 'Uom Class is required' : 'Uom Class must be maximum 10 characters long';
    }

    // Validate description
    if (!validateDescription(description)) {
      newErrors.description = 'Description must be maximum 25 characters long';
    }

    const date = new Date().toJSON();

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const uomBody = {
          unitOfMeasure: user.unitOfMeasure,
          uomCode: user.uomCode,
          uomClass: user.uomClass,
          lastUpdateDate: date,
          lastUpdatedBy: 'Admin',
          createdBy: 'Admin',
          creationDate: date,
          description: user.description,
        };

        const response = await addUomDetails(uomBody);

        console.log(response);

        if (response.status === 200) {
          alert('Successfully added!');
        } else {
          console.log(response);
          alert('Process failed! Try again later');
        }

        handleClose();
        navigate('/unit', { replace: true });
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
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} color='primary' onClick={handleClickOpen}>
        Add UOM
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        {/* <DialogTitle id="responsive-dialog-title">{'Add New Users'}</DialogTitle> */}
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              required
              name="unitOfMeasure"
              label={sentenceCase('unit_of_measure')}
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.unitOfMeasure}
              helperText={errors.unitOfMeasure}
            />

            <TextField
              required
              name="uomCode"
              label={sentenceCase('uom_code')}
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.uomCode}
              helperText={errors.uomCode}
            />

            <TextField
              required
              name="uomClass"
              label={sentenceCase('uom_class')}
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.uomClass}
              helperText={errors.uomClass}
            />

            <TextareaAutosize
              name="description"
              placeholder="Description.."
              autoComplete="given-name"
              onChange={(e) => onValueChange(e)}
              error={!!errors.description}
              helperText={errors.description}
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
