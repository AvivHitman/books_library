import TextField from "@mui/material/TextField";
import * as S from "./Search.style";

interface Iprops {
    onChange: (event: any) => void,
    label: string
}

const Search = ({ onChange, label }: Iprops) => {
    return (
        <S.SearchContainer >
            <TextField fullWidth margin="normal" variant="standard"
                onChange={onChange} label={label} />
        </S.SearchContainer>)
}

export default Search;