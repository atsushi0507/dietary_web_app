import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterMealForm = ({ open, onClose, onSubmit, error, isLoading }) => {
    const initialFormData = {
        menu: "",
        cal: "",
        protein: "",
        fat: "",
        carb: "",
        volume: "",
      };
    const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData); // 親コンポーネントの処理を呼び出す
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="meal-registration-form"
    >
      <DialogTitle>{"新しいメニューを登録"}</DialogTitle>
      <DialogContent>
        {isLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
            <p>リクエスト中です...</p>
          </div>
        ) : (
        <>
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
            name="carb"
            fullWidth
            variant="outlined"
            type="number"
            value={formData.carb}
            onChange={handleChange}
            error={!!error?.carb}
            helperText={error?.carb}
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
        </>
        )}
      </DialogContent>

      {!isLoading && ( // ローディング中はボタン非表示
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            キャンセル
          </Button>
          <Button onClick={handleSubmit} color="primary">
            登録
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default RegisterMealForm;
