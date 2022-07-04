import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ListExercise from "./ListExercise";
import Exercise from "./Exercise";

import "./App.css";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [hasErrors, setErrors] = useState(false)
  const [page, setPage] = useState(1);
  const [totalCountOrders, setTotalCountOrders] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f15021c-fcd4-4657-aff4-2782f62b60b6/test_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220703%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220703T101856Z&X-Amz-Expires=86400&X-Amz-Signature=fc2cb182c4896d6e5bd6d5c7d723ab0b7b1e40bcbbc2db0ba48b7c9595eaebe3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22test_data.json%22&x-id=GetObject"
      )
      .then((res) => {
        setOrders(res.data);
        setTotalCountOrders(res.data.length);
      })
      .catch(() => setErrors(true));
  }, []);

  const getOrder = (order) => {
    setOrder(order);
  };

  const paginationOrders = useMemo(() => {
    const start = (page - 1) * 15;
    const end = page * 15;

    const sortOrders = orders.slice(start, end);
    return sortOrders;
  }, [orders, page]);

  const addition = () => {
    if (page < Math.ceil(totalCountOrders / 15)) {
      setPage(page + 1);
    }
  };

  const subtraction = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <div className="App">
              <ListExercise
                orders={paginationOrders}
                page={page}
                totalCountOrders={totalCountOrders}
                hasErrors={hasErrors}
                getCurrentOrder={getOrder}
                addition={addition}
                subtraction={subtraction}
              ></ListExercise>
            </div>
          }
        ></Route>
        <Route
          path={`/order`}
          element={<Exercise props={{ order: order }}></Exercise>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
