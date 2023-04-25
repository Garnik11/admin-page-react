

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useProduct from "./productHooks/useProduct";

function Products() {
  const [active, setActive] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);
  const {products, deleteProduct, editProduct} = useProduct()
  const [edit, setEdit] = useState({
    name:"",
    description:"",
    price:"",
    categoryId:""
  })

  console.log(edit);

  return (
    <div>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            marginTop: "20px",
          }}
        >
          <Button variant="contained">
            <Link to="createProduct">New Product</Link>
          </Button>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", margin: "50px auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <p
                      onChange={(e) => setEdit({...edit, name:e.target.value}) }
                      contentEditable={active}
                      id="product-name"
                      suppressContentEditableWarning={true}
                    >
                      {product.name}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <img width="80px" src={product.image} />
                  </TableCell>
                  <TableCell align="center">
                    <p
                    onChange={(e) => setEdit({...edit, price:e.target.value}) }
                      contentEditable={active}
                      id="product-price"
                      suppressContentEditableWarning={true}
                    >
                      {product.price}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <p
                    onChange={(e) => setEdit({...edit, description:e.target.value}) }
                      contentEditable={active}
                      id="product-description"
                      suppressContentEditableWarning={true}
                    >
                      {product.description}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <p
                    onChange={(e) => setEdit({...edit, categoryId:e.target.value}) }
                      contentEditable={active}
                      id="product-category"
                      suppressContentEditableWarning={true}
                    >
                      {product.Category.name}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2}>
                      {activeProductId === product.id ? (
                        <Button 
                          onClick={() => {
                            editProduct(product.id);
                            setActiveProductId(null);
                            setActive(!active)
                          }}
                          >
                          save
                        </Button>
                      ) : (
                        <Button
                        onClick={() => {
                          setActive(!active)
                          setActiveProductId(product.id);
                           }}
                        
                          sx={{ cursor: "pointer" }}
                        >
                          edit
                        </Button>
                      )}
                      <DeleteOutlineIcon
                        onClick={() => deleteProduct(product.id)}
                        sx={{ cursor: "pointer" }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
           
           </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Products;