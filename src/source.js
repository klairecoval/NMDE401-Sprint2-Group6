var correctCards = 0;
var dbgWin = 0
$( init );
var timer2 = "01:00";

function startGame() {
  $('#startMessage').hide();
  init();
}

function init() {
  // Hide the success message
  $('#successMessage').hide();
  $("#audioFull")[0].pause();
  $('#failMessage').hide();
  timer2 = "01:00";

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
  

  // Create the pile of shuffled cards
  var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; 
  for ( var i=0; i<12; i++ ) {
    $(`<div><img src="assets/cudi-${i}.png"><div class="overlay"></div></div>`)
      .data( 'number', numbers[i] )
      .attr( 'id', 'card'+numbers[i] )
      .attr( 'class', 'card')
      .appendTo( '#cardPile' )
      .draggable( {
        stack: '#cardPile div',
        cursor: 'move',
        revert: true
      } );
  }

  let cardPile = document.querySelector('#cardPile')
  for (var i = cardPile.children.length; i >= 0; i--) {
    cardPile.appendChild(cardPile.children[Math.random() * i | 0]);
  }

  for(let i = 1; i < 13; i++) {
    $(`#card${i}`).mouseover(function() {
      $(`#audio${i}`)[0].play();
    })
    $(`#card${i}`).mouseout(function() {
      $(`#audio${i}`)[0].pause();
      $(`#audio${i}`)[0].currentTime = 0;
    })
  }

  // Create the card slots
  for ( var i=1; i<=12; i++ ) {
    $('<div><br><br></div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card color, position it directly
  // on top of the slot, and prevent it being dragged again
  if ( slotNumber === cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go
  if ( dbgWin || correctCards === 12 ) {
    $('#successMessage').show();
    clearInterval(interval)
    $("#audioFull")[0].play();
  }
}

// Calculate countdown
var interval = setInterval(function() {
  var timer = timer2.split(':');
  var minutes = parseInt(timer[0], 10);
  var seconds = parseInt(timer[1], 10);
  --seconds;
  if(seconds === 0) {
    $('#failMessage').show();
  }
  minutes = (seconds < 0) ? --minutes : minutes;
  if (minutes < 0) clearInterval(interval);
  seconds = (seconds < 0) ? 59 : seconds;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  $('.countdown').html(seconds+'s');
  timer2 = minutes + ':' + seconds;
}, 1000);
