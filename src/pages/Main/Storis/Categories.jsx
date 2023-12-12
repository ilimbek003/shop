import React, { useState, useEffect } from "react";
import axios from "axios";
import StorisContent from "./StorisContent";
import cookie from "cookie_js";

const Categories = () => {
  const [stories, setStories] = useState([]);
  const api = "http://141.8.194.166";
  const userToken = cookie.get("token_opop");

  useEffect(() => {
    axios
      .get(`${api}/business/stories_shop_list/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }, [userToken]);
  return (
    <>
      <section>
        <div className="storis">
          <div className="storis_div">
            <h5>Истории</h5>
            <button>Показать все</button>
          </div>
          <div className="storis_block">
            {stories &&
              stories.map((el, id) => <StorisContent key={id} data={el} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
