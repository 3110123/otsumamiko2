var q_01 = document.getElementById('q_01');
var q_02 = document.getElementById('q_02');
var q_03 = document.getElementById('q_03');
var q_04 = document.getElementById('q_04');
var qestion_01 = document.getElementById('qestion_01');
var qestion_02 = document.getElementById('qestion_02');
var qestion_03 = document.getElementById('qestion_03');
var qestion_04 = document.getElementById('qestion_04');
var result = document.getElementById('result');
var beer = document.getElementById('choose_box_beer');
var sake = document.getElementById('choose_box_sake');
var wine = document.getElementById('choose_box_wine');
var beer = "beer";
var sake = "sake";
var wine = "wine";
var tagId = [];

// おかず
q_01.onclick = function(){
  qestion_01.style.display = "none";
  qestion_02.style.display = "block";
  tagId.push(4);
  console.log(tagId);
  switchToQuestion1();
}

// つまむ
q_02.onclick = function(){
  qestion_01.style.display = "none";
  qestion_03.style.display = "block";
  tagId.push(3, 5);
  console.log(tagId);
  switchToQuestion2();
}

// 質問2 おかず
function switchToQuestion1() {
  // 肉
  q_03.onclick = function(){
    qestion_02.style.display = "none";
    qestion_04.style.display = "block";
    tagId.push(13);
    console.log(tagId);
    switchToQuestion3()
  }
  // 魚
  q_04.onclick = function(){
    qestion_02.style.display = "none";
    qestion_04.style.display = "block";
    tagId.push(14);
    console.log(tagId);
    switchToQuestion3()
  }
}

// 質問2 つまむ
function switchToQuestion2() {
  // ヘルシー
  q_05.onclick = function(){
    qestion_03.style.display = "none";
    qestion_04.style.display = "block";
    tagId.push(9);
    console.log(tagId);
    switchToQuestion3()
  }
  // 低価格
  q_06.onclick = function(){
    qestion_03.style.display = "none";
    qestion_04.style.display = "block";
    tagId.push(10);
    console.log(tagId);
    switchToQuestion3()
  }
}

// 質問3
function switchToQuestion3() {
  // おしゃれ
  q_07.onclick = function(){
    qestion_04.style.display = "none";
    tagId.push(11);
    console.log(tagId);

    $.ajax({
      type: 'get',
      url: '/result',
      data: {
        tag: tagId,
        alcohol: beer
      },
      headers: {
        'X-CSRF-Token' : $('meta[name="csrf-token"]').attr('content')
      }
    }).done(function() {
console.log("aaaaaaaaaaaaaaa")
    });
  }
  // 定番
  q_08.onclick = function(){
    qestion_04.style.display = "none";
    tagId.push(12);
    console.log(tagId);

    $.ajax({
      type: 'get',
      url: '/result',
      data: {
        tag: tagId,
        alcohol: beer
      },
      headers: {
        'X-CSRF-Token' : $('meta[name="csrf-token"]').attr('content')
      }
    }).done(function() {
      console.log("aaaaaaaaaaaaaaa")
    });
  }
}



