import styled from "styled-components";

export const Container = styled.div`
  background: var(--white);
  margin: 16px;
  padding: 16px;
  border-radius: 4px;

  table {
    width: 100%;
    font-size: 0.75rem;
    text-align: left;
    text-transform: uppercase;
    table-layout: fixed;
  }

  tbody {
    color: var(--dark-grey);
  }

  th {
    font-weight: 500;
  }

  th,
  td {
    border-bottom: 1px solid var(--light-grey);
    padding: 16px 0;
  }

  .Table__buttons {
    display: flex;
    gap: 10px;
  }

  .paginationContainer {
    flex-direction: column;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 14px;

    li {
      margin-left: -5px;
    }
  }

  @media only screen and (min-width: 768px) {
    table {
      font-size: 1rem;
    }

    tr > th:last-child {
      float: right;
    }

    .Table__buttons {
      float: right;

      button {
        width: 42px;
        height: 42px;
      }

      img {
        width: 42px;
      }
    }
  }
`;

export const Header = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  > Button {
    margin-bottom: 14px;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 16px;

  @media only screen and (min-width: 768px) {
    flex-grow: 1;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;

  i {
    position: absolute;
    top: 14px;
    left: 12px;
    color: var(--blue);
  }

  input {
    flex-basis: 100%;
    border: 0;
    border-radius: 4px;
    box-shadow: 1px 3px 5px 4px var(--light-grey);
    padding: 12px 0px 12px 40px;
    width: 100%;
  }
`;
