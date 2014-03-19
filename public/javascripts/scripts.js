//SOCKET.IO

jQuery(function($){
  socket = io.connect();
  console.log("hello james")
  var $group_f1_score = $('#gf1_score');
  var $group_f2_score = $('#gf2_score');

  socket.on('show scores', function(mongooseData){

    $group_f1_score.empty();
    $group_f2_score.empty();

    console.log(mongooseData);
  //sum fighter scores for all user submissions
    var f1_sumScore = 0;
    var f2_sumScore = 0;
    for (var i = 0; i < mongooseData.length; i++){
      f1_sumScore += mongooseData[i].f1_score;
      f2_sumScore += mongooseData[i].f2_score;
    }
    //get the simple average
    var f1_avgScore = f1_sumScore/mongooseData.length;
    var f2_avgScore = f2_sumScore/mongooseData.length;

    $group_f1_score.append(f1_avgScore);
    $group_f2_score.append(f2_avgScore);
  })
})


//SUBMIT ROUND SCORES on CLICK
$('.f1').find("td[class^='r']").click(function(){
  $(this).text('10');
  var corrclass = $(this).attr('class');
  $('.f2 .'+corrclass).text('9');
})


$('.f2').find("td[class^='r']").click(function(){
  $(this).text('10');
  var corrclass = $(this).attr('class');
  $('.f1 .'+corrclass).text("9");
})

//TALLY SCORES
$('.tally').click(function(){

  var sum = 0;
  var sum2 = 0;

  for(var i = 1; i< 13; i++) {
    sum+= parseInt($(".f1 .r"+i).text());
    $('.f1 .totalscore').text(sum);
  };

  for(var i = 1; i<13; i++) {
    sum2+= parseInt($(".f2 .r"+i).text());
  };
  $('.f2 .totalscore').text(sum2);
})

//SUBMIT FINAL SCORE on SUBMIT BUTTON
var luis = 0;
$('.submit').click(function(){
  var scored_fight = {
    "f1": $('#f1_name').text(),
    "f2": $('#f2_name').text(),
    "f1_roundScores": [$('#f1r1').text(), $('#f1r2').text(), $('#f1r3').text(), $('#f1r4').text(), $('#f1r5').text(), $('#f1r6').text(), $('#f1r7').text(), $('#f1r8').text(), $('#f1r9').text(), $('#f1r10').text(), $('#f1r11').text(), $('#f1r12').text()],
    "f2_roundScores": [$('#f1r1').text(), $('#f2r2').text(), $('#f2r3').text(), $('#f2r4').text(), $('#f2r5').text(), $('#f2r6').text(), $('#f2r7').text(), $('#f2r8').text(), $('#f2r9').text(), $('#f2r10').text(), $('#f2r11').text(), $('#f2r12').text()],
    "f1_score": parseInt($('.f1 .totalscore').text()),
    "f2_score": parseInt($('.f2 .totalscore').text()),
    "user_email": $('.user_email').text()
  };

  luis++
  if (luis > 1){
    alert("Cannot submit more than once.");
  }
  else {
    $.post('/submit', scored_fight, function(data){
      socket.emit('send scores', scored_fight);
    }, "json");
  }
});

//SELECT BOXERS
$('.fightselector').click(function(){
  var fighterNames = $(this).text().split("vs.");

  $('#f1_name').text(fighterNames[0]);
  $('#f2_name').text(fighterNames[1]);
  $('#gf1_name').text(fighterNames[0]);
  $('#gf2_name').text(fighterNames[1]);

  luis = 0;

  //EMPTY the current scores
  // $('#gf1_score').text(0);
  // $('#f1r1').text(0);
  // $('#f1r2').text(0);
  // $('#f1r3').text(0);
  // $('#f1r4').text(0);
  // $('#f1r5').text(0);
  // $('#f1r6').text(0);
  // $('#f1r7').text(0);
  // $('#f1r8').text(0);
  // $('#f1r9').text(0);
  // $('#f1r10').text(0);
  // $('#f1r11').text(0);
  // $('#f1r12').text(0);
  // $("#f1_total").text(0);

  // $('#gf2_score').text(0);
  // $('#f2r1').text(0);
  // $('#f2r2').text(0);
  // $('#f2r3').text(0);
  // $('#f2r4').text(0);
  // $('#f2r5').text(0);
  // $('#f2r6').text(0);
  // $('#f2r7').text(0);
  // $('#f2r8').text(0);
  // $('#f2r9').text(0);
  // $('#f2r10').text(0);
  // $('#f2r11').text(0);
  // $('#f2r12').text(0)
  // $("#f2_total").text(0);
})


// knockdown buttons for fighter 1
$('.kd1-button').click(function(){
  var curr_score = $('.f1 .r1').text()-1
  $('.f1 .r1').text(curr_score)
})

$('.kd2-button').click(function(){
  var curr_score = $('.f1 .r2').text()-1
  $('.f1 .r2').text(curr_score)
})

$('.kd3-button').click(function(){
  var curr_score = $('.f1 .r3').text()-1
  $('.f1 .r3').text(curr_score)
})

$('.kd4-button').click(function(){
  var curr_score = $('.f1 .r4').text()-1
  $('.f1 .r4').text(curr_score)
})

$('.kd5-button').click(function(){
  var curr_score = $('.f1 .r5').text()-1
  $('.f1 .r5').text(curr_score)
})

$('.kd6-button').click(function(){
  var curr_score = $('.f1 .r6').text()-1
  $('.f1 .r6').text(curr_score)
})

$('.kd7-button').click(function(){
  var curr_score = $('.f1 .r7').text()-1
  $('.f1 .r7').text(curr_score)
})

$('.kd8-button').click(function(){
  var curr_score = $('.f1 .r8').text()-1
  $('.f1 .r8').text(curr_score)
})

$('.kd9-button').click(function(){
  var curr_score = $('.f1 .r9').text()-1
  $('.f1 .r9').text(curr_score)
})

$('.kd10-button').click(function(){
  var curr_score = $('.f1 .r10').text()-1
  $('.f1 .r10').text(curr_score)
})

$('.kd11-button').click(function(){
  var curr_score = $('.f1 .r11').text()-1
  $('.f1 .r11').text(curr_score)
})

$('.kd12-button').click(function(){
  var curr_score = $('.f1 .r12').text()-1
  $('.f1 .r12').text(curr_score)
})

// knockdown buttons for fighter2

$('.kd-button1').click(function(){
  var curr_score2 = $('.f2 .r1').text()-1
  $('.f2 .r1').text(curr_score2)
})

$('.kd-button2').click(function(){
  var curr_score2 = $('.f2 .r2').text()-1
  $('.f2 .r2').text(curr_score2)
})

$('.kd-button3').click(function(){
  var curr_score2 = $('.f2 .r3').text()-1
  $('.f2 .r3').text(curr_score2)
})

$('.kd-button4').click(function(){
  var curr_score2 = $('.f2 .r4').text()-1
  $('.f2 .r4').text(curr_score2)
})

$('.kd-button5').click(function(){
  var curr_score2 = $('.f2 .r5').text()-1
  $('.f2 .r5').text(curr_score2)
})

$('.kd-button6').click(function(){
  var curr_score2 = $('.f2 .r6').text()-1
  $('.f2 .r6').text(curr_score2)
})

$('.kd-button7').click(function(){
  var curr_score2 = $('.f2 .r7').text()-1
  $('.f2 .r7').text(curr_score2)
})

$('.kd-button8').click(function(){
  var curr_score2 = $('.f2 .r8').text()-1
  $('.f2 .r8').text(curr_score2)
})

$('.kd-button9').click(function(){
  var curr_score2 = $('.f2 .r9').text()-1
  $('.f2 .r9').text(curr_score2)
})

$('.kd-button10').click(function(){
  var curr_score2 = $('.f2 .r10').text()-1
  $('.f2 .r10').text(curr_score2)
})

$('.kd-button11').click(function(){
  var curr_score2 = $('.f2 .r11').text()-1
  $('.f2 .r11').text(curr_score2)
})

$('.kd-button12').click(function(){
  var curr_score2 = $('.f2 .r12').text()-1
  $('.f2 .r12').text(curr_score2)
})

