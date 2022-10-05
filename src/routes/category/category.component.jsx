import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categoryProducts = categoriesMap[category] || [];
    setProducts(categoryProducts);
  }, [category, categoriesMap]);

  return (
    <div className="category-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Category;
