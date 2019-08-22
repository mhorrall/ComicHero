import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Button, Collapse } from "reactstrap";
import Image from "react-bootstrap/Image";
import ComicSearch from "./ComicSearch";
import ComicDetail from "./ComicDetail";
import ComicList from "./ComicList";
import Axios from "axios";

export default function MyComics() {
  const [comics, setComics] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [addCollapse, setAddCollapse] = useState(false);
  const [selectedComic, setSelectedComic] = useState(0);
  const [detailOperation, setDetailOperation] = useState("");

  const searchComicsList = async (title = "", issueNumber = 0) => {
    let apiUrl = `api/comic`;

    if (title !== "") {
      apiUrl = `${apiUrl}?title=${title}`;
    }

    if (issueNumber > 0) {
      apiUrl = `${apiUrl}?title=${title}&issueNumber=${issueNumber}`;
    }

    console.log(apiUrl);

    await Axios.get(apiUrl)
      .then(response => {
        console.log(response.data.length, "comics");
        let comicsData = [...[].concat(response.data)];
        setComics(comicsData);
        if (isLoading) setLoading(false);
        if (hasMore && comics.length >= response.data.total - 1)
          setHasMore(false);
      })
      .catch(ex => {
        console.error(ex);
      });
  };

  function getImage(id) {
    const apiUrl = `api/comic/image/${id}`;

    return Axios.get(apiUrl, {
      responseType: "blob",
      timeout: 30000
    })
      .then(response => {
        // const buffer = Buffer.from(response.data, "base64");

        // console.log(buffer);
        return response;
      })
      .catch(ex => {
        console.error(ex);
      });
  }

  const deleteComic = async comicId => {
    const apiUrl = `api/comic/${comicId}`;
    Axios.delete(apiUrl)
      .then(response => {
        searchComicsList();
      })
      .catch(ex => {
        console.error(ex);
      });
  };

  const addComic = async values => {
    const apiUrl = `api/comic/`;
    await Axios.post(apiUrl, {
      title: values.title,
      issueNumber: values.issueNumber,
      series: values.series,
      description: values.description,
      publisher: values.publisher,
      year: values.year
    })
      .then(response => {
        searchComicsList();
      })
      .catch(ex => {
        console.error(ex);
      });
  };

  const editComic = (id, values) => {
    const apiUrl = `api/comic/${id}`;
    console.log(values, id);
    Axios.put(apiUrl, {
      title: values.title,
      issueNumber: values.issueNumber,
      series: values.series,
      description: values.description,
      publisher: values.publisher,
      year: values.year
    })
      .then(response => {
        searchComicsList();
      })
      .catch(ex => {
        console.error(ex);
      });
  };

  useEffect(() => {
    searchComicsList();
  }, []);

  const onSearchComic = (title, issueNumber) => {
    searchComicsList(title, issueNumber);
  };

  var searchDivStyle = {
    paddingBottom: "2em"
  };

  //   var divStyle = {
  //     maxheight: "150px",
  //     width: "100px",
  //     float: "left",
  //     paddingRight: "1em"
  //   };

  //   const renderThumbnail = comic => {
  //     getImage(comic.id).then(data => {
  //       console.log(data);
  //       const imageUrl = URL.createObjectURL(data.data);

  //       if (imageUrl != null) {
  //         return (
  //           //<ImageLoader file={data.Blob} alt="some text" />
  //           //<Image className="d-inline-block" src={imageUrl} thumbnail />
  //           <img src={imageUrl} />
  //         );
  //       }
  //     });
  //   };

  const onAddClick = () => {
    setDetailOperation("Add");
    setAddCollapse(!addCollapse);
  };

  const onEditClick = () => {
    setDetailOperation("Edit");
    setAddCollapse(!addCollapse);
  };

  const onDetailActionComplete = () => {
    setAddCollapse(!addCollapse);
  };
  const onComicDelete = () => {
    deleteComic(selectedComic);
    //searchComicsList();
  };

  const onItemClick = id => {
    setSelectedComic(id);
  };

  return (
    <div>
      <h3>My Comics</h3>
      <div className="pb-1">
        <Button color="primary" onClick={onAddClick}>
          Add Comic
        </Button>{" "}
        <Button disabled={selectedComic === 0} onClick={onEditClick}>
          Edit
        </Button>{" "}
        <Button
          disabled={selectedComic === 0}
          className="btn btn-danger"
          onClick={() => onComicDelete()}
        >
          Delete
        </Button>
      </div>
      <Collapse isOpen={addCollapse}>
        <ComicDetail
          onActionComplete={onDetailActionComplete}
          onAddComic={addComic}
          onEditComic={editComic}
          action={detailOperation}
          selectedComic={selectedComic}
        />
      </Collapse>
      <ComicSearch style={searchDivStyle} onSearchClick={onSearchComic} />
      <ComicList
        comics={comics}
        onItemClick={onItemClick}
        selectedComic={selectedComic}
      />
    </div>
  );
}
