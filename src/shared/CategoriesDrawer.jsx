    import {
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CheckMarkIconFill, CloseIcon } from "../assets/images/icons";

const CategoriesDrawer = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const { categories } = useSelector(({ products }) => products);
  const [category, setCategory] = useState("");

  return (
    <SwipeableDrawer
      anchor="left"
      sx={{
        "&.MuiDrawer-root": {
          zIndex: 1300,
        },
        "& .MuiPaper-root": {
          width: "90%",
          p: "32px",
          borderRadius: "0 16px 16px 0",
        },
      }}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Box display="flex" mb={3} justifyContent="space-between">
        <Typography variant="h6" fontWeight="700">
          Категории
        </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List
        sx={{
          width: "100%",
          backgroundColor: "#FFF",
        }}
      >
        {Array.isArray(categories) &&
          categories.map((item, idx) => (
            <div key={idx}>
              <ListItem
                component="label"
                button
                onClick={() => {
                  if (item.id === category) {
                    setCategory("");
                  } else
                    setCategory({
                      category,
                      parent: item.id,
                      child: "",
                      title: item.title,
                    });
                }}
                sx={{
                  background: "#F1F1F1",
                  borderRadius: "8px",
                  p: 2,
                  mb: 2,
                }}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <svg
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 6.75C5.25391 6.75 5.03516 6.66797 4.87109 6.50391L0.496094 2.12891C0.140625 1.80078 0.140625 1.22656 0.496094 0.898438C0.824219 0.542969 1.39844 0.542969 1.72656 0.898438L5.5 4.64453L9.24609 0.898438C9.57422 0.542969 10.1484 0.542969 10.4766 0.898438C10.832 1.22656 10.832 1.80078 10.4766 2.12891L6.10156 6.50391C5.9375 6.66797 5.71875 6.75 5.5 6.75Z"
                        fill="#1E1E1E"
                      />
                    </svg>

                    <Typography variant="body2" ml={1}>
                      {item.title}
                    </Typography>
                  </div>
                  {item.id === category?.parent && (
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0.75C3.71875 0.75 0.25 4.25 0.25 8.5C0.25 12.7812 3.71875 16.25 8 16.25C12.25 16.25 15.75 12.7812 15.75 8.5C15.75 4.25 12.25 0.75 8 0.75ZM8 15.25C4.28125 15.25 1.25 12.25 1.25 8.5C1.25 4.8125 4.25 1.75 8 1.75C11.6875 1.75 14.75 4.78125 14.75 8.5C14.75 12.2188 11.7188 15.25 8 15.25ZM12.4062 6.6875C12.5625 6.53125 12.5625 6.28125 12.4062 6.15625L12.1562 5.875C12 5.71875 11.75 5.71875 11.625 5.875L6.5 10.9375L4.34375 8.78125C4.21875 8.625 3.96875 8.625 3.8125 8.78125L3.5625 9.03125C3.40625 9.1875 3.40625 9.40625 3.5625 9.5625L6.25 12.2812C6.375 12.4062 6.625 12.4062 6.78125 12.2812L12.4062 6.6875Z"
                        fill="#8F27C6"
                      />
                    </svg>
                  )}
                </div>
              </ListItem>
              {item.id === category?.parent && (
                <List>
                  {Array.isArray(categories) &&
                    categories
                      ?.find((item) => item.id === category?.parent)
                      ?.children.map((item, idx) => (
                        <>
                          <ListItem
                            key={idx}
                            onClick={() => {
                              setCategory({
                                ...category,
                                child: item.id,
                                title: item.title,
                              });
                              navigate(
                                `/catalog/?category_id=${item.id}&min_price=&max_price=&currency_unit_id=&category_title=${item.title}&currency=&is_new=`
                              );
                            }}
                            component="label"
                            button
                            sx={{
                              background: "#F1F1F1",
                              borderRadius: "8px",
                              p: 2,
                              mb: 2,
                              ml: 3,
                              width: "calc(100% - 24px)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="body2">
                              {item.title}
                            </Typography>
                            {item.id === category.child && (
                              <CheckMarkIconFill />
                            )}
                          </ListItem>
                        </>
                      ))}
                </List>
              )}
            </div>
          ))}
      </List>
    </SwipeableDrawer>
  );
};

export default CategoriesDrawer;
