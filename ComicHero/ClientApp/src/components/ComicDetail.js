import React, { useEffect, useState } from "react";
import Axios from "axios";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

export default function ComicDetail(props) {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [issueNumber, setIssueNumber] = useState(0);
  const [series, setSeries] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState(0);
  const [prevAction, setPrevAction] = useState("");

  const getComic = () => {
    const apiUrl = `api/comic/${props.selectedComic}`;
    Axios.get(apiUrl)
      .then(response => {
        setId(response.data.id);
        setTitle(response.data.title);
        setIssueNumber(response.data.issueNumber);
        setSeries(response.data.series);
        setDescription(response.data.description);
        setPublisher(response.data.publisher);
        setYear(response.data.year);
      })
      .catch(ex => {
        console.error(ex);
      });
  };

  useEffect(() => {
    if (props.action === props.prevAction) return;
    if (props.action === "Edit") {
      getComic();
    }
    setPrevAction(props.action);
  });

  const handleValidSubmit = (event, values) => {
    console.log(values, props.action, "handle submit");
    if (props.action === "Edit") {
      console.log("edit comic submit");
      props.onEditComic(id, values);
    } else {
      props.onAddComic(values);
    }

    props.onActionComplete();
  };

  const handleInvalidSubmit = (event, errors, values) => {
    //this.setState({email: values.email, error: true});
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>{props.action} Comic</CardTitle>
        <AvForm
          onValidSubmit={handleValidSubmit}
          onInvalidSubmit={handleInvalidSubmit}
        >
          <AvField
            name="title"
            label="Title"
            type="text"
            value={title || ""}
            required
          />
          <AvField
            name="issueNumber"
            label="Issue Number"
            type="number"
            value={issueNumber || ""}
            required
          />
          <AvField
            name="series"
            label="Series"
            type="text"
            value={series || ""}
            required
          />
          <AvField
            name="description"
            label="Description"
            type="textarea"
            value={description || ""}
            required
          />
          <AvField
            name="publisher"
            label="Publisher"
            type="text"
            value={publisher || ""}
            required
          />
          <AvField
            name="year"
            label="Year"
            type="number"
            value={year || ""}
            required
          />
          <Button color="primary">Submit</Button>
        </AvForm>
      </CardBody>
    </Card>
  );
}
