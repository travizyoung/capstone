import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, Fragment } from "react";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/category/category.selector";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import "./category.styles.scss";

function Category() {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categoryProducts = categoriesMap[category] || [];
    setProducts(categoryProducts);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h1
        style={{
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {category}
      </h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default Category;
