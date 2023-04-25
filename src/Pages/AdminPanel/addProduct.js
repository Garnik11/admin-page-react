
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box, TextField, IconButton, Snackbar, Button } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function CreateProduct() { 
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
console.log(product)
const token =localStorage.getItem("token")
  async function submitCreateProduct(e) {
     e.preventDefault();
    
    try {
        if (!product) {
            setError(true)
            return
          }
        const response = await fetch("http://localhost:5000/prod/newprod", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":`Bearer ${token}`
            },
        });
      if(response.status === 401 || response.status === 403){
        console.log(response.status);
        navigate('/');
      }
      const data = await response.json();
      console.log(data, "data");
      setSnackbarOpen(true)
      setSnackbarMessage("Product Created")

    } catch (err) {
      console.log(err);
    }
    setProduct({ name:'',categoryId:'',price:'',description:''})
  }

  useEffect(() => {
    fetch("http://localhost:5000/cat/categories",{
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization":`Bearer ${token}`
        },
      
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res);
      });
  }, []) 
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "41ch" },
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitCreateProduct}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={product.name}
          onChange={(e) =>setProduct({...product, name: e.target.value})}
        />
     
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={product.categoryId}
            label="Category"
            onChange={(e) =>setProduct({...product, categoryId: e.target.value})}
          >
            {categories.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={product.price}
          onChange={(e) =>setProduct({...product, price: e.target.value})}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={product.description}
          onChange={(e) =>setProduct({...product, description: e.target.value})}
        />
        
        <Button variant="outlined" onClick={submitCreateProduct}>
          Submit
        </Button>
        <Snackbar open={snackbarOpen}
        sx={{
          marginLeft: "65rem",
          marginBottom: "40rem"
        }}
        autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Box>
    </div>
  );
}

export default CreateProduct;