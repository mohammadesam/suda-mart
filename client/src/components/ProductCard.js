import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, getCart, remove } from "../features/cartSlice";
import { selectTheme } from "../features/appSlice";
import { Buffer } from "buffer";
import ViewableRating from "./ViewableRating";

const CustomBadge = styled.div`
  background-color: #f00;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 1px 1px 16px 6px rgb(233 249 0);
  height: 30px;
  transform: rotate(-45deg) translate(-20%, 0);
`;
const OfferBadge = ({ offer }) => {
  return (
    <CustomBadge>
      <span>{offer.percent}% OFF</span>
    </CustomBadge>
  );
};

const Price = ({ price, offer }) => {
  if (offer?.available) {
    const newPrice = Math.round((price - price * (offer.percent / 100)) * 100) / 100;
    return (
      <div className="price">
        <span
          className="oldPrice"
          style={{
            margin: "0 10px",
            color: "gray",
            fontWeight: "400",
          }}
        >
          <del> {price} </del>
        </span>
        <span className="newPrice" style={{ color: "green" }}>
          {newPrice} AED
        </span>
      </div>
    );
  }

  return <div className="price">{price} AED</div>;
};

function ProductCard({
  image,
  title,
  price,
  description,
  _id,
  product,
  rates,
  offer,
}) {
  // image rendering
  let buff = Buffer.from(image.data.data, "base64");

  let base64Image = buff.toString("base64");

  let theme = useSelector(selectTheme);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let cartItems = useSelector(getCart);
  let inCart = cartItems.filter((item) => item._id === _id);
  function addToCart() {
    let newPrice = price
    if(offer?.available) {
      newPrice = Math.round((price - price * (offer.percent / 100)) * 100) / 100;
    } 
    dispatch(add({ ...product, price: newPrice }));
  }

  function removeFromCart() {
    dispatch(remove(_id));
  }

  const getRating = () => {
    const numberOfReviews = rates.length;
    const totalRates = rates.reduce((sum, rate) => (sum += rate.rating), 0); // sum of all rates
    if (numberOfReviews === 0) return { rate: 0, numberOfReviews: 0 };
    return {
      rate: Math.round(totalRates / numberOfReviews) || 0,
      numberOfReviews,
    };
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Container theme={theme}>
      {offer?.available && <OfferBadge offer={offer} />}
      <img
        src={`data:${image.contentType};base64,${base64Image}`}
        onClick={() => navigate(`/products/${_id}`)}
        alt={title}
      />
      <h4> {title.length > 20 ? title.substr(0, 20) + " ..." : title} </h4>
      <p>{description.substr(0, 50)}</p>
      <ViewableRating rating={getRating()} />
      <div className="desc">
        {inCart.length ? (
          <button className="removeFromCartBtn" onClick={removeFromCart}>
            <span className="badge">{inCart[0].quantity}</span>X
          </button>
        ) : (
          <button onClick={addToCart}>add to cart</button>
        )}
        <Price price={price} offer={offer} />
      </div>
    </Container>
  );
}

export default ProductCard;
const Container = styled.div`
  @media screen and (max-width: 600px) {
    width: 70%;
  }

  @media screen and (max-width: 900px) and (min-width: 600px) {
    width: 35%;
    margin: 1rem;
  }

  position: relative;
  background: #fff;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19%;
  margin: 3rem 2rem;
  height: 340px;
  box-shadow: 5px 10px 20px rgb(0 0 0 / 30%);
  padding: 5px 0 0 0;
  img {
    width: 100%;
    height: 170px;
    cursor: pointer;
    margin: 0 15px 5px 15px;
  }

  h4 {
    padding: 9px 0;
    letter-spacing: 0.5px;
  }

  p {
    min-width: 250px;
    padding: 0 20px;
    margin: 0 0 0.1rem 0;
    font-size: 0.7rem;
    font-family: Roboto, serif;
    text-align: center;
    flex: 1;
  }

  .desc {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    transition: 0.25s;
    word-wrap: break-word;
    position: relative;
    bottom: 0px;
    text-align: center;
    min-height: 50px;

    .removeFromCartBtn {
      padding: 0 5px 0 0;
      font-weight: bold;
      background: ${({ theme }) => theme.action};
      color: ${({ theme }) => theme.primary};
      border: solid 1px ${({ theme }) => theme.action};
      height: 50px;
      .badge {
        background: #fff;
        color: black;
        padding: 2px 7px;
        margin: 1px 10px 1px 1px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.25s;
      }

      &:hover {
        .badge {
          background: white;
        }
      }
    }
  }

  .desc > button {
    background: ${({ theme }) => theme.action};
    padding: 10px 0;
    border: solid 1px ${({ theme }) => theme.action};
    cursor: pointer;
    transition: 0.25s;
    color: #fff;
    font-weight: bold;
    margin-top: 0.5rem;

    &:hover {
      transform: scale(1.05);
      background: ${({ theme }) => theme.action};
      border-color: ${({ theme }) => theme.action};
      color: white;
    }
  }

  .desc > span {
    font-weight: 900;
  }
`;
