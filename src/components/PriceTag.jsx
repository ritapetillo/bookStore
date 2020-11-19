import React from 'react'

function PriceTag({price,text}) {
    return (
      <div className="singleBookPage__price-tag d-flex flex-column justify-content-center">
        <span>{text}</span>
        <span>$ {price}</span>
      </div>
    );
}

export default PriceTag
