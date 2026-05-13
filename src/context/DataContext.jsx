import axios from "axios";
import { createContext, useContext, useState } from "react";


export const DataContext = createContext(null);

export const DataProvider = ({children})=>{
    const [data, setData] = useState();

    //Fetching all Products from the API
    const fetchAllProducts = async() => {
    try {
        const [laptops, phones, tablets] = await Promise.all([
            axios.get('https://dummyjson.com/products/category/laptops'),
            axios.get('https://dummyjson.com/products/category/smartphones'),
            axios.get('https://dummyjson.com/products/category/tablets'),
        ])
        const productsData = [
            ...laptops.data.products,
            ...phones.data.products,
            ...tablets.data.products,
        ]
        setData(productsData)
    } catch (error) {
        console.log(error);
    }
}

    const getUniqueCategory = (data, property) => {
            let newVal = data?.map((curElem) => {
                return curElem[property]
            })
            newVal = ["All",...new Set(newVal)]
            return newVal
        }
    
        const categoryOnlyData = getUniqueCategory(data, 'category')
        const brandOnlyData = getUniqueCategory(data, 'brand')
    return<DataContext.Provider value={{data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData}}>
        {children}
    </DataContext.Provider>

}

export const getData = ()=> useContext(DataContext)
