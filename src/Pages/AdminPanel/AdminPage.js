
import { Link, Outlet } from "react-router-dom" 


import { MenuItem, MenuList, Box } from "@mui/material";


function AdminPage() {
  return (
    
      <Box
        sx={{
          display: 'flex' ,
          
          width: 220,
          height: "91vh",
          maxWidth: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          borderRadius: "none",
          backgroundColor:"black"
        }}
      >
        <MenuList sx={{ display: "flex", flexDirection: "column", gap: "20px", color:"white", marginRight: 20}}>
          <MenuItem sx={{ marginTop: "15px" }}>Dashboard</MenuItem>
          <Link to="addCategory">
            <MenuItem sx={{color: "white", textDecoration: "none"  }}>AddCategory</MenuItem>
          </Link>
          <Link to="products">
            <MenuItem sx={{color: "white", textDecoration: "none"  }}>Products</MenuItem>
          </Link>
          <Link to="/categories">
            <MenuItem sx={{color: "white", textDecoration: "none"  }}>Categories</MenuItem>
          </Link>
          <Link to="/users">
            <MenuItem sx={{color: "white", textDecoration: "none"  }}>Users</MenuItem>
          </Link>
        </MenuList>
        <Outlet/>
      </Box>
  );
}

export default AdminPage;