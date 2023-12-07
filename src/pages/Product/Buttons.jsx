import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, List, ListItem, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { StarIcon } from "../../assets/images/icons";
import { Alertt } from "../../components/SnackBar";
import { setOpenLogin } from "../../redux/reducers/auth";
import { addOrDeleteToFavorites } from "../../redux/reducers/profile";
import { useAuth } from "../../shared/ProtectedRoutes";

const array = [
  {
    icon: "fa-brands fa-whatsapp",
    txt: "WhatsApp",
    path: "https://api.whatsapp.com/send/?text=https://opop.asia/details/",
  },
  {
    icon: "fa-brands fa-telegram",
    txt: "Телеграм",
    path: "https://telegram.me/share/url?url=https://opop.asia/details/",
  },
  {
    icon: "fa-brands fa-twitter",
    txt: "Твиттер",
    path: "https://twitter.com/intent/tweet?refer_source=https://opop.asia/details/&text=https://opop.asia/details/",
  },

  {
    icon: "fa-brands fa-facebook",
    txt: "FaceBook",
    path: "https://www.facebook.com/sharer/sharer.php?u=https://opop.asia/details/",
  },
];

const Buttons = ({ t, details, reviews }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState({
    isFav: false,
    open: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const isAuth = useAuth();

  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (details?.id) setFav({ isFav: details?.is_favorite });
  }, [details]);

  return (
    <>
      <Alertt setFav={setFav} fav={fav} />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        mt={{ xs: 4, md: 3 }}
        rowGap="18px"
        columnGap="16px"
        alignItems="baseline"
        sx={{ "& span": { fontWeight: 700 } }}
      >
        <Box
          columnGap="16px"
          className="d-flex"
          width={{ xs: "100%", md: "30%" }}
          justifyContent={{ xs: "space-between", md: "start" }}
        >
          <Box display="flex" alignItems="center">
            {Array.isArray(reviews?.results) &&
              Array.from(
                Array(
                  !reviews?.results.length
                    ? 1
                    : reviews?.results[reviews?.results?.length - 1]
                        ?.mark_rating_count
                ).keys()
              ).map(() => <StarIcon />)}
            <Typography variant="body1" ml={1}>
              {reviews?.count ? reviews?.count : 0} {t("reviews")}
            </Typography>
          </Box>

          <div className="d-flex">
            <FontAwesomeIcon icon="eye" color="#E32967" />
            <Typography variant="body1" component="span" color="#E32967" ml={1}>
              {details?.views} {t("views")}
            </Typography>
          </div>
          {/* <div className="d-flex">
          <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0.125C4.11719 0.125 1 2.66797 1 5.8125C1 7.09766 1.54688 8.30078 2.44922 9.25781C2.03906 10.3242 1.19141 11.2539 1.19141 11.2539C1 11.4453 0.972656 11.7188 1.05469 11.9648C1.13672 12.2383 1.38281 12.375 1.65625 12.375C3.32422 12.375 4.63672 11.6914 5.45703 11.1172C6.22266 11.3633 7.09766 11.5 8 11.5C11.8555 11.5 14.9727 8.95703 14.9727 5.83984C14.9727 2.72266 11.8555 0.125 8 0.125ZM8 10.1875C7.26172 10.1875 6.52344 10.0781 5.83984 9.85938L5.21094 9.66797L4.69141 10.0508C4.30859 10.3242 3.76172 10.625 3.10547 10.8438C3.32422 10.5156 3.51562 10.1328 3.65234 9.75L3.95312 8.98438L3.37891 8.38281C2.88672 7.86328 2.3125 6.98828 2.3125 5.8125C2.3125 3.40625 4.85547 1.4375 7.97266 1.4375C11.0898 1.4375 13.6328 3.40625 13.6328 5.8125C13.6328 8.24609 11.1172 10.1875 8 10.1875ZM9.72266 4.9375C10.1875 4.9375 10.5977 4.52734 10.5977 4.0625C10.5977 3.625 10.1875 3.1875 9.72266 3.1875C9.28516 3.1875 8.875 3.59766 8.875 4.0625C8.875 4.55469 9.25781 4.9375 9.72266 4.9375ZM6.22266 4.9375C6.6875 4.9375 7.09766 4.52734 7.09766 4.0625C7.09766 3.625 6.6875 3.1875 6.22266 3.1875C5.78516 3.1875 5.375 3.59766 5.375 4.0625C5.375 4.55469 5.75781 4.9375 6.22266 4.9375ZM9.88672 6.71484C9.42188 7.26172 8.73828 7.5625 7.97266 7.5625C7.20703 7.5625 6.52344 7.26172 6.05859 6.71484C5.83984 6.44141 5.42969 6.38672 5.15625 6.63281C4.88281 6.87891 4.85547 7.28906 5.07422 7.5625C5.8125 8.41016 6.85156 8.90234 7.97266 8.90234C9.12109 8.90234 10.1602 8.41016 10.8984 7.5625C11.1172 7.28906 11.0898 6.87891 10.8164 6.63281C10.543 6.38672 10.1328 6.44141 9.88672 6.71484Z"
              fill="#E32967"
            />
          </svg>
          <Typography variant="body1" component="span" color="#E32967" ml={1}>
            14,2 k {t("reviews")}
          </Typography>
        </div> */}
        </Box>

        <Box
          columnGap="16px"
          width="100%"
          justifyContent={{ xs: "space-between", md: "start" }}
          className="d-flex"
        >
          <Button
            className="d-flex"
            onClick={() => {
              if (isAuth) {
                if (!fav.isFav) {
                  setFav({ open: true, isFav: !fav.isFav });
                } else setFav({ open: false, isFav: !fav.isFav });
                dispatch(addOrDeleteToFavorites({ product_id: details?.id }));
              } else {
                navigate(`/auth?return_to=/details/${details?.id}`);
              }
            }}
          >
            <FontAwesomeIcon
              icon="star"
              style={{ fontSize: 14 }}
              color="var(--primary)"
            />
            <Typography
              variant="body2"
              whiteSpace="nowrap"
              component="span"
              color="var(--primary)"
              ml={{ xs: 0.5, md: 1 }}
            >
              {fav.isFav ? "Удалить из избранного" : t("addToFavorite")}
            </Typography>
          </Button>

          <Button
            size="small"
            onClick={handleClick}
            sx={{
              background: "#E0E0E096",
              color: "#000",
              p: { xs: "6px 24px!important" },
            }}
            variant="contained"
          >
            <FontAwesomeIcon
              icon="share-from-square"
              style={{ marginRight: 8 }}
              color="#000"
            />
            {t("share")}
          </Button>
        </Box>

        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "8px",
            },
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={() => setOpen(false)}
        >
          <List
            sx={{
              p: 2,
            }}
          >
            <ListItem
              button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://opop.asia/details/${details?.id}`
                );
                setOpen(false);
              }}
              sx={{
                borderBottom: "1px solid #8B97A233",
                pt: 2,
                pb: 2,
              }}
            >
              <FontAwesomeIcon icon="copy" color="#8B97A2" />
              <Typography
                color="var(--primary)"
                variant="body2"
                fontWeight="500"
                ml={1}
              >
                Скопировать ссылку
              </Typography>
            </ListItem>
            {array.map((item, idx) => (
              <a
                aria-label="read more"
                target="_blank"
                rel="noreferrer"
                href={`${item.path}${details?.id}`}
              >
                <ListItem
                  key={idx}
                  button
                  onClick={() => setOpen(false)}
                  sx={{
                    borderBottom: "1px solid #8B97A233",
                    pt: 2,
                    pb: 2,
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} color="#8B97A2" />
                  <Typography
                    color="var(--primary)"
                    variant="body2"
                    fontWeight="500"
                    ml={1}
                  >
                    {item.txt}
                  </Typography>
                </ListItem>
              </a>
            ))}
          </List>
        </Popover>
      </Box>
    </>
  );
};

export default Buttons;
