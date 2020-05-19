 import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Cart=()=>{
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

    const loadAllProducts=()=>{
        return(
            <div>
            </div>
        )
    }

    const loadCheckout=()=>{
      return(
          <div>
          </div>
      )
  }

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row ">
        <div className="col-6 ">{loadAllProducts()}</div>
        <div className="col-6 ">{loadCheckout()}</div>
      </div>
    </Base>
  );
}

export default Cart;