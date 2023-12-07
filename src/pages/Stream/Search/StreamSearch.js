import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// import { getProducts } from "../redux/reducers/products";
import { getProducts } from "../../../redux/reducers/products";

const StreamSearch = ({ setLoading, t, mobile, search, setSearch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [streamProduct , setStreamProduct]=useState("")

    // const setSearch =(e)=>{
    //     dispatch(getProducts(`?search=${search}`));
    // }
    return (
        <Box
            component="form"
            width={"100%"}
            sx={{margin: "40px 0" ,"& button": { border: "none"} }}
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(getProducts(`?search=${streamProduct}`));
            }}
        >
            <TextField
                type="text"
                required
                value={streamProduct}
                onChange={(e) => setStreamProduct(e.target.value)}
                sx={{
                    "&.MuiFormControl-root": {
                        boxShadow: "none!important",
                        background: "#F2F2F3",
                        borderRadius: "1000px",

                        "& .MuiInputBase-root": {
                            pr: 0,
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                            borderRadius: "1000px",
                        },
                    },
                    width: { xs: "100%" },
                }}
                variant="outlined"
                placeholder={t("whatToFind")}
                InputProps={{
                    endAdornment: (
                        <button type="submit" aria-label="search">
                            <InputAdornment position="end">
                                <svg
                                    style={{ zIndex: 1, marginRight: 1 }}
                                    width="46"
                                    height="46"
                                    viewBox="0 0 46 46"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width="46" height="46" rx="23" fill="#282B3D" />
                                    <path
                                        d="M29.6719 27.8906L26.3906 24.6094C27.1289 23.5156 27.5117 22.1484 27.3203 20.6719C26.9648 18.1562 24.9141 16.1328 22.4258 15.8047C18.707 15.3398 15.5625 18.4844 16.0273 22.2031C16.3555 24.6914 18.3789 26.7422 20.8945 27.0977C22.3711 27.2891 23.7383 26.9062 24.8594 26.168L28.1133 29.4492C28.5508 29.8594 29.2344 29.8594 29.6719 29.4492C30.082 29.0117 30.082 28.3281 29.6719 27.8906ZM18.1602 21.4375C18.1602 19.5234 19.7188 17.9375 21.6602 17.9375C23.5742 17.9375 25.1602 19.5234 25.1602 21.4375C25.1602 23.3789 23.5742 24.9375 21.6602 24.9375C19.7188 24.9375 18.1602 23.3789 18.1602 21.4375Z"
                                        fill="white"
                                    />
                                </svg>
                            </InputAdornment>
                        </button>
                    ),
                }}
            />
        </Box>
    );
};

export default StreamSearch;
