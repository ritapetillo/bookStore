import React from "react";
import { Container, Button, Row, Col, FormControl } from "react-bootstrap";
import SingleBook from "./SingleBook";
import AlertBook from "./AlertBook";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import "../style/BookList.css";

export default function BookList({
  bookList,
  title,
  reduce,
  navigate,
  indexBook,
  filterBooks,
}) {
  return (
    <Container>
      <div className="d-flex justify-content-between">
        <h3 className="bookList__title text-left">{title.toUpperCase()}</h3>
        <div className="ml-auto d-flex align-items-center mr-3 nav__search">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => filterBooks(e, title)}
          />
          <SearchIcon />
        </div>
        <div>
          {/* <UnfoldLessIcon
              className="icon-cursor"
              onClick={() => reduce(title)}
            ></UnfoldLessIcon> */}
          <ArrowBackIosIcon
            className="icon-cursor"
            onClick={() => navigate(title, "back", 18)}
          />
          <span className="px-3">{indexBook / 18}</span>
          <ArrowForwardIosIcon
            className="icon-cursor"
            onClick={() => navigate(title, "next", 18)}
          />
        </div>
      </div>
      <Row>
              <AlertBook text="No results" variant="warning" show={bookList <= 0 ? true : false} />
      </Row>
      <Row>
        {bookList.map((book) => (
          <SingleBook book={book} />
        ))}
      </Row>
    </Container>
  );
}
