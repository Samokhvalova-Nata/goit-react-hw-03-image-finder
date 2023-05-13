import PropTypes from 'prop-types';
import { Header, FormStyled, Button, SearchIcon, ButtonLabel, Input, Error } from './Searchbar.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';


const schema = yup.object().shape({
    search: yup.string().required(),
})

const initialValues = {
    search: '',
};

export const Searchbar = ({ onSubmit }) => {
    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        if (values.search.trim() === '') {
            alert('Sorry, enter something in search line.');
            resetForm();
            return;
        }
        onSubmit({ ...values });
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues} 
            onSubmit={handleSubmit}
            validationSchema={schema}>
            <Header>
                    <FormStyled autoComplete="off">
                        <Button type="submit"
                            aria-label="Search">
                            <SearchIcon size={20}/>
                            <ButtonLabel>Search</ButtonLabel>
                        </Button>
                        <Input
                            type="text"
                            name="search"
                            autoFocus
                            placeholder="Search images and photos" />
                        <ErrorMessage name="search" />
                    </FormStyled>
                </Header>
        </Formik>
    )
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}