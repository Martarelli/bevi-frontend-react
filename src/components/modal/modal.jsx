import PropTypes from 'prop-types';  

function Modal({isOpen, children}) {
    
    Modal.propTypes = {
        isOpen:PropTypes.bool.isRequired,
        children: PropTypes.array
    };

    const BACKGROUND_STYLE = {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex : '1000'
    }

    const MODAL_STYLE = {
        position: 'fixed',
        width: '50%',
        top: '5rem',
        padding: '5rem',
        backgroundColor: '#fff',
        borderRadius: '1rem'
    }

    if (isOpen) {
        return (
            <div style={BACKGROUND_STYLE}>
                <div style={MODAL_STYLE}>
                    {children}  
                </div>
            </div>
        )   
    }
    return null;
}

export default Modal