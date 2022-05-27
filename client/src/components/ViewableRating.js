import React from "react";

const filledStarStyle = {
  color: "#ffc107",
};

const normalStarStyle = {
  color: "#000",
};

const ViewableRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", position: "relative", top: "-8px" }}>
      <div style={{ fontSize: "0.8rem" }}>
        {[...Array(5)].map((_, index) => {
          return (
            <span
              key={index}
              style={index < rating.rate ? filledStarStyle : normalStarStyle}
            >
              &#9733;
            </span>
          );
        })}
      </div>
      <div style={{ fontSize: "0.8rem", marginLeft: 3 }}>
        ({rating.numberOfReviews}
        {rating.numberOfReviews > 1 ? " reviews" : " review"})
      </div>
    </div>
  );
};

export default ViewableRating;
