import styled, { css } from "styled-components";

export const CustomButton = styled.button`
  font-size: 0.875rem;
  font-weight: 500;
  padding: 10px 20px;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 0.4s;

  /* Adapt the colors based on the color prop */
  ${(props) =>
    props.color === "blue" &&
    css`
      background: var(--blue);
      color: var(--white);

      &:hover {
        background: var(--white);
        color: var(--blue);
        outline: 1px solid var(--blue);
      }
    `}

  ${(props) =>
    props.color === "yellow" &&
    css`
      background: var(--yellow);
      color: var(--dark-grey);

      &:hover {
        background: var(--white);
        color: var(--yellow);
        outline: 1px solid var(--yellow);
      }
    `}

    ${(props) =>
    props.color === "grey" &&
    css`
      background: var(--light-grey);
      color: var(--blue);

      &:hover {
        background: var(--white);
        color: var(--blue);
        outline: 1px solid var(--blue);
      }
    `}

    /* Adapt the button based on the icon prop */
    ${(props) =>
    props.icon &&
    css`
      display: flex;
      align-items: center;
      i {
        font-size: 1.25rem;
        margin-right: 10px;
      }
    `}

    @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;
