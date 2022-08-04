import styled from "styled-components";

export const Button = styled.button`
  background: var(--light-grey);
  border: 0;
  border-radius: 4px;
  padding: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Adapt the colors based on the type prop */
  color: ${(props) => (props.type === "edit" ? "var(--blue)" : "var(--red)")};
`;
