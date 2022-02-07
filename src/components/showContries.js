import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowContries = (props) => {
    const [contries, setcontries] = useState([]);
    const [byRegion, setbyRegion] = useState(false);

    useEffect(() => {
        const config = {
            method: "GET",
            url: "https://restcountries.com/v2/all",
        };
        axios(config).then((res) => {
            setcontries(res.data);
        });
    }, []);

    const continentsCcategorizer = (e) => {
        console.log(e.target.value);
        const config = {
            method: "GET",
            url: `https://restcountries.com/v3.1/region/${e.target.value}`
        }
        console.log(config);
        axios(config).then(res => {
            setbyRegion(res.data);
        })
    }

    const searchHandler = (e) => {
        e.preventDefault();
        const result = e.target.search.value.toLowerCase();
        const config = {
            methof: "GET",
            url: `https://restcountries.com/v2/name/${result}`,
        }
        axios(config).then(res => {
            setbyRegion(false);
            setcontries(res.data);
        })
        e.target.search.value = "";
    }

    const showDetailPage = (name) => {
        window.location = `/detaile/${name}`
    }

    return <div className={`light contries ${!props.flipMode && "dark"}`}>
        {/* <div className="navBar">
            <p> Where In The World?</p>
            <button onClick={handleFlippingMode}>{flipMode ? "Dark Mood" : "Light Mood"}</button>
        </div> */}
        <form>
            <select onChange={(e) => { continentsCcategorizer(e) }} name="continents" className="continents">
                <option value={false}>Choose Continent</option>
                <option value="asia">Asia</option>
                <option value="americas">Americas</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>
        </form>

        <form className="searchName" onSubmit={(e) => { searchHandler(e) }}>
            <input type="text" name="search" placeholder="Search By Name" />
        </form>
        <div>
            {!byRegion ? contries.slice(0, 10).map(cont => {
                return <div className="card">
                   
                    <Link to={`/detaile/${cont.name}`}> <img src={cont.flag} /></Link>
                    <div className="container">
                        <h4><b>{cont.name}</b></h4>
                        <p>Population: {cont.population}</p>
                        <p>Region: {cont.region}</p>
                        <p>Capital: {cont.capital}</p>
                    </div>
                </div>
            }) :
                byRegion.map(cont => {
                    return <div className="card">
                        
                        <Link to={`/detaile/${cont.name.common}`}><img src={cont.flags.png} /></Link>
                        <div className="container">
                            <h4><b>{cont.name.common}</b></h4>
                            <p>Population: {cont.population}</p>
                            <p>Region: {cont.region}</p>
                            <p>Capital: {cont.capital}</p>
                        </div>
                    </div>
                })
            }
        </div>
    </div>;

}

export default ShowContries;