import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function DashboardSidebar({ selectedId }) {
  let parentElement = useRef();
  let navigate = useNavigate();

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
    navigate("/dashboard/" + dist);
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
        {/* settings */}
        <div key="5" id="4">
          <svg
            fill="#606A76"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="30px"
            height="30px"
            onClick={(e) => handleMenuSelections(e.target, "settings")}
            id="settings"
          >
            {" "}
            <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
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
