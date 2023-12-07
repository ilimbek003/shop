import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import { useTheme } from "@emotion/react";
import Dialogs from "../../../components/Dialog";

const array = [
  {
    path: "orders",
    icon: "basket-shopping",
    txt: "historyOrders",
  },
  {
    path: "operations",
    icon: "credit-card",
    txt: "historyOperations",
  },
  {
    path: "favorites",
    icon: "star",
    txt: "favoriteProducts",
  },
];

const Navigation = ({ setChangePassword, language, settings }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));

  const [exit, setExit] = useState(false);

  return (
    <Box component="section" mb={4}>
      <Dialogs
        open={exit}
        title={t('exit')}
        subtitle="Выйти из учётной записи"
        setOpen={setExit}
        exit
      />
      <Container maxWidth="xl">
        {md && (
          <Typography
            variant="body2"
            ml={2}
            mb={2}
            textTransform="uppercase"
            color="#15151550"
          >
            Заказы и товары
          </Typography>
        )}
        {!md && (
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            columnGap="16px"
            alignItems="start"
          >
            {array.map((item, idx) => (
              <Button
                key={idx}
                color={
                  location.pathname === `/dashboard/profile/${item.path}`
                    ? "primary"
                    : "inherit"
                }
                variant="contained"
                onClick={() => navigate(`/dashboard/profile/${item.path}`)}
                size="small"
              >
                <FontAwesomeIcon icon={item.icon} style={{ marginRight: 8 }} />
                {t(item.txt)}
              </Button>
            ))}
          </Box>
        )}
      </Container>

      {md && (
        <>
          <List
            sx={{
              "& div": {
                p: "16px 0 16px 32px",
              },
            }}
          >
            {array.map((item) => (
              <ListItem
                button
                onClick={() => navigate(`/dashboard/profile/${item.path}`)}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  color="var(--primary)"
                  style={{ marginRight: 16 }}
                />
                <Typography variant="body1">{t(item.txt)}</Typography>
              </ListItem>
            ))}
          </List>
          <List
            sx={{
              "& div": {
                p: "16px 0 16px 32px",
              },
            }}
          >
            <Typography
              variant="body2"
              mb={1}
              mt={2}
              ml={4}
              textTransform="uppercase"
              color="#15151550"
            >
              Настройки приложения
            </Typography>
            <ListItem button onClick={() => navigate("/contacts")}>
              <FontAwesomeIcon icon="phone" color="var(--secondary)" />
              <Typography variant="body1" ml={2}>
                {t("contacts")}
              </Typography>
            </ListItem>
            <ListItem button onClick={() => settings(true)}>
              <FontAwesomeIcon icon="user-ninja" color="var(--secondary)" />
              <Typography variant="body1" ml={2}>
                Личные данные
              </Typography>
            </ListItem>
            <ListItem button onClick={() => language(true)}>
              <FontAwesomeIcon icon="globe" color="var(--secondary)" />
              <Typography variant="body1" ml={2}>
                Язык
              </Typography>
            </ListItem>
            <ListItem button onClick={() => setChangePassword(true)}>
              <FontAwesomeIcon icon="key" color="var(--secondary)" />
              <Typography variant="body1" ml={2}>
                Сменить пароль
              </Typography>
            </ListItem>
            <ListItem button onClick={() => setExit(true)}>
              <FontAwesomeIcon icon="power-off" color="#E32967" />
              <Typography variant="body1" ml={2}>
                Выйти
              </Typography>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );
};

export default Navigation;
