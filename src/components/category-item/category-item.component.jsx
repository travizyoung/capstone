import { CategoryContainer, Background, Body } from "./category-item.style";
import { useNavigate } from "react-router-dom";

function CategoryItem({ category: { imageUrl, title, route } }) {
  const navigate = useNavigate();
  const onNavigateHandler = () => {
    navigate(route);
  };
  return (
    <CategoryContainer onClick={onNavigateHandler}>
      <Background imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </CategoryContainer>
  );
}

export default CategoryItem;
