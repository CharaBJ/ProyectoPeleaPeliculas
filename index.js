// const fetchData= async(searchTerm) => {
//     const response = await axios.get('http://omdbapi.com/', {
//         params: {
//             apikey:'e806f5e',
//             s: 'avengers'

//         }
//     })
//     if(response.data.Error){
//         return[]
//     }

//     console.log(response.data.Search)
// }

//fetchData()
AutocompleteConfig = {
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
        return`
        <img src="${imgSrc}" />
        ${movie.Title} (${movie-Year})
        `
    },
    inputValue(movie){
        return movie.Title
    },
    async fetchData(searchTerm){
        apiMovieURL = 'http://www.omdbapi.com/'
        const response = await axios.get(apiMovieURL,{
            params: {
                apikey: '',
                s: searchTerm
            }
        })
        if(response.data.Error){
            return []
        }
        console.log(response.data)
        return responde.data.seach
    }
}
createAutocomplete({
    ...AutocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(Movie){
        document.querySelector('.tutorial').classList.add('is.hidden')

        onMovieSelect(movie,document.querySelector('#left-summary'),'left')
    }
})

createAutocomplete({
    ...AutocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie,document.querySelector('#right-summary'),'right')
    }
})

//Crear dos variables para leftMovie y rightMovie
let leftMovie
let rightMovie

const onMoviesSelect = async(movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '',
            i: movie.imbID
        }
    })
    console.log(response.data)
    summaryElement.innerHTML = movieTemplate(response.data)
//Preguntamos cual lado es?
    if(side === 'left'){
        ñeftMovie = response.data
    }else{
        rightMovie = responde.data
    }

    //Preguntamos is tenemos amvos lados
    if(leftMovie && rightMovie){
        //Entonces ejecutamos la funcion de comparacion
        runComparison()
    }
}

const runComparison = () => {
    console.log('Comparacion de peliculas')
    const leftSideStats = document.querySelectorAll('#left-summary .notification')
    const rightSideStats = document.querySelectorAll('#right-summary .notification')

    leftSideStats.forEach((leftStat,index) => {
        const rightStat = rightSideStats[index]
        const leftSideValue = parseInt(leftStat.dataset.value)
        const rightSideValue = parseInt(rightStat.dataset.value)

        if(rightSideValue = leftSideValue){
            leftStat.classList.remove('is-primary')
            leftStat.classList.add('is-danger')
        }else{
            rightStat.classList.remove('is-primary')
            rightStat.classList.add('is-danger')
        }
    })
}


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

input.addEventListener('input',debonce(onInput, 1000))

document.addEventListener('click',event => {
    if(!root,contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})

const onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '',
            i: movie.imdbID
        }
    })

    console.log(response.data)
    document.querySelector('#summary').innerHTML = movieTemplate(response.data)

}

const movieTemplate = (movieDetail) => {
    return `
    <article class="media">
     <figure class=""media-left">
        <p class="image">
            <img src="${movieDetail.Poster}" />
        </p>
     </figure>
     <div class="media-content">
        <div class="content">
            <h1>${movieDetail.Title}</h1>
            <h1>${movieDetail.Genre}</h1>
            <h1>${movieDetail.Plot}</h1>
        </div>
     </div>
    </article>
    `
}