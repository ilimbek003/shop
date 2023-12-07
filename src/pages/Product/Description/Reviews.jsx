import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  Collapse,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useDropzone } from "react-dropzone";
import { StarIcon } from "../../../assets/images/icons";
import RateDialog from "./RateDialog";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addReview,
  getProductReviews,
  setAddedReview,
} from "../../../redux/reducers/products";
import { TransitionGroup } from "react-transition-group";
import SnackBar from "../../../components/SnackBar";
import { Fancybox } from "@fancyapps/ui";
import { useAuth } from "../../../shared/ProtectedRoutes";
import { useNavigate } from "react-router";
import { t } from "i18next";

const Reviews = ({ details, setLoading, loading }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(768));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useAuth();

  const firstUpdate = useRef(true);

  const [files, setFiles] = useState([]);
  const [rating, setRating] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    open: false,
    title: "",
  });

  const { reviews, added_review } = useSelector(({ products }) => products);

  const formik = useFormik({
    initialValues: {
      product: details.id,
      mark: 0,
      comment: "",
      images: [],
    },
    onSubmit: (values, { resetForm }) => {
      if (isAuth) {
        setLoading(true);
        const data = new FormData();
        Object.entries(values)
          .filter((item) => !item.images)
          .forEach((item) => data.append(item[0], item[1]));
        files.map((image) => data.append("images", image));

        acceptedFiles.reduce((total, amount) => total + amount.size, 0) >
          1000000 &&
          setError({
            open: true,
            title: "Сумма размера файлов превышает 1мб",
          });

        dispatch(addReview(data));
        resetForm();
        setFiles([]);
      } else navigate(`/auth?return_to=/details/${details.id}`);
    },
  });

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
    maxSize: 1000000,
    validator: validate,

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  function validate(file) {
    if (file.size > 1000000)
      setError({
        open: true,
        title: "Файл слишком большой, попробуйте меньше 1 мб",
      });
  }

  useEffect(() => {
    document
      .getElementsByClassName("MuiRating-visuallyHidden")[1]
      .setAttribute("required", true);
  }, []);

  useEffect(() => {
    if (Array.isArray(reviews?.results)) {
      setRating(
        Object.entries(
          reviews?.results[reviews?.results?.length - 2].mark_rating_count
        )
      );
    }
  }, [details, added_review]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // hide linear progress
    setLoading(false);

    if (added_review.severity === 201) {
      dispatch(getProductReviews(details.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [added_review]);

  const deleteHandler = (name) => {
    setFiles((state) => state.filter((item) => item.name !== name));
  };

  const acceptedFileItems = files.map((file) => (
    <Box onClick={() => deleteHandler(file.name)} className="cover">
      <img
        src={file.preview}
        style={{
          width: 50,
          height: 50,
          borderRadius: "8px",
          objectFit: "contain",
          userSelect: "none",
        }}
        alt=""
      />
      <div className="delete_btn">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM13.414 14L15.182 15.768L13.768 17.182L12 15.414L10.232 17.182L8.818 15.768L10.586 14L8.818 12.232L10.232 10.818L12 12.586L13.768 10.818L15.182 12.232L13.414 14ZM9 4V6H15V4H9Z"
            fill="white"
          />
        </svg>
      </div>
    </Box>
  ));

  return (
    <>
      <SnackBar
        state={added_review}
        severity="201"
        txt={t("successComment")}
        setState={setAddedReview}
      />
      <RateDialog open={open} setOpen={setOpen} />
      <Box backgroundColor="#fff" display="flex" mt={4} mb={4}>
        {!md && (
          <Box
            sx={{
              borderRight: "1px solid #00000010",
              width: 344,
              p: 2,
            }}
          >
            <Box display="flex" width="100%" justifyContent="space-between">
              <div>
                <Rating
                  icon={
                    <svg
                      width="30"
                      height="28"
                      viewBox="0 0 30 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5273 1.66406L10.2266 8.41797L2.76172 9.48438C1.44141 9.6875 0.933594 11.3125 1.89844 12.2773L7.23047 17.5078L5.96094 24.8711C5.75781 26.1914 7.17969 27.207 8.34766 26.5977L15 23.0938L21.6016 26.5977C22.7695 27.207 24.1914 26.1914 23.9883 24.8711L22.7188 17.5078L28.0508 12.2773C29.0156 11.3125 28.5078 9.6875 27.1875 9.48438L19.7734 8.41797L16.4219 1.66406C15.8633 0.496094 14.1367 0.445312 13.5273 1.66406Z"
                        fill="#F7E200"
                      />
                    </svg>
                  }
                  emptyIcon={
                    <svg
                      width="30"
                      height="28"
                      viewBox="0 0 30 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5273 1.66406L10.2266 8.41797L2.76172 9.48438C1.44141 9.6875 0.933594 11.3125 1.89844 12.2773L7.23047 17.5078L5.96094 24.8711C5.75781 26.1914 7.17969 27.207 8.34766 26.5977L15 23.0938L21.6016 26.5977C22.7695 27.207 24.1914 26.1914 23.9883 24.8711L22.7188 17.5078L28.0508 12.2773C29.0156 11.3125 28.5078 9.6875 27.1875 9.48438L19.7734 8.41797L16.4219 1.66406C15.8633 0.496094 14.1367 0.445312 13.5273 1.66406Z"
                        fill="#D9D9D9"
                      />
                    </svg>
                  }
                  name="text-feedback"
                  value={Math.ceil(
                    rating
                      ?.map((item) => item[0] * item[1])
                      ?.reduce((total, amount) => total + parseInt(amount), 0) /
                      5
                  )}
                  readOnly
                  precision={0.5}
                />
              </div>
              <Typography variant="h5" fontWeight="700">
                {reviews?.results[reviews?.results?.length - 1]?.mark_avg
                  ? reviews?.results[reviews?.results?.length - 1]?.mark_avg
                  : 0}{" "}
                / 5
              </Typography>
            </Box>
            {rating?.map((item, idx) => (
              <Box
                key={idx}
                display="flex"
                mt={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2" fontWeight="400">
                  {item[0]} {t("stars")}
                </Typography>
                <svg
                  width="172"
                  height="7"
                  viewBox="0 0 172 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={item[1] * 34.4} height="7" fill="#F7E200" />
                  <rect
                    x={item[1] * 34.4}
                    width={172 - item[1] * 34.4}
                    height="7"
                    fill="#E2E7EC"
                  />
                </svg>
                <Typography variant="subtitle2" fontWeight="400">
                  {item[1]}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            background: "#FFFFFF",
            borderRadius: 1,
            p: 2,
          }}
          width={{ xs: "100%", md: "70%" }}
        >
          <Typography
            fontSize="12px"
            color="#15151550"
            pb={1}
            mb={1}
            borderBottom="1px solid #00000010"
          >
            {t("yourComment")}
          </Typography>
          <TextField
            required
            sx={{
              p: 0,
              boxShadow: "none!important",
              "& textarea": {
                p: "0!important",
              },
            }}
            fullWidth
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            variant="outlined"
            placeholder={t("txtComment")}
            multiline
          />
          <Box
            display="flex"
            borderTop="1px solid #00000010"
            pt={1}
            mt={1}
            borderBottom="1px solid #00000010"
            pb={1}
            mb={1}
            columnGap="16px"
            rowGap="16px"
            flexWrap="wrap"
          >
            {acceptedFileItems}
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />

              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="50" height="50" rx="4" fill="#F5F6F8" />
                <path
                  d="M33.0166 24.875C33.0166 25.0605 32.8682 25.1719 32.7197 25.1719H25.5947V32.2969C25.5947 32.4824 25.4463 32.6309 25.2979 32.6309C25.1123 32.6309 25.001 32.4824 25.001 32.2969V25.1719H17.876C17.6904 25.1719 17.5791 25.0605 17.5791 24.9121C17.5791 24.7266 17.6904 24.5781 17.876 24.5781H25.001V17.4531C25.001 17.3047 25.1123 17.1934 25.2979 17.1934C25.4463 17.1934 25.5947 17.3047 25.5947 17.4531V24.5781H32.7197C32.8682 24.5781 33.0166 24.7266 33.0166 24.875Z"
                  fill="#BABABA"
                />
              </svg>
            </div>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Rating
              icon={
                <svg
                  width="30"
                  height="28"
                  viewBox="0 0 30 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5273 1.66406L10.2266 8.41797L2.76172 9.48438C1.44141 9.6875 0.933594 11.3125 1.89844 12.2773L7.23047 17.5078L5.96094 24.8711C5.75781 26.1914 7.17969 27.207 8.34766 26.5977L15 23.0938L21.6016 26.5977C22.7695 27.207 24.1914 26.1914 23.9883 24.8711L22.7188 17.5078L28.0508 12.2773C29.0156 11.3125 28.5078 9.6875 27.1875 9.48438L19.7734 8.41797L16.4219 1.66406C15.8633 0.496094 14.1367 0.445312 13.5273 1.66406Z"
                    fill="#F7E200"
                  />
                </svg>
              }
              emptyIcon={
                <svg
                  width="30"
                  height="28"
                  viewBox="0 0 30 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5273 1.66406L10.2266 8.41797L2.76172 9.48438C1.44141 9.6875 0.933594 11.3125 1.89844 12.2773L7.23047 17.5078L5.96094 24.8711C5.75781 26.1914 7.17969 27.207 8.34766 26.5977L15 23.0938L21.6016 26.5977C22.7695 27.207 24.1914 26.1914 23.9883 24.8711L22.7188 17.5078L28.0508 12.2773C29.0156 11.3125 28.5078 9.6875 27.1875 9.48438L19.7734 8.41797L16.4219 1.66406C15.8633 0.496094 14.1367 0.445312 13.5273 1.66406Z"
                    fill="#E0E0E0"
                  />
                  <path
                    d="M13.5273 1.66406L12.6329 1.21683L12.6289 1.22497L13.5273 1.66406ZM10.2266 8.41797L10.368 9.40792L10.8924 9.333L11.125 8.85706L10.2266 8.41797ZM2.76172 9.48438L2.62029 8.49437L2.60966 8.496L2.76172 9.48438ZM1.89844 12.2773L1.1913 12.9845L1.19816 12.9912L1.89844 12.2773ZM7.23047 17.5078L8.21593 17.6777L8.30501 17.1611L7.93074 16.7939L7.23047 17.5078ZM5.96094 24.8711L4.97548 24.7012L4.97394 24.7101L4.97257 24.719L5.96094 24.8711ZM8.34766 26.5977L8.81023 27.4842L8.81368 27.4824L8.34766 26.5977ZM15 23.0938L15.4688 22.2105L15.0018 21.9626L14.534 22.209L15 23.0938ZM21.6016 26.5977L21.1327 27.481L21.139 27.4842L21.6016 26.5977ZM23.9883 24.8711L24.9767 24.719L24.9753 24.7101L24.9737 24.7012L23.9883 24.8711ZM22.7188 17.5078L22.0185 16.7939L21.6442 17.1611L21.7333 17.6777L22.7188 17.5078ZM28.0508 12.2773L28.7511 12.9913L28.7579 12.9845L28.0508 12.2773ZM27.1875 9.48438L27.3396 8.49596L27.3299 8.49456L27.1875 9.48438ZM19.7734 8.41797L18.8777 8.86249L19.1112 9.333L19.6311 9.40778L19.7734 8.41797ZM16.4219 1.66406L15.5197 2.09552L15.5229 2.10207L15.5261 2.10858L16.4219 1.66406ZM12.6289 1.22497L9.32812 7.97888L11.125 8.85706L14.4258 2.10315L12.6289 1.22497ZM10.0851 7.42802L2.6203 8.49443L2.90314 10.4743L10.368 9.40792L10.0851 7.42802ZM2.60966 8.496C0.434896 8.83058 -0.320345 11.4728 1.19133 12.9845L2.60554 11.5702C2.18753 11.1522 2.44792 10.5444 2.91378 10.4727L2.60966 8.496ZM1.19816 12.9912L6.53019 18.2217L7.93074 16.7939L2.59871 11.5635L1.19816 12.9912ZM6.24501 17.3379L4.97548 24.7012L6.9464 25.041L8.21593 17.6777L6.24501 17.3379ZM4.97257 24.719C4.64607 26.8413 6.90855 28.4764 8.81022 27.4842L7.88509 25.7111C7.45082 25.9376 6.86956 25.5415 6.94931 25.0232L4.97257 24.719ZM8.81368 27.4824L15.466 23.9785L14.534 22.209L7.88163 25.7129L8.81368 27.4824ZM14.5312 23.977L21.1327 27.4809L22.0704 25.7144L15.4688 22.2105L14.5312 23.977ZM21.139 27.4842C23.0407 28.4764 25.3032 26.8413 24.9767 24.719L22.9999 25.0232C23.0797 25.5415 22.4984 25.9376 22.0641 25.7111L21.139 27.4842ZM24.9737 24.7012L23.7042 17.3379L21.7333 17.6777L23.0028 25.041L24.9737 24.7012ZM23.419 18.2217L28.7511 12.9912L27.3505 11.5635L22.0185 16.7939L23.419 18.2217ZM28.7579 12.9845C30.2696 11.4728 29.5143 8.83058 27.3396 8.496L27.0354 10.4727C27.5013 10.5444 27.7617 11.1522 27.3437 11.5702L28.7579 12.9845ZM27.3299 8.49456L19.9158 7.42816L19.6311 9.40778L27.0451 10.4742L27.3299 8.49456ZM20.6692 7.97345L17.3176 1.21955L15.5261 2.10858L18.8777 8.86249L20.6692 7.97345ZM17.324 1.23261C16.4093 -0.679997 13.6174 -0.752213 12.6329 1.21685L14.4218 2.11128C14.656 1.64284 15.3173 1.67218 15.5197 2.09552L17.324 1.23261Z"
                    fill="#B4B4B4"
                  />
                </svg>
              }
              required
              value={formik.values.mark}
              name="mark"
              onChange={formik.handleChange}
              defaultValue={5}
              size="medium"
            />
            <Button
              size="small"
              textAlign="end"
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
              sx={{
                width: { xs: "100%", md: "fit-content" },
                mt: { xs: 2, md: 0 },
              }}
            >
              {t("leaveComment")}
            </Button>
          </Box>
        </Box>
      </Box>
      <TransitionGroup>
        {reviews?.results
          ?.filter((item) => item.id)
          .map((item) => (
            <Collapse
              key={item.id}
              style={{
                marginBottom: 16,
              }}
            >
              <Box
                sx={{
                  background: "#FFFFFF",
                  p: 2,
                  borderRadius: 1,
                  "&:last-child": { mb: 0 },
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="400">
                    {item.full_name}
                  </Typography>
                  <div className="d-flex">
                    <Typography variant="body2" fontWeight="400">
                      {new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(item?.date))}
                    </Typography>
                    <Box display="flex" ml={2} mr={2} columnGap="8px">
                      {Array.from(Array(item.mark).keys()).map(() => (
                        <StarIcon />
                      ))}
                    </Box>
                    <Typography variant="body2" whiteSpace="nowrap">
                      {item.mark} / 5
                    </Typography>
                  </div>
                </Box>
                <Typography
                  mt={2}
                  mb={2}
                  variant="body2"
                  color="#151515"
                  lineHeight="17px"
                  whiteSpace="pre-wrap"
                >
                  {item?.comment}
                </Typography>

                <Box
                  display="flex"
                  columnGap="16px"
                  rowGap="16px"
                  flexWrap="wrap"
                >
                  {item?.images?.map((item, idx) => (
                    <Box
                      data-fancybox={`gallery-${idx}`}
                      position="relative"
                      data-src={item?.image}
                      component="img"
                      sx={{
                        width: "68px",
                        height: "66px",
                        borderRadius: 0.5,
                      }}
                      src={item?.image}
                      alt=""
                    />
                  ))}
                </Box>
              </Box>
            </Collapse>
          ))}
      </TransitionGroup>
    </>
  );
};

export default Reviews;
