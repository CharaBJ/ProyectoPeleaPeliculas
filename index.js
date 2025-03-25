const fetchData= async(searchTerm) => {
    const response = await axios.get('http://omdbapi.com/', {
        params: {
            apikey:'30668e4a',
            s: 'avengers'

        }
    })
    if(response.data.Error){
        return[]
    }

    console.log(response.data.Search)
}

//fetchData()
const root = document.querySelector('.autocomplete')
root.innerHTML = `
<label><b>Busqueda de Peliculas</b></label>
<input class="input"/>
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
        </div>
    </div>
    `
const input= document.querySelector("input")
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const debonce = (func, delay = 1000) =>{
    let timeoutId
    return(...args) => {
        clearTimeout(timeoutId)
        timeoutId = serTimeout(() =>{
            func.apply(null, args)
        }, deLay)
    }
}

const onInput = async(event) => {
    const movies = await fetchData(event.target.value)
    console.log("MOVIES:", movies)

    if(!movies.length) {
        dropdown.classList.remove('is-active')
        return
    }

    resultsWrapper.innerHTML = ''
    dropdown.classList.add('is-active')

    for(let movie of movies){
        const option = document.createElement('a')
        const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster

        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
    `
    option.addEventListener('click', () =>{
        dropdown.classList.remove('is-active')
        input.value = movie.Title
        onMovieSelect(movie)
    })
    resultsWrapper.appendChild(option)
    }
}