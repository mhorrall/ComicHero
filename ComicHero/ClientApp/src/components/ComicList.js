import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default function ComicList(props) {
  return (
    <ListGroup>
      {props.comics.length !== 0 ? (
        props.comics.map(comic => (
          <ListGroupItem
            className={
              props.selectedComic === comic.id
                ? "active justify-content-between"
                : "justify-content-between"
            }
            key={comic.id}
            tag="button"
            action
            onClick={() => props.onItemClick(comic.id)}
          >
            {/* <div style={divStyle}>{renderThumbnail(comic)}</div> */}
            <div>
              Title: {comic.title}
              <br />
              Issue Number: {comic.issueNumber}
              <br />
              Series: {comic.series != null ? comic.series : ""}
              <br />
              Description: {comic.description}
            </div>
          </ListGroupItem>
        ))
      ) : (
        <h1>No comics found</h1>
      )}
    </ListGroup>
  );
}
