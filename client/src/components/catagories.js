import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { selectTheme } from "../features/appSlice";
import { useSelector } from "react-redux";

const Catagories = ({ selectedCategory, setCategory }) => {
  const theme = useSelector(selectTheme);
  const [allCatagories, setAllCatagories] = useState([]);
  const catagoriesContainer = React.useRef();

  const handleSetCategory = (e, categoryName) => {
    setCategory(categoryName);
    console.log(selectedCategory);
  };

  useEffect(() => {
    async function getCatagories() {
      try {
        let response = await fetch("/api/settings/");
        let settings = await response.json();
        const settingsData = await settings[0];
        setAllCatagories(settingsData.catagories);
        console.log(settingsData.catagories);
      } catch (err) {
        console.log(err);
      }
    }
    getCatagories();
  }, []);
  return (
    <Container className="no-scroll" theme={theme} ref={catagoriesContainer}>
      <Category
        className={selectedCategory === "الكل" ? "selected" : ""}
        theme={theme}
        onClick={(e) => handleSetCategory(e, "الكل")}
      >
        الكل
      </Category>
      {allCatagories.map((category, index) => {
        return (
          <Category
            className={selectedCategory === category.name ? "selected" : ""}
            theme={theme}
            key={index}
            onClick={(e) => handleSetCategory(e, category.name)}
          >
            {category.name}
          </Category>
        );
      })}
    </Container>
  );
};

export default Catagories;

const Container = styled.div`
  position: relative;
  top: 70px;
  overflow-x: scroll;
  width: 100%;
  padding: 1rem 2rem;
  padding-top: 30px;
  color: red;
  display: flex;
  background: ${({ theme }) => theme.primary};
`;

const Category = styled.div`
  padding: 10px 15px;
  border: dotted ${({ theme }) => theme.contrast} 1px;
  margin: 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.contrast};
  background: ${({ theme }) => theme.primary};

  img {
    width: 15px;
    height: 15px;
    margin: 0 5px;
  }

  &:hover {
    opacity: 0.5;
  }

  &.selected {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
  }
`;
