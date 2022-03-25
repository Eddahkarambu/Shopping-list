import React, { useState, useEffect } from "react";
import "./Shoppinglist.css";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "white",
    },
    width: "100%",
  },
}));

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
  let navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [shoppinglist, setShoppingList] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  console.log(open);

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
        toast.error("Some error occured");
      }
    } catch (err) {
      toast.error("An error occured");
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("please fill the name");
    }
    try {
      const token = localStorage.getItem("token");
      let res = await fetch("http://localhost:1337/api/shoppinglists", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: { Name: name },
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
      }
      toast.success("successfully added your shoppinglist");
      fetchShoppingList();
      handleClose();
      setName("");
    } catch (err) {
      toast.error("you have an error");
    }
  };
  return (
    <div className="shopping">
      <ToastContainer />
      <Button onClick={handleOpen}>Add Shopping List</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Shopping List
          </Typography>
          <form>
            <Box margin="2rem">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                placeholder="Name"
                variant="filled"
                className={classes.root}
                type="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </form>
          <div className="btn">
            <Button
              style={{
                minWidth: "150px",
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </div>
        </Box>
      </Modal>
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
