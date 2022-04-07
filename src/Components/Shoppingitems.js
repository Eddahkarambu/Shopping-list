import React, { useState, useEffect } from "react";
import "./Shoppingitems.css";
import Progress from "./Progress.js";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

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
  { field: "Quantity", headername: "Quantity" },
];

export default function Shoppingitems() {
  let navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [shoppingitems, setShoppingitems] = useState([]);
  const [name, setName] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [Delete, setDelete] = useState("");

  useEffect(() => {
    fetchShoppingItems();
  }, []);

  let fetchShoppingItems = async () => {
    try {
      const token = localStorage.getItem("token");
      setSpinner(true);
      let res = await fetch("http://localhost:1337/api/shoppinglistitems", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let resJson = await res.json();
      setSpinner(false);
      if (res.status === 200) {
        const shoppingArray = resJson.data;
        const modifieddArray = shoppingArray.map((list) => {
          return {
            id: list.id,
            Name: list.attributes.Name,
            Quantity: list.attributes.Quantity,
          };
        });
        setShoppingitems(modifieddArray);
      } else {
        toast.error("Some error occured");
      }
    } catch (err) {
      toast.error("An error occured");
    }
  };

  //   let handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (name === "") {
  //       toast.error("please fill the name");
  //     }
  //     try {
  //       const token = localStorage.getItem("token");
  //       setSpinner(true);
  //       let res = await fetch("http://localhost:1337/api/shoppinglistitems", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           data: { Name: name },
  //         }),
  //       });
  //       let resJson = await res.json();
  //       setSpinner(false);
  //       if (res.status === 200) {
  //       }
  //       toast.success("successfully added your shoppingitems");
  //       fetchShoppingItems();
  //       handleClose();
  //       setName("");
  //     } catch (err) {
  //       toast.error(" An error occurred");
  //     }
  //   };

  //   let handleDelete = async (id) => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       setSpinner(true);
  //       let res = await fetch(`http://localhost:1337/api/shoppingitems/${id}`, {
  //         method: "DELETE",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       let resJson = await res.json();
  //       setSpinner(false);
  //       if (res.status === 200) {
  //         toast.success("deleted successfully");
  //         fetchShoppingItems();
  //       }
  //     } catch (err) {
  //       toast.error("An error occured");
  //     }
  //   };

  return (
    <div className="shoppingitems">
      {spinner && <Progress />}
      <ToastContainer />
      <div className="listitems">SHOPPING ITEMS</div>
      <div style={{ height: 400, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shoppingitems.map((row) => (
                <TableRow
                  key={row.Name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.Quantity}</TableCell>
                  <TableCell>
                    {/* <Visibility onClick={() => redirectShoppingItem(row.id)} /> */}
                    {/* <DeleteIcon onClick={() => handleDelete(row.id)} /> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
