import React, {useEffect, useState} from 'react'
import {ListGroup, ListGroupItem, Button, Collapse} from 'reactstrap'
import Image from 'react-bootstrap/Image'
import ComicSearch from './ComicSearch'
import ComicDetail from './ComicDetail'

export default function MyComics() {
    const [comics,
        setComics] = useState([])
    const [isLoading,
        setLoading] = useState(true)
    const [hasMore,
        setHasMore] = useState(true)
    const [addCollapse,
        setAddCollapse] = useState(false)

    const perPageLimit = 20

    const onAddCollapseClick = () => {
        setAddCollapse(!addCollapse)
    }

    async function searchComicsList(title, issueNumber, offset = 0) {
        const offsetResults = (offset === 0)
            ? 0
            : offset + 1

        const apiUrl = `api/comics?`

        let searchUrl = `${apiUrl}&offset=${offsetResults}&limit=${perPageLimit}`

        if (title !== '') {
            searchUrl = `${apiUrl}&titleStartsWith=${title}&offset=${offsetResults}&limit=${perPageLimit}`
        }

        if (issueNumber > 0) {
            searchUrl = `${apiUrl}&titleStartsWith=${title}&issueNumber=${issueNumber}&offset=${offsetResults}&limit=${perPageLimit}`
        }

        await fetch(searchUrl, {method: 'GET'})
            .then(result => result.json())
            .then(response => {
                let comicsData = [...[].concat(response.data.results)]
                setComics(comicsData)
                if (isLoading) 
                    setLoading(false)
                if (hasMore && comics.length >= response.data.total - 1) 
                    setHasMore(false)
            })
    }

    useEffect(() => {
        // getComicsList()
    }, [])

    var divStyle = {
        maxheight: '150px',
        width: '100px',
        float: 'left',
        paddingRight: '1em'
    };

    const onSearchComic = (title, issueNumber) => {
        searchComicsList(title, issueNumber)
    }

    var searchDivStyle = {
        paddingBottom: '2em'
    }

    const renderThumbnail = (comic) => {
        if (comic.thumbnail == null) {
            return <Image></Image>
        }
        return (<Image
            className="d-inline-block"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            thumbnail/>)
    }

    return (
        <div>
            <h3>My Comics</h3>
            <Button
                color="primary"
                onClick={onAddCollapseClick}
                style={{
                marginBottom: '1rem'
            }}>Add Comic</Button>
            <Collapse isOpen={addCollapse}>
                <ComicDetail></ComicDetail>
            </Collapse>
            <ComicSearch style={searchDivStyle} onSearchClick={onSearchComic}></ComicSearch>

            <ListGroup>
                {(comics.length !== 0)
                    ? comics.map((comic) => <ListGroupItem className="justify-content-between" key={comic.id}>
                        <div style={divStyle}>
                            {renderThumbnail(comic)}
                        </div>
                        <div>
                            Title: {comic.title}
                            <br/>
                            Issue Number: {comic.issueNumber}
                            <br/>
                            Series: {(comic.series != null)
                                ? comic.series.name
                                : ''}
                            <br/>
                            Description: {comic.description}
                        </div>
                    </ListGroupItem>)
                    : <h1>No comics found</h1>}
            </ListGroup>
        </div>
    )
}