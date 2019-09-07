var correctCards = 0;
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

  // Play audio on Cards
  $("#card1").mouseover(function() {
    $("#audio1")[0].play();
  })
  $("#card2").mouseover(function() {
    $("#audio2")[0].play();
  })
  $("#card3").mouseover(function() {
    $("#audio3")[0].play();
  })
  $("#card4").mouseover(function() {
    $("#audio4")[0].play();
  })
  $("#card5").mouseover(function() {
    $("#audio5")[0].play();
  })
  $("#card6").mouseover(function() {
    $("#audio6")[0].play();
  })
  $("#card7").mouseover(function() {
    $("#audio7")[0].play();
  })
  $("#card8").mouseover(function() {
    $("#audio8")[0].play();
  })
  $("#card9").mouseover(function() {
    $("#audio9")[0].play();
  })
  $("#card10").mouseover(function() {
    $("#audio10")[0].play();
  })
  $("#card11").mouseover(function() {
    $("#audio11")[0].play();
  })
  $("#card12").mouseover(function() {
    $("#audio12")[0].play();
  })

  // Pause audio on Cards
  $("#card1").mouseout(function() {
    $("#audio1")[0].pause();
  })
  $("#card2").mouseout(function() {
    $("#audio2")[0].pause();
  })
  $("#card3").mouseout(function() {
    $("#audio3")[0].pause();
  })
  $("#card4").mouseout(function() {
    $("#audio4")[0].pause();
  })
  $("#card5").mouseout(function() {
    $("#audio5")[0].pause();
  })
  $("#card6").mouseout(function() {
    $("#audio6")[0].pause();
  })
  $("#card7").mouseout(function() {
    $("#audio7")[0].pause();
  })
  $("#card8").mouseout(function() {
    $("#audio8")[0].pause();
  })
  $("#card9").mouseout(function() {
    $("#audio9")[0].pause();
  })
  $("#card10").mouseout(function() {
    $("#audio10")[0].pause();
  })
  $("#card11").mouseout(function() {
    $("#audio11")[0].pause();
  })
  $("#card12").mouseout(function() {
    $("#audio12")[0].pause();
  })

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
  if ( correctCards === 12 ) {
    $('#successMessage').show();
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
