import React, {useEffect, useState} from 'react'
import {ListGroup, ListGroupItem} from 'reactstrap'
import Image from 'react-bootstrap/Image'
import {marvelEndpoint, marvelPublicKey} from '../config'
import ComicSearch from './ComicSearch'

export default function MarvelComics() {
    const [comics,
        setComics] = useState([])
    const [isLoading,
        setLoading] = useState(true)
    const [hasMore,
        setHasMore] = useState(true)

    const perPageLimit = 20

    async function getComicsList(offset = 0) {
        const offsetResults = (offset === 0)
            ? 0
            : offset + 1

        const marvelUrl = `${marvelEndpoint}apikey=${marvelPublicKey}`

        await fetch(`${marvelUrl}&offset=${offsetResults}&limit=${perPageLimit}`, {method: 'GET'})
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

    async function searchComicsList(title, issueNumber, offset = 0) {
        const offsetResults = (offset === 0)
            ? 0
            : offset + 1

        const marvelUrl = `${marvelEndpoint}apikey=${marvelPublicKey}`

        let searchUrl = `${marvelUrl}&offset=${offsetResults}&limit=${perPageLimit}`

        if (title !== '') {
            searchUrl = `${marvelUrl}&titleStartsWith=${title}&offset=${offsetResults}&limit=${perPageLimit}`
        }

        if (issueNumber > 0) {
            searchUrl = `${marvelUrl}&titleStartsWith=${title}&issueNumber=${issueNumber}&offset=${offsetResults}&limit=${perPageLimit}`
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
        getComicsList()
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
            <h3>Marvel Comics</h3>
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
