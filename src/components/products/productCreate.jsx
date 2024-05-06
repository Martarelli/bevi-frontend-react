import React from 'react'

function ProductCreate({isOpen}) {

    if(isOpen){
        return (
          <div>productCreate</div>
        )
    } else {
        return null;
    }
}

export default ProductCreate