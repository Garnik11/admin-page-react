
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';



export default function UpdateProduct() {

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name:"",
        price:"",
        categoryId:"",
        description:""
    });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
   
    const {id } = useParams();
    console.log(id)
    useEffect(() => {
        fetch(`http://localhost:5000/prod/${id}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setProduct(res);
            });
    }, [id]);


    useEffect(() => {
        fetch("http://localhost:5000/cat/categories")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setCategories(res);
            });
    }, []);

      const updateProduct = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `http://localhost:5000/prod/update`,
            {
              method: "PUT",
              body: JSON.stringify(product),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization":`Bearer ${token}`
            },
            }
          );
          
          if (response.ok) {
            setSnackbarOpen(true)
            setSnackbarMessage("Product Updated")
          }else{
            setSnackbarMessage("krkin porceq")
          }
        } catch (err) {
          console.log(err);
        }
      };

    console.log(product);

    return (
        <div>
            <Typography
                component="h2"
                variant="h5"
                color="#333"
                sx={{ textAlign: "center", marginTop: "15px" }}
            >
                Edit Product
            </Typography>
            <Typography component='p' color="blue" sx={{ height: '10px', textAlign: 'center', fontSize: '15px' }}>
                {/* {err ? err : updated} */}
            </Typography>
            {/* {product.name && */}
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
                >
                    <TextField
                        id="outlined-helperText"
                        label="Name"
                        value={product.name}
                         onChange={(e) =>
                        setProduct({...product,name: e.target.value})
                     }
                    />
                 
          
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="categoryId"
                            id="category"
                            value={product.categoryId}
                            label="Category"
                          onChange={(e) =>
                            setProduct({...product,categoryId: e.target.value})
                          }
                        >
                            {categories.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        value={product.price}
                    onChange={(e) =>
                      setProduct({...product,price: e.target.value})
                    }
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        value={product.description}
                    onChange={(e) =>
                      setProduct({...product,description: e.target.value})
                    }
                    />

                    <Button variant="outlined"
                       onClick={updateProduct}
                    >
                        Update
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

