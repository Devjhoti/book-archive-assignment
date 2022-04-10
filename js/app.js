let author = false;
let title = false;
let urlData = '';
function isTitle() {
    title = true;
    author = false;
    document.getElementById('search-field').value = '';
    return title;
}
function isAuthor() {
    title = false;
    author = true;
    document.getElementById('search-field').value = '';
    return author;
}
function getSearchValue() {
    const searchField = document.getElementById('search-field');
    const searchTxt = searchField.value;
    return searchTxt;
}

function authorUrl(name) {
    // author=true;
    if (author === true) {
        const url = `http://openlibrary.org/search.json?author=${name}`;
        console.log(url);
        urlData = url;
    }

}
function titleUrl(book) {
    // title=true;
    if (title === true) {
        const url = `http://openlibrary.org/search.json?title=${book}`;
        console.log(url);
        urlData = url;
    }

}
document.getElementById('search-field').addEventListener('keyup', function () {
    const search = getSearchValue();
    // console.log(search);
    authorUrl(search);
    titleUrl(search);
})
const loadData = () => {
    if (document.getElementById('search-field').value === '') {
        alert('EMPTY FIELD');
    }
    else {
        fetch(urlData)
            .then(res => res.json())
            .then(data => displayData(data.docs));
    }
}
const displayData = (data) => {
    console.log(data)
}