const movieContainer = document.querySelector('.movieContainer');
const movie = document.querySelector('#movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const screen = document.querySelector('.screen p')

populateUI()

let ticketPrice = +movie.value


// screen.innerHTML=movie[0].innerHTML

// setMovieData(0,ticketPrice);



function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if(selectedSeats != null && selectedSeats.length>0){
      seats.forEach(function(seat , idx){
            if(selectedSeats.indexOf(idx) > -1){
                seat.classList.add('selected');
            }
      })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
      movie.selectedIndex = selectedMovieIndex;
    }
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    const MovieName = localStorage.getItem('selectedMovieName');
    count.innerHTML=selectedSeats.length;
    total.innerHTML=(selectedSeats.length)*selectedMoviePrice;
    screen.innerHTML=MovieName;
        
  }

container.addEventListener('click' , function(e){

if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){

    e.target.classList.toggle('selected');
}
updateCount()
})

function updateCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex= [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
  
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
   
}

movie.addEventListener('change' , function(e){
    screen.innerHTML=movie[e.target.selectedIndex].innerHTML
    ticketPrice=e.target.value;
    updateCount();
    setMovieData(e.target.selectedIndex,e.target.value,movie[e.target.selectedIndex].innerHTML)
})

function setMovieData(movieIndex, moviePrice,movieName) {
        localStorage.setItem('selectedMovieIndex', movieIndex);
        localStorage.setItem('selectedMoviePrice', moviePrice);
        localStorage.setItem('selectedMovieName', movieName);
      }
      
