import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styling/test.scss"

const Detailed = (props) => {
    const [contrie, setcontrie] = useState(false)
    const name = useParams().name
    console.log(name)
    useEffect(() => {
        const config = {
            methof: "GET",
            url: `https://restcountries.com/v2/name/${name}`,
        }
        axios(config).then(res => {
            setcontrie(res.data);
            console.log(res.data);
        })
    }, [])

    console.log(contrie)
    return <div className="detail">
        {contrie &&
            <>
                <img className="image" src={contrie[0].flag} />
                <div className="detailedDiv">
                    <h4><b>{contrie[0].name}</b></h4>
                    <p>Population: {contrie[0].population}</p>
                    <p>Region: {contrie[0].region}</p>
                    <p>Capital: {contrie[0].capital}</p>
                </div>
                <div className="detailedDiv">
                    <p id="test">Region: {contrie[0].currencies.map(l => <b>{l.name + " ,"}</b>)}</p>
                    <p>Languages: {contrie[0].languages.map(l => <b>{l.name + " ,"}</b>)}</p>
                </div>
                <div className="detailedDiv">
                <p>Boreder Countries: {contrie[0].borders.map(bor => <p className="border">{bor} </p>)}</p>
                </div>
            </>
        }
    </div>
}

export default Detailed