var correctCards = 0;
$( init );

function startGame() {
  $('#startMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  init();
}

function init() {
  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
  
  var audio1 = document.getElementById("audioID");   
  function playAudio() {
    audio1.play();
  }

  // Create the pile of shuffled cards
  var numbers = [ 1, 2, 3, 4]; 
  for ( var i=0; i<4; i++ ) {
    $('<div><br><br></div>')
      .data( 'number', numbers[i] )
      .attr( 'id', 'card'+numbers[i] )
      .appendTo( '#cardPile' )
      .draggable( {
        stack: '#cardPile div',
        cursor: 'move',
        revert: true
      } );
  }

  $("#card1").mouseover(function() {
    $("#audioID")[0].play();
  })

  // Create the card slots
  for ( var i=1; i<=4; i++ ) {
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
  if ( correctCards === 4 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }
}
