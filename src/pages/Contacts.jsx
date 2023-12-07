/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import vk from "../assets/images/vk.png";
import whatsapp from "../assets/images/whatsapp.png";
import instagram from "../assets/images/instagram.png";
import telegram from "../assets/images/telegram.png";
import facebook from "../assets/images/facebook.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contacts = ({ t }) => {
  return (
    <section>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 8 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" fontWeight="700">
              {t("contacts")}
            </Typography>
            <Box
              display="flex"
              sx={{ "& img": { width: 56, height: 56 } }}
              columnGap="16px"
              mt={3}
              mb={3}
            >
              <a
                aria-label="read more"
                href="https://wa.me/996505919999"
                target="_blank"
                rel="noreferrer"
              >
                <img src={whatsapp} alt="" />
              </a>
              <a
                aria-label="read more"
                href="https://www.instagram.com/opop_odejda/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagram} alt="" />
              </a>
              <a
                aria-label="read more"
                href="https://t.me/opop_odejda"
                target="_blank"
                rel="noreferrer"
              >
                <img src={telegram} alt="" />
              </a>
              <a
                aria-label="read more"
                href="https://www.instagram.com/aijess.official"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagram} alt="" />
              </a>
              <a
                aria-label="read more"
                href="https://t.me/aijess.official "
                target="_blank"
                rel="noreferrer"
              >
                <img src={telegram} alt="" />
              </a>
            </Box>
            <Box
              sx={{
                mb: 1,
                padding: "16px",
                background: "#F1F1F1",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                {t("centerOffice")}
              </Typography>
              <Box mt={1} className="d-flex justify-content-between" mb={1}>
                <div className="d-flex">
                  <FontAwesomeIcon color="#323232" icon="map-pin" />
                  <Typography variant="body2" ml={1} fontWeight="400">
                    Алма-Атинская 1/1
                  </Typography>
                </div>
                <a href="tel:0505919999" className="link primary">
                  <Typography variant="body2">+996 505 919 999</Typography>
                </a>
              </Box>
              <Typography fontSize="12px" color="#00000050">
                09:00-18:00 ПН-ПТ {t("pickupPoint")}
              </Typography>
            </Box>
            {/* <Box
              sx={{
                padding: "16px",
                background: "#F1F1F1",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                {t("centerOffice")}
              </Typography>
              <Box mt={1} className="d-flex justify-content-between" mb={1}>
                <div className="d-flex">
                  <FontAwesomeIcon color="#323232" icon="map-pin" />
                  <Typography variant="body2" ml={1} fontWeight="400">
                    114 просп. Чуй
                  </Typography>
                </div>
                <a href="tel:0777 438 992" className="link primary">
                  <Typography variant="body2">0777 438 992</Typography>
                </a>
              </Box>
              <Typography fontSize="12px" color="#00000050">
                09:00 - 18:00 ПН-ПТ {t("pickupPoint")}
              </Typography>
            </Box> */}
          </Grid>
          <Grid item xs={12} md={8}>
           
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5076.75583657215!2d74.65039809139112!3d42.942387524619235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb982c8353f23%3A0x975fd504a10fa3ec!2z0JjQvdC00YPRgdGC0YDQuNCw0LvRjNC90YvQuSDQv9Cw0YDQuiBTaWxrIFdheQ!5e0!3m2!1sru!2skg!4v1665728831036!5m2!1sru!2skg"
              width="100%"
              height="450"
              style={{ border: "none" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Contacts;
