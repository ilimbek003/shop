import { Grid, Slide, Typography, useMediaQuery } from "@mui/material";
import { Box, Container, useTheme } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSort from "../../../components/DropdownSort";
import PopoverSort from "../../../components/PopoverSort";
import { getPaymentHistory } from "../../../redux/reducers/profile";
import { noneResults } from "./Orders";

const Operations = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const { payment_history } = useSelector(({ profile }) => profile);

  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(getPaymentHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <PopoverSort
        anchorEl={anchorEl}
        open={openPopover}
        setOpen={setOpenPopover}
      />
      <Container maxWidth="xl">
        {md && (
          <Typography variant="subtitle2" fontWeight="700" mt={3}>
            История платежей
          </Typography>
        )}
        {!payment_history?.count ? (
          <Slide
            mt={2}
            direction="right"
            in={!payment_history?.count}
            container={containerRef.current}
          >
            {noneResults}
          </Slide>
        ) : (
          <>
            <DropdownSort
              setAnchorEl={setAnchorEl}
              // value={sortingBy}
              setOpen={setOpenPopover}
            />
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {payment_history?.results?.map((item, idx) => (
                <Grid item xs={12} lg={3}>
                  <Card item={item} key={idx} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </section>
  );
};

export default Operations;

const Card = () => (
  <Box
    sx={{
      background: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
      overflow: "hidden",
      display: "flex",

      "& table": {
        width: "100%",
        p: 2,
        "& p": { p: "4px 0" },

        "& td": { "&:last-child": { textAlign: "end" } },
      },
    }}
  >
    <table>
      <tr>
        <td>
          <Typography variant="body2" fontWeight="400">
            Заказ:
          </Typography>
        </td>
        <td>
          <Typography
            variant="body2"
            sx={{
              textDecoration: "underline",
            }}
            color="var(--primary)"
            fontWeight="700"
          >
            9379992
          </Typography>
        </td>
      </tr>
      <tr>
        <td>
          <Typography variant="body2" fontWeight="400">
            Дата:
          </Typography>
        </td>
        <td>
          <Typography variant="body2" fontWeight="700">
            15.08.2022 24:32
          </Typography>
        </td>
      </tr>
      <tr>
        <td>
          <Typography variant="body2" fontWeight="400">
            Способ оплаты::
          </Typography>
        </td>
        <td>
          <Typography variant="body2" fontWeight="700">
            Карта VISA
          </Typography>
        </td>
      </tr>
      <tr>
        <td>
          <Typography variant="body2" fontWeight="400">
            Сумма:
          </Typography>
        </td>
        <td>
          <Typography variant="body2" fontWeight="700">
            10 0000 c
          </Typography>
        </td>
      </tr>
    </table>
  </Box>
);
