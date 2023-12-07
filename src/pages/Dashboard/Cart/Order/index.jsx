import React, { useState } from "react";
import { Button, Dialog, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Form from "./Form";
import Orders from "./Orders";
import { SuccessIcon } from "../../../../assets/images/icons";
import { useDispatch, useSelector } from "react-redux";
import { setByNow } from "../../../../redux/reducers/products";
import SnackBar from "../../../../components/SnackBar";
import { setCreatedOrderData } from "../../../../redux/reducers/order";

const Order = ({
  open,
  setOpen,
  orderSum,
  count,
  setCartSum,
  sale,
  t,
  setLoading,
}) => {
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const { byNow } = useSelector(({ products }) => products);
  const { created_order } = useSelector(({ order }) => order);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  return (
    <>
      <SuccessDialog
        t={t}
        open={success}
        setOpenDialog={setOpen}
        setOpen={setSuccess}
      />
      <SnackBar
        state={created_order}
        severity={201}
        setState={setCreatedOrderData}
      />
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            alignItems: { xs: "end", md: "center" },
          },
          "& .MuiDialog-paper": {
            minWidth: { xs: "100%", md: 848 },
            height: { xs: "100%", md: "fit-content" },
            m: { xs: "0", md: 3 },
            maxHeight: { xs: "calc(100% - 113px)", md: "calc(100% - 64px)" },
            p: 2,
          },

          "& .MuiAccordion-root": {
            mt: 2,
            width: "100%",
            background: "#FFFFFF",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "8px",
            "&::before": { display: "none" },
          },

          "& .MuiAccordionSummary-content": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
        onClose={() => {
          if (byNow) dispatch(setByNow(false));
          else setOpen(false);
        }}
        open={open || byNow}
      >
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            height: "6px",
            width: 130,
            borderRadius: 1,
            background: "#7E7E7E",
            m: "0 auto 16px",
            color: "transparent",
          }}
        ></Box>
        <Typography
          variant="subtitle2"
          mt={1}
          textAlign="center"
          fontWeight="700"
          pb={{ xs: 2, md: 0 }}
        >
          Оформить заказ
        </Typography>
        {md && <Orders t={t} />}
        <Typography
          variant="body2"
          pt={2}
          mt={{ xs: 1, md: 3 }}
          borderTop="1px solid #00000010"
          fontWeight="700"
        >
          ВЫБРАННЫЕ ТОВАРЫ
        </Typography>
        <Box
          component="table"
          sx={{
            pb: 2,
            mb: 2,
            borderBottom: "1px solid #00000010",
            width: "100%",
            color: "#00000050",

            "& td:last-child": {
              textAlign: "end",
            },

            "& p": {
              p: "8px 0 0",
            },
          }}
        >
          <tr>
            <td>
              <Typography variant="body2" fontWeight="400">
                Товаров:
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight="400">
                {count}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography variant="body2" fontWeight="400">
                Скидка:
              </Typography>
            </td>
            <td>
              <Typography variant="body2" fontWeight="400">
                {sale}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography
                variant="body2"
                color="var(--primary)"
                fontWeight="700"
              >
                Итого цена:
              </Typography>
            </td>
            <td>
              <Typography
                variant="body2"
                color="var(--primary)"
                fontWeight="700"
              >
                {orderSum} c
              </Typography>
            </td>
          </tr>
        </Box>
        <Form
          t={t}
          setSuccess={setSuccess}
          setCartSum={setCartSum}
          setLoading={setLoading}
        />
        {!md && <Orders title t={t} />}
      </Dialog>
    </>
  );
};

export default Order;

export const SuccessDialog = ({ open, t, setOpen }) => {
  const { created_order } = useSelector(({ order }) => order);
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          p: 2,
        },
      }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SuccessIcon />
        <Typography
          variant="subtitle2"
          fontWeight="700"
          textAlign="center"
          mt={2}
          mb={1}
        >
          {t("successfullyOrdered")}
        </Typography>
        <Typography
          variant="body1"
          color="#15151570"
          textAlign="center"
          maxWidth="304px"
        >
          {t("successfullyOrderedTxt")}
        </Typography>
      </Box>

      <Box
        mt={2}
        borderTop="1px solid #00000010"
        display="flex"
        pt={2}
        justifyContent="space-between"
      >
        <a
          aria-label="read more"
          style={{ width: "100%" }}
          href={created_order?.message?.payment_url}
        >
          <Button
            fullWidth
            color="success"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Typography variant="body2" color="#151515">
              {t("payment")}
            </Typography>
          </Button>
        </a>

        {/* <Button
          fullWidth
          onClick={() => {
            setOpen(false);
            setOpenDialog(false);
            navigate("/dashboard/profile");
          }}
        >
          <Typography variant="body2" color="#E32967">
            В заказы
          </Typography>
        </Button> */}
      </Box>
    </Dialog>
  );
};
