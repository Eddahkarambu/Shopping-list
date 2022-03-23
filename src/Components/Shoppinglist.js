import React, { useState, useEffect } from "react";
import "./Shoppinglist.css";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { field: "id", headername: "ID" },
  { field: "Name", headername: "Name" },
];

export default function Shoppinglist() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [shoppinglist, setShoppingList] = useState([]);

  useEffect(() => {
    fetchShoppingList();
  }, []);

  let fetchShoppingList = async () => {
    try {
      const token = localStorage.getItem("token");
      let res = await fetch("http://localhost:1337/api/shoppinglists", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        const shoppingArray = resJson.data;
        const modifieddArray = shoppingArray.map((list) => {
          return {
            id: list.id,
            Name: list.attributes.Name,
          };
        });

        setShoppingList(modifieddArray);
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="shopping">
      <Button onClick={handleOpen}>Add Shopping List</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ></Modal>

      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Shopping List
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Name:
        </Typography>
      </Box>

      <div className="list">SHOPPING LIST</div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={shoppinglist}
          columns={columns}
          rowsPerPageOptions={[]}
          checkboxSelection
          hideFooter
        />
      </div>
    </div>
  );
}
