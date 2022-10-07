import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preivew/categories-preview";
import Category from "../category/category.component";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { setCategoriesMap } from "../../store/category/category.actions";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoriesMap));
    };

    getCategoriesMap();
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  );
};

export default Shop;
