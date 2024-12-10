import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterMealForm = ({ open, onClose, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    menu: "",
    cal: "",
    protein: "",
    fat: "",
    carbs: "",
    volume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData); // 親コンポーネントの処理を呼び出す
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="meal-registration-form"
    >
      <DialogTitle>{"新しいメニューを登録"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="メニュー名"
          name="menu"
          fullWidth
          variant="outlined"
          value={formData.menu}
          onChange={handleChange}
          error={!!error?.menu}
          helperText={error?.menu} // エラーメッセージを表示
        />
        <TextField
          margin="dense"
          label="100gあたりのカロリー (kcal)"
          name="cal"
          fullWidth
          variant="outlined"
          type="number"
          value={formData.cal}
          onChange={handleChange}
          error={!!error?.cal}
          helperText={error?.cal}
        />
        <TextField
          margin="dense"
          label="タンパク質 (g)"
          name="protein"
          fullWidth
          variant="outlined"
          type="number"
          value={formData.protein}
          onChange={handleChange}
          error={!!error?.protein}
          helperText={error?.protein}
        />
        <TextField
          margin="dense"
          label="脂質 (g)"
          name="fat"
          fullWidth
          variant="outlined"
          type="number"
          value={formData.fat}
          onChange={handleChange}
          error={!!error?.fat}
          helperText={error?.fat}
        />
        <TextField
          margin="dense"
          label="炭水化物 (g)"
          name="carbs"
          fullWidth
          variant="outlined"
          type="number"
          value={formData.carbs}
          onChange={handleChange}
          error={!!error?.carbs}
          helperText={error?.carbs}
        />
        <TextField
          margin="dense"
          label="一人前の量 (g)"
          name="volume"
          fullWidth
          variant="outlined"
          type="number"
          value={formData.volume}
          onChange={handleChange}
          error={!!error?.volume}
          helperText={error?.volume}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          キャンセル
        </Button>
        <Button onClick={handleSubmit} color="primary">
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterMealForm;
