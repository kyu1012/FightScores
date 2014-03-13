//Sumbit scores for each round on click
$('.f1').find("td[class^='r']").click(function(){
  $(this).text('10');
  var corrclass = $(this).attr('class');
  $('.f2 .'+corrclass).text('9');
})


$('.f2').find("td[class^='r']").click(function(){
  $(this).text('10');
  console.log(this);
  var corrclass = $(this).attr('class');
  $('.f1 .'+corrclass).text("9");
})

// Tally Scores
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

//Submit Score
$('.submit').click(function(){
  var scored_fight = {
    "f1": $('#f1_name').text(),
    "f2": $('#f2_name').text(),
    "f1_score": parseInt($('.f1 .totalscore').text()),
    "f2_score": parseInt($('.f2 .totalscore').text()),
    "user_email": $('.user_email').text()
  };
  console.log(scored_fight);
  $.post('/submit', scored_fight);
});

//Fight Selector
$('.fightselector').click(function(){
  var fighterNames = $(this).text().split("vs.");

  $('#f1_name').text(fighterNames[0]);
  $('#f2_name').text(fighterNames[1]);
  $('#gf1_name').text(fighterNames[0]);
  $('#gf2_name').text(fighterNames[1]);
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

