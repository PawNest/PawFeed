import React from "react";
import styled from "styled-components";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Star = styled.span<{ filled: boolean }>`
  font-size: 24px;
  color: ${(props) =>
    props.filled ? props.theme.starFilledColor : props.theme.starEmptyColor};
  cursor: pointer;
`;

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => onRatingChange(star)}
        >
          ★
        </Star>
      ))}
    </StarContainer>
  );
};

export default StarRating;
