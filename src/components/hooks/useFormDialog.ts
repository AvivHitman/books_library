import { object, string, number } from 'yup';
import { useAppSelector } from '../../store/hooks';
import { selectAuthors } from '../../store';
import { Field, bookCategory } from '../../types';


export const useFormDialog = () => {
    const authors = useAppSelector(selectAuthors);

    const bookValidationSchema = object().shape({
        title: string().required().test("", "This book is already exist in the author books list", (value, context) => isBookUniq(value, context.parent.authorName)),
        price: number().min(10, 'Price must be between 10-100').max(100, 'Price must be between 10-100'),
        description: string().required(),
        category: string().required(),
        image: string().required(),
        authorName: string().required()
    });

    const authorValidationSchema = object().shape({
        name: string().required().test("", "This author is alreadt exist", (name) => isAuthorNameUniq(name)),
        age: number().min(20, 'Age must be between 10-100').max(100, 'Age must be between 10-100').typeError('A number is required'),
        country: string().required(),
        picture: string().required(),
    });

    const isBookUniq = (bookTitle: string, authorName: string) => {
        const author = authors.find(author => author.name === authorName);
        const book = author?.booksList.find(book => book.title === bookTitle);
        return book ? false : true;
    }

    const isAuthorNameUniq = (authorName: string) => {
        const author = authors.find(author => author.name === authorName);
        return author ? false : true;
    }

    const defaultInputValuesBook = {
        title: '',
        description: '',
        price: "",
        category: "",
        image: "",
        authorName: "",
    };

    const defaultInputValuesAuthor = {
        name: '',
        country: '',
        age: "",
        booksList: [],
        picture: "",
    };

    const addBookFields = (authorsNames: string[]): Field[] => {
        return [
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "text" },
            { name: "price", label: "Price", type: "number" },
            { name: "image", label: "Image", type: "url" },
            {
                name: "category",
                label: "Category",
                type: "text",
                options: Object.values(bookCategory)
            },
            {
                name: "authorName",
                label: "Author Name",
                type: "text",
                options: authorsNames
            },
        ];
    }

    const addAuthorFields: Field[] =
        [
            { name: "name", label: "Name", type: "text" },
            { name: "age", label: "Age", type: "number" },
            { name: "country", label: "Country", type: "text" },
            { name: "picture", label: "Picture", type: "url" },
        ];

    return {
        bookValidationSchema,
        defaultInputValuesBook,
        defaultInputValuesAuthor,
        authorValidationSchema,
        addBookFields,
        addAuthorFields
    }
}