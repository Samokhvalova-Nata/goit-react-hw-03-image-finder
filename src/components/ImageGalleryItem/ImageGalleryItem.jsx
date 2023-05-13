import PropTypes from 'prop-types';
import { Component } from "react";
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';

export class ImageGalleryItem extends Component {
    state = {
        isShowModal: false,
    };

    handleOpenModal = () => {
        this.setState(state => ({
            isShowModal: true,
        })); 
    };

    handleCloseModal = () => {
        this.setState(state => ({
            isShowModal: false,
        })); 
    };

    render() {
        const { url, alt, largeImage } = this.props
        return (
            <>
            <Item onClick={this.handleOpenModal}>
                <Image
                    src={url}
                    alt={alt}
                    loading="lazy" />
                </Item>
                {this.state.isShowModal && <Modal
                    alt={alt}
                    largeImage={largeImage}
                    onClick={this.handleCloseModal}
                />}
            </>
        )
    }
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
}