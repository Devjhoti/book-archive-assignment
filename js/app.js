let author = '';
let title = '';
let urlData = '';
function isTitle() {
    title = true;
    author = false;
    document.getElementById('title-check').style.display='inline';
    document.getElementById('author-check').style.display='none';
    document.getElementById('search-field').value = '';
    return title;
}
function isAuthor() {
    title = false;
    author = true;
    document.getElementById('title-check').style.display='none';
    document.getElementById('author-check').style.display='inline';
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
        const url = `https://openlibrary.org/search.json?author=${name}`;
        // console.log(url);
        urlData = url;
    }

}
function titleUrl(book) {
    // title=true;
    if (title === true) {
        const url = `https://openlibrary.org/search.json?title=${book}`;
        // console.log(url);
        urlData = url;
    }

}
document.getElementById('search-field').addEventListener('keyup', function () {
    const search = getSearchValue();
    // console.log(search);
    authorUrl(search);
    titleUrl(search);
})
const preloader=(dStyle)=>{
    document.getElementById('preloader').style.display = dStyle;
}
const loadData = () => {

    if (document.getElementById('search-field').value === '') {
        alert('EMPTY FIELD');
    }
    else if (author === '' || title === '') {
        alert('PLEASE SELECT A SEARCH TYPE!');
        document.getElementById('search-field').value = '';
    }
    else {
        document.getElementById('author-info').innerHTML = '';
        preloader('block');
        document.getElementById('results').innerHTML = '';
        fetch(urlData)
            .then(res => res.json())
            .then(data => displayData(data.docs));
    }
}
const displayData = (datas) => {
    // console.log(datas);
    if(title===true){
        document.getElementById('author-info').style.display='none';
    }
    else{
        document.getElementById('author-info').style.display='block';
    }

    const { author_key, author_name, isbn } = datas[0];
    const authorImgUrl = `https://covers.openlibrary.org/a/olid/${author_key[0]}-M.jpg`;

    const div = document.createElement('div');
    div.classList = 'author-details'
    div.innerHTML = `
        <div>
            <img src="${authorImgUrl}">
            
        </div>
        <div id="bio">
        
        </div>
    `;
    document.getElementById('author-info').appendChild(div);

    const authorInfoUrl = `https://openlibrary.org/authors/${author_key[0]}.json`;
    fetch(authorInfoUrl)
        .then(res => res.json())
        .then(data => {
            const { bio } = data;
            // console.log(bio);
            document.getElementById('bio').innerHTML = `
            <h3>${author_name}</h3>
            <p>${bio}</p>
        `;
        })
    // console.log(isbn[0]);
    datas.forEach(data => {
        const { isbn, title } = data;
        console.log(data);
        if (isbn[0] === undefined) {
            const bookCoverUrl = `https://i.ibb.co/Sv8d35r/random-Book-edited.png`;
            const div = document.createElement('div');
            div.classList = 'book-item col';
            div.innerHTML = `
            <img src="${bookCoverUrl}">
            <p>${title}</p>
            `;
            document.getElementById('results').appendChild(div);

            document.getElementById('main').style.height = 'auto';
            preloader('none');
        }
        else {
            const bookCoverUrl = `https://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg?default=false`;
            const div = document.createElement('div');
            div.classList = 'book-item col';
            div.innerHTML = `
            <img src="${bookCoverUrl}">
            <p>${title}</p>
            `;
            document.getElementById('results').appendChild(div);

            document.getElementById('main').style.height = 'auto';
            preloader('none');
        }

    })
    

}