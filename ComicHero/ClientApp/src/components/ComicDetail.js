import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {Button, Card, CardBody, CardTitle} from 'reactstrap';

export default function ComicDetail() {
    const apiUrl = `api/comics/`

    const addComic = async(values) => {
        const response = await Axios
            .axios
            .post(apiUrl, {
                "title": values.title,
                "issueNumber": values.issueNumber,
                "series": values.series,
                "description": values.description,
                "publisher": values.publisher,
                "year": values.year
            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    const handleValidSubmit = (event, values) => {
        //this.setState({email: values.email});
        console.log(values)
        addComic(values);
    }

    const handleInvalidSubmit = (event, errors, values) => {
        //this.setState({email: values.email, error: true});
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>Add Comic</CardTitle>
                <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
                    <AvField name="title" label="Title" type="text" required/>
                    <AvField name="issueNumber" label="Issue Number" type="number" required/>
                    <AvField name="series" label="Series" type="text" required/>
                    <AvField name="description" label="Description" type="textarea" required/>
                    <AvField name="publisher" label="Publisher" type="text" required/>
                    <AvField name="year" label="Year" type="number" required/>
                    <Button color="primary">Submit</Button>
                </AvForm>
            </CardBody>
        </Card>
    );
}