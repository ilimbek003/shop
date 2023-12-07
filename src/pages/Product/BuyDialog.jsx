import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SuccessDialog } from "../Dashboard/Cart/Order";
import Form from "../Dashboard/Cart/Order/Form";

const BuyDialog = ({ setLoading, t, setOpen, open, variant, amount }) => {
  const { byNow } = useSelector(({ products }) => products);

  const [success, setSuccess] = useState(false);

  const sale = !variant?.is_promotion
    ? 0
    : (variant?.product_price - variant?.promotion_price) * amount;

  const totalSum =
    (variant?.is_promotion
      ? variant?.promotion_price
      : variant?.product_price) * amount;

  return (
    <>
      <SuccessDialog
        t={t}
        open={success}
        setOpenDialog={setOpen}
        setOpen={setSuccess}
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
        onClose={() => setOpen(false)}
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
                {amount}
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
                {totalSum}
              </Typography>
            </td>
          </tr>
        </Box>
        <Form
          t={t}
          setSuccess={setSuccess}
          setLoading={setLoading}
          buyNow={{ variant: variant?.id, count: amount }}
        />
      </Dialog>
    </>
  );
};

export default BuyDialog;
