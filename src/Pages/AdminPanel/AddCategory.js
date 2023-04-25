import { useState } from "react";

function AddCategory() {
  const [category, setCategory] = useState({
    name: ''
  });
  

  const handleCategory = async (e) => {
    e.preventDefault();
   
    const token = localStorage.getItem('token');
    console.log (token)
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
   
    try {
      const response = await fetch('http://localhost:5000/cat/new', {
        method: 'POST',
     
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization":`${token}`
        },
        body: JSON.stringify(category),
      });
      
      if (!response.ok) {
        throw new Error('Error adding category',response.statusText);
      }

      const data = await response.json();
      console.log(data);

      setCategory({ name: '' });
    } catch (err) {
      console.error(err);
      // display error message to user
    }
  };

  return (
    <div>
      <form onSubmit={handleCategory}>
        <label>
          Category Name:
          <input
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
        </label>
       
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default AddCategory;