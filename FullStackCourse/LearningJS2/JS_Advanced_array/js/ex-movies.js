let  gMovies = [
 {imdb: 'tt0000004', name: 'Un bon bock', rate: 20},
 {imdb: 'tt0373889', name: 'Harry Potter', rate: 17},
 {imdb: 'tt0000003', name: 'Pauvre Pierrot', rate: 15}
];

function getMovieLink(imdb){
    let strHtml="";
    let link = gMovies.find(movie=> movie.imdb == imdb);
    strHtml=`<a href="https://www.imdb.com/title/${link.imdb}/">${link.name}</a>`;
    return strHtml;
}
function deleteMovie(imdb){
    gMovies.splice((gMovies.findIndex(movie=>movie.imdb=imdb)),1)
}

function sortByName(){
    return gMovies.sort((m1,m2)=> m1.name.localeCompare(m2.name))
}

function sortByRate(){
    return gMovies.sort((m1,m2) => m1.rate-m2.rate)
}

// console.log(deleteMovie("tt0373889"));
console.log(sortByRate(gMovies))


