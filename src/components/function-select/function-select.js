import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";

export default function FunctionSelect({ onChange, control }) {
  return (
    <Controller
      as={
        <Autocomplete
          options={functions}
          getOptionLabel={(option) => option}
          renderOption={(option) => <span>{option}</span>}
          renderInput={(params) => (
            <TextField {...params} label="Selecione uma função" />
          )}
        />
      }
      onChange={([, data]) => data}
      name="function"
      control={control}
      defaultValue={"DEV"}
    />
  );
}

const functions = ["DEV", "QA", "PO", "Tech Leader"];
