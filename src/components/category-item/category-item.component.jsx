import { CategoryContainer, Background, Body } from "./category-item.style";

function CategoryItem({ category: { imageUrl, title } }) {
  return (
    <CategoryContainer>
      <Background imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </CategoryContainer>
  );
}

export default CategoryItem;
