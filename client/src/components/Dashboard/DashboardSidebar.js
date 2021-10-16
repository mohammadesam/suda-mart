import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
function DashboardSidebar({ selectedId }) {
  let parentElement = useRef();
  let history = useHistory();
  // let initialState = parentElement.children[selectedId];

  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    let allElement = parentElement.current.children;
    setSelectedItem(allElement[selectedId].children[0]);
    for (let i = 0; i < allElement.length; i++) {
      allElement[i].className = " ";
    }
    allElement[selectedId].className = "selected";
  }, []);

  let handleMenuSelections = (newSelection, dist) => {
    let currentElement =
      selectedItem.current === undefined ? selectedItem : selectedItem.current;
    let newElement =
      newSelection.tagName === "svg"
        ? newSelection
        : newSelection.parentElement;
    currentElement.parentElement.className = "";
    newElement.parentElement.className = "selected";
    setSelectedItem(newElement);
    history.push("/dashboard/" + dist);
  };
  return (
    <SideBar>
      <div ref={parentElement} key={5465345}>
        <div key="1" id="0">
          <svg
            id="general"
            onClick={(e) => handleMenuSelections(e.target, "")}
            aria-hidden="true"
            role="img"
            width="35"
            height="35"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024"
          >
            <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z" />
          </svg>
        </div>
        <div key="2" id="1">
          <svg
            onClick={(e) => handleMenuSelections(e.target, "products")}
            aria-hidden="true"
            id="products"
            role="img"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 20 20"
          >
            <path d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.94 4.94 0 0 1 12 1c2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z" />
          </svg>
        </div>
        <div key="3" id="2">
          <svg
            onClick={(e) => handleMenuSelections(e.target, "user")}
            aria-hidden="true"
            id="users"
            role="img"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
          </svg>
        </div>
        <div key="4" id="3">
          <svg
            onClick={(e) => handleMenuSelections(e.target, "order")}
            aria-hidden="true"
            id="order"
            role="img"
            width="35"
            height="35"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path d="M4 7h11v2H4zm0 4h11v2H4zm0 4h7v2H4zm15.299-2.708l-4.3 4.291l-1.292-1.291l-1.414 1.415l2.706 2.704l5.712-5.703z" />
          </svg>
        </div>
      </div>
    </SideBar>
  );
}

export default DashboardSidebar;

const SideBar = styled.div`
  & > div {
    @media screen and (max-width: 960px) {
      width: 100%;
      max-height: 60px;
      position: relative;
      flex-direction: row;
      align-items: center;
    }
    width: 60px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #354555;
    flex-direction: column;
    transition: 0.4s;
    position: fixed;

    div:not(:first-child) {
      margin: 25px 0 0 0;
    }

    div {
      @media screen and (max-width: 960px) {
        height: 100%;
        padding: 2rem 1rem;
        margin: 0 !important;
        align-items: center;
        justify-content: center;
      }
      display: flex;
      width: 100%;
      justify-content: center;
      padding: 1rem 0;
      cursor: pointer;
      transition: 0.4s;
      fill: #606a76;

      &.selected {
        background: #256fc5;
        svg {
          fill: #fff;
        }
      }
    }
  }
`;
