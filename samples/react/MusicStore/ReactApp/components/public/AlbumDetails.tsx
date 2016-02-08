import * as React from 'react';
import { Link } from 'react-router';
import { provide } from '../../fx/TypedRedux';
import { ApplicationState }  from '../../store';
import * as AlbumDetailsState from '../../store/AlbumDetails';

interface RouteParams {
    albumId: number;
}

class AlbumDetails extends React.Component<AlbumDetailsProps, void> {
    componentWillMount() {
        this.props.requestAlbumDetails(this.props.params.albumId);
    }

    componentWillReceiveProps(nextProps: AlbumDetailsProps) {
        if (nextProps.params.albumId !== this.props.params.albumId) {
            nextProps.requestAlbumDetails(nextProps.params.albumId);
        }
    }

    public render() {
        if (this.props.isLoaded) {
            const albumData = this.props.album;
            return <div>
                <h2>{ albumData.Title }</h2>
                
                <p><img alt={ albumData.Title } src={ albumData.AlbumArtUrl } /></p>
                
                <div id="album-details">
                    <p>
                        <em>Genre:</em>
                        { albumData.Genre.Name }
                    </p>
                    <p>
                        <em>Artist:</em>
                        { albumData.Artist.Name }
                    </p>
                    <p>
                        <em>Price:</em>
                        ${ albumData.Price.toFixed(2) }
                    </p>
                    <p className="button">
                        Add to cart
                    </p>
                </div>
            </div>;
        } else {
            return <p>Loading...</p>;
        }
    }
}

// Selects which part of global state maps to this component, and defines a type for the resulting props
const provider = provide(
    (state: ApplicationState) => state.albumDetails,
    AlbumDetailsState.actionCreators
).withExternalProps<{ params: RouteParams }>();
type AlbumDetailsProps = typeof provider.allProps;
export default provider.connect(AlbumDetails);