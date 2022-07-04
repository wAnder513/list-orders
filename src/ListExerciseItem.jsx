import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./ListExerciseItem.scss";

const ListExerciseItem = ({ order, getCurrentOrder }) => {
  const colorStatus = {
    new: "Новый",
    started: "Выполняется",
    completed: "Завершенный",
    assigned_to: "Назначено",
    declined: "Отменено",
  };

  const getDateTime = () => {
    return moment(order.created_date).format("DD MM YYYY hh:mm");
  };

  const getOrder = (e) => {
    e.preventDefault();
    getCurrentOrder(order);
  };

  return (
    <div onClick={getOrder}>
      <Link to="/order">
        <div className="order_wrapper">
          <div className="order_date">
            <div className="order main-text">№{order.id}</div>
            <div className="order second-text">{getDateTime()}</div>
          </div>

          <div className="order_autor">
            <div className="order main-text">{order.created_user.name}</div>
            <div className="order second-text">{order.order_type.name}</div>
          </div>

          <div className="order_terminal">
            <div className="order main-text">{order.account.name}</div>
            <div className="order second-text">{order.terminal.name}</div>
          </div>

          <div className="order_status">
            <div className={`order main-text order_text ${order.status}`}>
              {colorStatus[order.status]}
            </div>
          </div>
        </div>
        <hr className="order_hr" />
      </Link>
    </div>
  );
};

export default ListExerciseItem;
