import { Button, Dialog, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const RateDialog = ({ open, setOpen }) => {
  const [value, setValue] = useState(0);
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Typography
        variant="subtitle2"
        fontWeight="700"
        textAlign="center"
        mt={1}
        mb={2}
      >
        Оценить товар
      </Typography>
      <Typography variant="body1" mb={2} color="#15151570" textAlign="center">
        Как вы оцените данный товар?
      </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        defaultValue={5}
        size="large"
      />
      <Box
        mt={2}
        borderTop="1px solid #00000010"
        display="flex"
        pt={2}
        justifyContent="space-between"
      >
        <Button fullWidth color="success" onClick={() => setOpen(false)}>
          <Typography variant="body2" color="#151515">
            Отмена
          </Typography>
        </Button>
        <Button
          fullWidth
          onClick={() => {
            setOpen(false);
          }}
        >
          <Typography variant="body2" color="#E32967">
            ОЦЕНИТЬ
          </Typography>
        </Button>
      </Box>
    </Dialog>
  );
};

export default RateDialog;
