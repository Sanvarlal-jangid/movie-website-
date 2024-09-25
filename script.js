let leftbtn = document.getElementsByClassName('bi-chevron-left')[0];
let rightbtn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let searchinput = document.getElementById('searchinput');

leftbtn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
})

rightbtn.addEventListener('click', () => {
    cards.scrollLeft += 140;
})
let movieurl = "moviejson.json";
fetch(movieurl).then(res => res.json())
    .then((data) => {
        data.forEach((element, i) => {
            let { name, imdb, date, sposter, bposter, genre, url } = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
        <img src="${sposter}" alt="${name}" class="poster">
        <div class="restcard">
            <img src="${bposter}" alt="">
            <div class="cont">
                <h4>${name}</h4>
                <div class="sub">
                    <p>${genre}, ${date}</p>
                    <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                </div>
            </div>
        </div>
        `
            cards.appendChild(card);
        });

        document.getElementById('title').innerText = data[0].name;
        document.getElementById('gen').innerText = data[0].genre;
        document.getElementById('date').innerText = data[0].date;
        document.getElementById('rat').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i>${data[0].imdb}`;

        // data show when user search
        data.forEach(element => {
            let { name, imdb, date, sposter, genre, url } = element;

            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
        <img src="${sposter}" alt="">
        <div class="cont">
            <h3>${name}</h3>
            <p> ${genre} , ${date}, <span> IMDB </span> <i class="bi bi-star-fill"></i> ${imdb} </p>
        </div>
        `;

            search.appendChild(card);
        })


        // search filter

        searchinput.addEventListener('keyup', () => {
            let filter = searchinput.value.toUpperCase();
            console.log(filter)
            let a = search.getElementsByTagName('a');

            for (let index = 0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('cont')[0];

                let textvalue = b.textContent || b.innerText;
                if (textvalue.toUpperCase().indexOf(filter) > -1) {
                    a[index].style.display = "flex";
                    search.style.visibility = "visible";
                    search.style.opacity = 1;

                } else {
                    a[index].style.display = "none";
                }
                if (searchinput.value == 0) {
                    search.style.visibility = "hidden";
                    search.style.opacity = 0;
                }

            }
        })


        let video = document.getElementsByTagName('video')[0];
        let play = document.getElementById('play');

        play.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                play.innerHTML = `play<i class="bi bi-pause-fill"></i>`
            } else {
                video.pause();
                play.innerHTML = `watch<i class="bi bi-play-fill"></i>`
            }
        })



        let series = document.getElementById('series');
        let movies =document.getElementById('movies');

        series.addEventListener('click', () => {
            cards.innerHTML = '';
            let seriesarray = data.filter(element => {
                return element.type === "series";
            });

          
            seriesarray.forEach((element,i)=> {
                let{ name,imdb,date,sposter,bposter,genre,url}=element;
                let card=document.createElement('a');
                card.classList.add('card');
                card.href=url;
                card.innerHTML=`
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="restcard">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                        </div>
                    </div>
                </div>
                `
                cards.appendChild(card);
            });
        })

        movies.addEventListener('click', () => {
            cards.innerHTML = '';
            let moviesarray = data.filter(element => {
                return element.type === "movie";
            });

          
            moviesarray.forEach((element,i)=> {
                let{ name,imdb,date,sposter,bposter,genre,url}=element;
                let card=document.createElement('a');
                card.classList.add('card');
                card.href=url;
                card.innerHTML=`
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="restcard">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                        </div>
                    </div>
                </div>
                `
                cards.appendChild(card);
            });
        })
    })