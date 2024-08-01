import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import { Field } from "../../types";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

interface IProps {
    formTitle: string;
    onSubmitClick: (data: object) => void;
    fields: Field[];
    defaultInputValues: object
    validationSchema: ObjectSchema<any>
}


export const FormDialog = ({ onSubmitClick, fields, formTitle, defaultInputValues, validationSchema }: IProps) => {
    const [values, setValues] = useState(defaultInputValues);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setValues(defaultInputValues);
        }
    }, [open]);

    const handleChange = (value: object) => {
        setValues(value);
    };

    const handleOnSubmit = () => {
        onSubmitClick(values);
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "all"
    });

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
                style={{ margin: "5px" }}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {formTitle}
            </Button>
            <Dialog open={open}>
                <DialogContent>
                    {fields.map((field) =>
                        field.options ? (
                            <TextField
                                key={field.name}
                                id={field.name}
                                select
                                label={field.label}
                                fullWidth
                                variant="standard"
                                type={field.type}
                                {...register(field.name)}
                                error={errors[field.name] ? true : false}
                                helperText={errors[field.name]?.message?.toString()}
                                onChange={(event) => handleChange({ ...values, [field.name]: event.target.value })}
                            >
                                {field.options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <TextField
                                key={field.name}
                                id={field.name}
                                label={field.label}
                                type={field.type}
                                fullWidth
                                variant="standard"
                                {...register(field.name)}
                                error={errors[field.name] ? true : false}
                                helperText={errors[field.name]?.message?.toString()}
                                onChange={(event) => handleChange({ ...values, [field.name]: event.target.value })}
                            />
                        )
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit(handleOnSubmit)} type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};