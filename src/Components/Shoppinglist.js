import React, { useState, useEffect } from "react";
import "./Shoppinglist.css";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headername: "ID" },
  { field: "Name", headername: "Name" },
];

export default function Shoppinglist() {
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
