import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import useFetch from "../hooks/useFetch";

const filledStartStyle = {
  color: "#ffc107",
  cursor: "pointer",
};

const normalStartStyle = {
  color: "#000",
  cursor: "pointer",
};

const Rating = ({ rating, setRating, id }) => {
  const initialRating = useRef(rating);
  const user = useSelector(getUser);

  // check if the user rated the product before
  const [voteStatus, setVoteStatus] = useState({});

  const response = useFetch(
    `/api/dashboard/check-vote/${user?._id}/${id}`,
    (data) => {
      console.log(data);
      setVoteStatus(data);
    }
  );
  // view only mode

  const handleRating = (index) => {
    if (!voteStatus.success) return;
    const copy = { ...rating };
    copy.rate = index;
    copy.numberOfReviews += 1;
    setRating(copy);
    initialRating.current = copy;
    fetch(`/api/dashboard/rate-product/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_id: user._id, rate: rating.rate }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (response.success)
          setVoteStatus({ success: false, message: response.message });
        if (!response.success) {
          setVoteStatus(response);
          setRating(initialRating.current);
        }
      })
      .catch((err) => {
        console.log(err);
        setVoteStatus("vote Failed check your connection");
      });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
        {Array(5)
          .fill(0)
          .map((_, i) => i + 1)
          .map((idx) => {
            return (
              <span
                key={idx}
                style={idx > rating.rate ? normalStartStyle : filledStartStyle}
                onClick={() => handleRating(idx)}
                onMouseEnter={() => {
                  if (!voteStatus.success) return;
                  const copy = { ...rating };
                  copy.rate = idx;
                  setRating(copy);
                }}
                onMouseLeave={() => setRating(initialRating.current)}
              >
                &#9733;
              </span>
            );
          })}
      </div>
      <span
        style={{ margin: "0 15px", fontSize: "0.8rem", fontWeight: "bold" }}
      >
        ( {rating.numberOfReviews} Reviews )
      </span>

      <span style={{ margin: "0 15px", fontSize: "0.8rem" }}>
        {" "}
        {voteStatus.message}{" "}
      </span>
    </div>
  );
};

export default Rating;
