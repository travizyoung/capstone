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
import { CategoryItem } from "../../store/category/category.types";

type CategoryRouteParams = {
  category: string;
};

function Category() {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const products = categoriesMap[category] || [];
    setProducts(products);
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
