import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

export const Modal = ({ alt, largeImage, onClick }) => {
    return (
        <Overlay>
            <ModalStyled>
                <img src={largeImage}
                alt={alt}
                loading="lazy"/>
            </ModalStyled>
        </Overlay>
    )
};

Modal.propTypes = {
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
}