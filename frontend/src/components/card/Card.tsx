import * as S from "./Card.style";
import { Book } from "../../types";
import { Switch } from "@mui/material";

interface Iprops {
  book: Book;
  onSwitchChanged: (book: Book) => void
}

export const Card = ({ book, onSwitchChanged }: Iprops) => {
  return (
    <S.Card>
      <img src={book.image} alt="" />
      <S.CardInfo>
        <S.Text size="20px" bold="700">{book.title}</S.Text>
        <S.Text size="13px" color="grey"> {book.description}</S.Text>
        <S.Text size="13px" color="grey"> {book.category}</S.Text>
        <S.Text size="12px"> Wrote by {book.authorName} </S.Text>
        <S.Text size="12px" bold="700">{book.price}$ </S.Text>
      </S.CardInfo>
      <Switch checked={book.isActive} onChange={() => onSwitchChanged({ ...book, isActive: !book.isActive })} />
      <S.Text size="12px">active</S.Text>
    </S.Card>
  );
};

