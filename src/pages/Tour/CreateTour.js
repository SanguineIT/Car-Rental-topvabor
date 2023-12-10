import React, { useState } from 'react';
import { Container, TextField,  Grid, Button, Divider,IconButton } from '@mui/material';
import { useFormik,   FormikProvider } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'; 
import CircularProgress from '@mui/material/CircularProgress';
import { Box,   } from '../../../node_modules/@mui/material/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { Close } from '../../../node_modules/@mui/icons-material/index';

function CreateTour() {
    
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 5000000; // 5MB

  const validationSchema = Yup.object({
       
     tourName: Yup.string().test('is-not-whitespace', 'Cannot be whitespace', (value) => !(/^\s+$/.test(value))).min(2, 'Mininum 2 characters').max(50, 'Maximum 50 characters').required('Required'),
      price: Yup.number()
    .required('Required')
    .test('is-positive', 'Price must be greater than 0', (value) => value !== 0),
   
     title: Yup.string().test('is-not-whitespace', 'Cannot be whitespace', (value) => !(/^\s+$/.test(value))).min(2, 'Mininum 2 characters').max(50, 'Maximum 50 characters').required('Required!'),

     picturePath: Yup.array()
      .min(1, 'At least one image is required')
      .max(10, 'max 10 images can be upload')
      .test('fileSize', 'File size too large', (value) => {
        if (value && value.length) {
          return value.every((file) => file.file.size <= MAX_FILE_SIZE);  
        }
        return true;  
      })
      .test('fileType', 'Unsupported File Format, only PNG file is accepted', (value) => {
        if (value && value.length) {
          return value.every((file) => file.file.type === 'image/png');
        }
        return true;
      }),
    
  });

  

  const formik = useFormik({
    initialValues: {
      id: 0,
      tourName: '',
      price: '',
      title:'',
      picturePath: [], 

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
       const formData = new FormData();
 
      formData.append('id', values.id);
      formData.append('tourName', values.tourName);
      formData.append('title', values.title);
      formData.append('price', values.price);
      formData.append('picturePath', imagePath);
       
      
      try {
        setLoading(true)
        const response = await fetch(
          'https://restroreff.microlent.com/api/tour-tickts/create-or-update',
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
             },
          }
        );
        const data = await response.json();
        if (data.statusCode === 200){
            setLoading(false)
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Tour details added successfully.',
            });
            formik.resetForm();
            navigate('/tour');
          
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: data?.message ,
              }); 
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
         Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: data?.message || 'Failed to create the record.',
          }); 
        setLoading(false)
      }
    },
  });

  const [imagePath, setImagePath] = useState(); 

  const handleImageChange = (event) => {
    const files = event.currentTarget.files;
    setImagePath(event.target.files[0]);
    const imageList = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    formik.setFieldValue('picturePath', imageList);
    
  };

  

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.picturePath];
    updatedImages.splice(index, 1);
    formik.setFieldValue('picturePath', updatedImages);
  };

 

  const BackButton = () =>{
    navigate('/tour');
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div>
         <>
     <Button variant="contained" onClick={BackButton} style={{ marginLeft:'25px', float: 'left', }}>
        Back
      </Button>
      <FormikProvider value={formik}>
        <Container maxWidth="lg">
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tour-Name"
                  variant="outlined"
                  name="tourName"
                  id="tourName"
                  value={formik.values.tourName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.tourName && Boolean(formik.errors.tourName)}
                  helperText={formik.touched.tourName && formik.errors.tourName}
                  InputLabelProps={{
                    style: { fontSize: '12px',lineHeight: '1', },
                  }}
                 
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  name="title"
                  id="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  InputLabelProps={{
                    style: { fontSize: '12px',lineHeight: '1', },
                  }}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  name="price"
                  id="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  InputLabelProps={{
                    style: { fontSize: '12px',lineHeight: '1', },
                  }}
                />
              </Grid> */}
                <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  name="price"
                  id="price"
                  type="number"
                 
                  value={formik.values.price}
                  onChange={(e) => {
                    const value = e.target.value;
                     if (/^\d{0,6}(\.\d{0,2})?$/.test(value)) {
                      formik.handleChange(e);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  InputLabelProps={{
                    style: { fontSize: '12px',lineHeight: '1', },
                  }}
                />
              </Grid>
             
              
            </Grid>

          
             <Grid item xs={12} spacing={2}>
              <Grid container >
                {formik?.values?.picturePath.map((image, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'center', margin: '20px', position: 'relative' }}
                  >
                    <img
                      src={image.url}
                      alt={`uploaded-${index}`}
                      style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,255,255,0.5)' }}
                    >
                      <Close />
                    </IconButton>
                  </div>
                ))}    
              </Grid>
            </Grid>

            <Grid item xs={12}  style={{ marginTop: '15px' }}>
              <input
                accept="image/*"
                type="file"
                id="image-upload"
                onBlur={formik.handleBlur}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {formik.touched.picturePath && formik.errors.picturePath ? (
                <div style={{ color: 'red' }}>{formik.errors.picturePath}</div>
              ) : null}

               <label htmlFor="image-upload">
                <Button variant="outlined" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            <Box mt={0} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </FormikProvider>
    </>
    </div>
  )
}

export default CreateTour