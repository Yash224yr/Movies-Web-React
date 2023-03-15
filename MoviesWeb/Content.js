import React, { useEffect, useState } from 'react';
import './Movies.css';
import axios from 'axios';

function Content() {
    let [value, setvalue] = useState('');
    let [data, setdata] = useState([]);

    function handlerchange(e) {
        setvalue(e.target.value);
    }

    function handlersubmit(e) {
        e.preventDefault()
        if (!value) {
            alert('Please enter a movie name');
          }
        else{
            async function getdata() {
                let response = await axios.get(`
                        https://api.themoviedb.org/3/search/movie?api_key=536b68a54e32bbda4fe55a17bc514fa3&language=en-US&query=${value}&page=1&include_adult=false`);
                        if(response.data.results.length === 0 ){
                            alert(" Oops No Movie Found")
                        }
                        else{
                                setdata(response.data.results);
    
                        }
            }
            getdata();
        }
    }


    return (
        <div className='content'>
            <div className='search'>
                <form onSubmit={(e) => { handlersubmit(e) }}>
                    <input type='text' placeholder='Enter Movie Name' value={value} onChange={handlerchange} />
                    <button type='submit'> Submit</button>
                </form>
            </div>
            <div className='movielist'>
                {data.map((element) => {
                    return (
                        <div className='list' key={element.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${element.backdrop_path}`}
                                onError={(e) => { e.target.src = 'https://dummyimage.com/355.5x200/000/fff&text=No+Image+Found' }}
                            />
                            <h1>{element.title}</h1>
                            <h5>{element.release_date}</h5>
                            <p>{element.overview}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Content;
