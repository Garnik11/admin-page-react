


import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Typography, Box, TextField, IconButton, Snackbar, Button } from '@mui/material';

import Alert from '@mui/material/Alert';

const Root = styled("div")({
    margin: "2rem",
});

const CategoryContainer = styled(Paper)({
    margin: "1rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [remove, setRemove] = useState(false);
    const [add, setAdd] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [active, setActive] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [rename, setRename] = useState({ name: "" })
    const [update, setUpdate] = useState(false)



    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch("http://localhost:5000/cat/categories", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, [remove, add, update]);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/cat/delcategory`, {
            method: "DELETE",
            body: JSON.stringify({
                id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setSnackbarOpen(true)

                setSnackbarMessage(data.message)

                setRemove(!remove)
            })
            .catch((err) => console.log(err));
    };


    const changeCategory = async (id) => {


        fetch(`http://localhost:5000/cat/updatecategory/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(rename),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setSnackbarOpen(true)
            setUpdate(!update)
            setSnackbarMessage(data.message)

          })
          .catch((err) => console.log(err));
    };

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            if (!name) {
                setError(true)
                return
            }
            const response = await fetch('http://localhost:5000/cat/newcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Error adding category', response.statusText);
            }

            const data = await response.json();
            console.log(data);

            setAdd(!add);
            setName('');
            setError(false)
            setSnackbarOpen(true);
            setSnackbarMessage('Category created');
        } catch (err) {
            console.error(err);
            // display error message to user
        }
    };
    console.log(rename);

    return (
        <Root>
            <Typography variant="h6">Categories</Typography>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem"
            }}>

                <TextField
                    sx={{ minWidth: "20rem" }}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!name && error}

                    helperText={!error ? null : "fill in the field"}
                />


                <Button onClick={createCategory} variant="contained" color="primary" sx={{ marginLeft: "1rem" }}>
                    Add Category
                </Button>
            </Box>


            {categories.map((category) => (
                <CategoryContainer key={category.id}>
                    {/* <Typography variant="body1">  */}
                    <TextField
                        value={activeCategory === category.id ? rename.name : category.name}
                        onChange={(e) =>{
                            setRename((prevState) => ({
                                ...prevState,

                                name: e.target.value,
                            }))
                            
                            e.preventDefault();
                            e.stopPropagation()
                        }}
                        InputProps={{
                            readOnly: !active || activeCategory !== category.id,
                        }}
                        helperText={
                            editingCategoryId === category.id ? "Edit field" : null
                        }
                        onFocus={() => setEditingCategoryId(category.id)}
                        onBlur={() => setEditingCategoryId(null)}
                        onClick={(e) => 
                            setActiveCategory(category.id)}
                    />

                    <div>
                        <IconButton aria-label="delete" onClick={() => handleDelete(category.id)}>
                            <DeleteIcon />
                        </IconButton>
                        {activeCategory === category.id ? (
                            <Button
                                onClick={() => {

                                    setActiveCategory(null);
                                    changeCategory(category.id)

                                }}
                            >
                                save
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {

                                    setActive(!active)
                                    setActiveCategory(category.id);
                                }}

                                sx={{ cursor: "pointer" }}
                            >
                                edit
                            </Button>
                        )}
                    </div>
                </CategoryContainer>
            ))}

            <Snackbar open={snackbarOpen}
                sx={{
                    marginRight: "250px",
                    marginTop: "50px"
                }}
                autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Root>
    );
}
export default Categories



