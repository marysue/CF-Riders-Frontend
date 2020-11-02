import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Figure from 'react-bootstrap/Figure';
import SearchBar from './SearchBar';
import { Redirect } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const ProductsPage = (props) => {
    console.log("received props:  ", props);
    const bicycleArr = useSelector(state => state.bicycles.bicycleList);
    const accessoryArr = useSelector(state => state.accessories.accessoryList);
    const clothingArr = useSelector(state => state.clothing.clothingList);
    const [productDetail, setProductDetail] = useState(undefined);

    let listItemArr = undefined;
    let listItemType;



    switch (props.productSelected) {
        case "Bicycles" : {
             listItemArr = bicycleArr;
             listItemType = "Bicycles"
            break;
        }
        case "Accessories" : {
             listItemArr = accessoryArr;
             listItemType = "Accessories"
            break;
        }
        case "Clothing" : {
             listItemArr = clothingArr;
             listItemType = "Clothing";
            break;
        }

        default : {
            listItemArr = undefined;
            listItemType = undefined;
        }
    }


    const handleClick = (e) => {
        e.preventDefault();
        const targetItem = parseInt(e.target.id);
        const prodDetail = listItemArr.filter( item => {
            const thisItem = parseInt(item.id);
            if (thisItem === targetItem) return item;
        });
        setProductDetail(prodDetail[0]);
        console.log("Found productDetail:  ", productDetail);
    }


    if (listItemArr === undefined) {
        console.log("listItemArr is undefined...");
        return
    } else if (productDetail) {
        console.log("Should be redicrecting to product detail now ...");
        return ( <Redirect
            to={{
                pathname: "/productDetail",
               state: { props: productDetail}
            }}
            />)
    //    return ( <ProductDetail props={productDetail}></ProductDetail> );
    } else {
        console.log("redrawing productGrid...");
    return (
        <>
            <SearchBar></SearchBar>
            <div className="productGrid" onClick={handleClick}>
                {listItemArr.map( (item, idx) => {
                    const id = item.id;
                    const name = item.name;
                    const photoURL = item.photoURL;
                    const price = item.price.toFixed(2);
                    return (
                        <div className="productItem" key={id}>
                            <img id={id-idx} key={id} src={photoURL} alt={listItemType}></img>
                            <Figure.Caption>{name}</Figure.Caption>
                            <span className="price">${price}</span>
                        </div>
                    )
                })};
            </div>
        </>
    );

}};

export default ProductsPage;
