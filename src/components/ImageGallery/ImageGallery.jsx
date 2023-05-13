import PropTypes from 'prop-types';
import { Component } from "react";
import { Button } from '../Button';
import { Loader } from '../Loader';
import { fetchGalleryWithQuery } from '../../services/pixabay-api';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
// import { Modal } from 'components/Modal';

export class ImageGallery extends Component {
    state = {
        gallery: [],
        error: null,
        status: null,
        page: 1,
        // isShowModal: false,
    };

    async componentDidUpdate(prevProps, prevState) {
        const prevSearchQuery = prevProps.query;
        const nextSearchQuery = this.props.query;

        if (prevSearchQuery !== nextSearchQuery) {
            this.setState({ status: 'pending' });

            try {
                const { hits } = await fetchGalleryWithQuery(nextSearchQuery, 1);
                this.setState(prevState => {
                    return {
                        gallery: hits,
                        status: 'resolved',
                        page: prevState.page + 1,
                    }
                });
            } catch (error) {this.setState({ error, status: 'rejected' });}
        };
    };

    loadMoreHandler = async () => { 

        try {
            const { hits } = await fetchGalleryWithQuery(this.props.query, this.state.page);
            this.setState(prevState => {
                    return {
                        gallery: [...prevState.gallery, ...hits],
                        page: prevState.page + 1,
                    }
                });
        } catch (error) {this.setState({ error, status: 'rejected' });}
    };

    render() {
        const { gallery, error, status, isShowModal } = this.state;

        if (status === 'pending') {
            return <Loader/>
        };

        if (status === 'rejected') {
            return <p>{error.message}</p>
        };

        if (status === 'resolved') {
            return <>
                <Gallery>
                {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
                    <ImageGalleryItem
                        key={id}
                        url={webformatURL}
                        alt={tags}
                        largeImage={largeImageURL}
                    />
                ))}
                </Gallery>

                <Button onClick={this.loadMoreHandler} />
            </>

        }
    }
}

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
}