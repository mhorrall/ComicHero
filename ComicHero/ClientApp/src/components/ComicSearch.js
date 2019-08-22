import React, {useState} from 'react';
import {
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

export default function ComicSearch(props) {
    const [title,
        setTitle] = useState('')
    const [issueNumber,
        setIssueNumber] = useState(0)

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const onIssueChange = (e) => {
        setIssueNumber(e.target.value)
    }

    const onSearchClick = (title, issueNumber) => {
        props.onSearchClick(title, issueNumber)
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>Search</CardTitle>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Title:</InputGroupAddon>
                        <Input onChange={onTitleChange}/>
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Issue Number:</InputGroupAddon>
                        <Input onChange={onIssueChange}/>
                    </InputGroup>
                    <br/>
                    <Button color="primary" onClick={() => onSearchClick(title, issueNumber)}>Search</Button>
                </CardBody>
            </Card>
        </div>
    );
}
