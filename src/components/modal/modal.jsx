import PropTypes from 'prop-types';  

function Modal({isOpen, children}) {
    
    Modal.propTypes = {
        isOpen:PropTypes.bool.isRequired,
        children: PropTypes.array
    };

    const BACKGROUND_STYLE = {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex : '1000'
    }

    const MODAL_STYLE = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        width: '50%',
        top: '5rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
    }

    const MODAL_STYLE_MOBILE = {
        ...MODAL_STYLE,
        width: '95%',
    };

    if (window.innerWidth < 768) {
        Object.assign(MODAL_STYLE, MODAL_STYLE_MOBILE);
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