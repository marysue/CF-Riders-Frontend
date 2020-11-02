import React from 'react';
import SearchBar from './SearchBar';

const ProductDetail = (props) => {
   // const { productDetail } = props;
   const productDetail = props.location.state.props;
    console.log("Received props:  ", productDetail);
    //console.log("Props received in product detail page:  ", productDetail);
    return (
        <div>
            <SearchBar></SearchBar>
            <h2>{productDetail.name}</h2>
            <img src={productDetail.photoURL} alt="product detail"></img>

            <p>{productDetail.description}</p>

        </div>
    )
}

export default ProductDetail;
