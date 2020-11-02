import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import ProductGrid from './ProductGrid';
import { baseUrl } from './config';
import { setBicycleList, setBicyclesLoaded } from './store/bicycles';
import { setClothingList, setClothingLoaded } from './store/clothing';
import { setAccessoryList, setAccessoriesLoaded } from './store/accessories';
import Figure from 'react-bootstrap/Figure'
import ProductsPage from './ProductsPage';

const ProductsBrowser = (props) => {
    const dispatch = useDispatch();


    // const accessoriesLoaded = useSelector(state => state.accessories.accessoriesLoaded);
    // const bicyclesLoaded = useSelector(state=> state.bicycles.bicyclesLoaded);
    // const clothingLoaded = useSelector(state=> state.clothing.clothingLoaded);
    const [loaded, setLoaded] = useState(false);
    const [bicycleURL, setBicycleURL] = useState('');
    const [accessoryURL, setAccessoryURL] = useState('');
    const [clothingURL, setClothingURL] = useState('');
    const [productsSelected, setProductsSelected] = useState('');


    useEffect( () => {
        async function fetchAccessories() {
            try {
                const response = await fetch(`${baseUrl}/accessories/accessoriesList`, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const { accessoriesList } = await response.json();
                    dispatch(setAccessoryList(accessoriesList));
                    dispatch(setAccessoriesLoaded(true));
                    setAccessoryURL(accessoriesList[0].photoURL);
                    console.log("Fetch returned Accessories with AccessoryPhotoURL:  ", accessoryURL);
                } else {
                    throw response.status;
                }
            } catch (e) {
                console.log("Accessory fetch error: ", e);
            }

        }
        fetchAccessories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect( () => {
        async function fetchBicycles() {
            try {
                const response = await fetch(`${baseUrl}/bicycles/bicyclesList`, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const { bicyclesList } = await response.json();
                    dispatch(setBicycleList(bicyclesList));
                    dispatch(setBicyclesLoaded(true));
                    setBicycleURL(bicyclesList[0].photoURL);
                    console.log("Fetch returned Bicycles with BicycleURL:  ", bicycleURL);
                } else {
                    throw response.status;
                }
            } catch (e) {
                console.log("Bicycle fetch error: ", e);
            }
        }
        fetchBicycles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect( () => {
        async function fetchClothing() {
            try {
                const response = await fetch(`${baseUrl}/clothing/clothingList`, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const { clothingList } = await response.json();
                    dispatch(setClothingList(clothingList));
                    dispatch(setClothingLoaded(true));
                    setClothingURL(clothingList[0].photoURL);
                    console.log("Fetch returned Clothing with clothingURL:  ", clothingURL);
                } else {
                    throw response.status;
                }
            } catch (e) {
                console.log("clothing fetch error:  ", e);
            }
        }
        fetchClothing();
        setLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

        const handleClick = (e) => {
            console.log("Clicked on : ", e.target.id);
            setProductsSelected(e.target.id);
        }


    if (!loaded) {
        return null
    }

    if (productsSelected) {
        console.log("Products selected:  ", productsSelected);
        return <ProductsPage productSelected={productsSelected}></ProductsPage>
    } else {
        return (
            <>
                <SearchBar></SearchBar>
                <div className="productBanner">
                    <div className="photoSpread">
                        <div className="productPhoto" onClick={handleClick} >
                        <img id="Bicycles" src={bicycleURL} alt="Bicycle"></img>
                        <Figure.Caption>Bicycles</Figure.Caption>
                        </div>
                        <div className="productPhoto" onClick={handleClick}>
                            <img id="Clothing" src={clothingURL} alt="Clothing"></img>
                            <Figure.Caption>Clothing</Figure.Caption>
                        </div>
                        <div className="productPhoto" onClick={handleClick}>
                            <img id="Accessories" src={accessoryURL} alt="Accessory"></img>
                            <Figure.Caption>Accessories</Figure.Caption>
                        </div>
                    </div>
                </div>
                <h2>Recommended in Bicycles</h2>
            <ProductGrid category={"Bicycles"} limit={5}> </ProductGrid>
            <h2>Recommended in Clothing</h2>
            <ProductGrid category={"Clothing"} limit={5}> </ProductGrid>
            <h2>Recommended in Accessories</h2>
            <ProductGrid category={"Accessories"} limit={5}></ProductGrid>
            </>


    )};
}

export default ProductsBrowser;
