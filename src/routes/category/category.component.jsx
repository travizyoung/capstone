import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, Fragment } from "react";

import { selectCategories } from "../../store/category/category.selector";

import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

function Category() {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategories);
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
      <div className="category-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
}

export default Category;
