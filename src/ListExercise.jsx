import React, { useMemo } from "react";
import ListExerciseItem from "./ListExerciseItem";

import "./ListExercise.scss";

const ListExercise = ({
  getCurrentOrder,
  orders,
  totalCountOrders,
  addition,
  page,
  hasErrors,
  subtraction,
}) => {
  const cssStylesTitle = [
    { cssClass: "date", title: "Номер/Дата" },
    { cssClass: "autor", title: "Тип задания/Автор" },
    { cssClass: "account", title: "Аккаунт/Терминал" },
    { cssClass: "status", title: "Статус" },
  ];

  function getOrder(order) {
    getCurrentOrder(order);
  }

  const paginationPage = useMemo(() => {
    return Math.ceil(totalCountOrders / 15);
  }, [totalCountOrders]);

  return (
    <div className="exercise_wrapper">
      <div className="exercise_titles">
        {cssStylesTitle.map((item) => (
          <div
            className={`exercise_title ${item.cssClass}`}
            key={item.cssClass}
          >
            {item.title}
          </div>
        ))}
      </div>

      <hr className="exercise_hr" />

      {orders && orders.length > 0 && !hasErrors ? (
        <div>
          <div className="exercise_orders">
            {orders.map((order) => (
              <ListExerciseItem
                getCurrentOrder={getOrder}
                order={order}
                key={order.id}
              ></ListExerciseItem>
            ))}
          </div>

          <div className="exercise_pagination">
            <div className="exercise_pages">
              Записи {(page - 1) * 15 + 1}-
              {page * 15 < totalCountOrders ? page * 15 : totalCountOrders}
            </div>

            <button
              className="exercise_button subtraction"
              disabled={page === 1}
              onClick={() => subtraction()}
            >
              <div className="exercise_arrow subtraction"></div>
            </button>

            <div className="exercise_current">{page}</div>

            <button
              className="exercise_button add"
              disabled={page === paginationPage}
              onClick={() => addition()}
            >
              <div className="exercise_arrow add"></div>
            </button>
            <span>Всего страниц:&nbsp;</span>
            {paginationPage}
          </div>
        </div>
      ) : (
        <h1 className="exercise_empty">На данный момент нет заказов</h1>
      )}
    </div>
  );
};

export default ListExercise;
