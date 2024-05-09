import PropTypes from 'prop-types';  
import '../../styles/loading.css'

function Loading({isOpen}) {
    Loading.propTypes = {
        isOpen:PropTypes.bool.isRequired,
    };

    const BACKGROUND_STYLE = {
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.98)',
    } 

    const LOADING_STYLE = {
        animation: 'is-rotating 1s infinite',
        width: '4rem',
        height: '4rem',
        border: '3px solid #24CCDB',
        borderTopColor: 'rgba(34, 35, 68, 1)',
        borderRadius: '200rem',
    }

    if (isOpen) {
        return (
            <div className='position-fixed d-flex align-items-center justify-content-center z-3' style={BACKGROUND_STYLE}>
                <div className='loading__animation' style={LOADING_STYLE}></div>
            </div>
        )
    }
    return null;
}

export default Loading