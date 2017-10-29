function genRandom(start, end){
  return Math.floor(Math.random() * end) + start;               
}

function glitch(ctx){
  //Clear the screen
  ctx.fillStyle = "#2e2e2e";
  ctx.fillRect(1,1,700,700);

  //overly complicated random gen to see if we should draw an rgb split, or a logo
  if(genRandom(1,40) !== 1){
    if(genRandom(1,10) == 10){
      ctx.font      = '152px OpenSans';
      ctx.fillStyle = "rgba(150,150,186,0."+genRandom(2,4)+")";
      if(genRandom(1,2) == 1){
        if(genRandom(1,10) == 1){
          ctx.fillText  ('#f7', 215+genRandom(10,50), 270+genRandom(10,50));
        }else{
          ctx.fillText  ('404', 215+genRandom(10,50), 270+genRandom(10,50));
        }
      }else{
        if(genRandom(1,10) == 1){
          ctx.fillText  ('COC', 215-genRandom(10,50), 270-genRandom(10,50));
        }else{
          ctx.fillText  ('404', 215-genRandom(10,50), 270-genRandom(10,50));
        }
      }
      ctx.font      = '152px OpenSans';
      ctx.fillStyle = "rgba(186,150,150,0."+genRandom(2,4)+")";
      if(genRandom(1,2) == 1){
        if(genRandom(1,10) == 1){
          ctx.fillText  ('a&#', 215+genRandom(10,50), 270+genRandom(10,50));
        }else{
          ctx.fillText  ('404', 215+genRandom(10,50), 270+genRandom(10,50));
        }
      }else{
        if(genRandom(1,10) == 1){
          ctx.fillText  ('x%j', 215-genRandom(10,50), 270-genRandom(10,50));
        }else{
          ctx.fillText  ('404', 215-genRandom(10,50), 270-genRandom(10,50));
        }
      }
    }else{
      ctx.font      = '152px OpenSans';
      ctx.fillStyle = '#888';
      if(genRandom(1,7) == 1){
        if(genRandom(1,2) == 1){
          ctx.fillText  ('C0C', 215, 270);
        }else{
          ctx.fillText  ('0cC', 215, 270);
        }
      }else{
        ctx.fillText  ('404', 215, 270);
      }
    }
  }else{
    ctx.fillText  ('Community of Coders', 215-genRandom(10,50), 270-genRandom(10,50));
  }

  //See how much, and where we should block out text
  for(var i = 0;i < genRandom(1,3);i++){
    ctx.fillStyle = "rgba(100,100,100,0."+genRandom(1,7)+")";
    ctx.fillRect(genRandom(1,700), genRandom(1,700), genRandom(1,700), genRandom(1,700));
  }
}

function startGlitch(ctx){
  var rand = Math.round(Math.random() * 100) + 1;
  setTimeout(function() {
    glitch(ctx);
    startGlitch(ctx);
  }, rand);
}

$(document).ready(function(){
  var quips = ["These are not the files your looking for.","Woops, our bad."," ¯\\_(ツ)_/¯ ","So you think you are Smart?","It WAS here...","I'm sorry, I'm afraid I can't do that.","Are you sure this is the page you want?"];
  $('.quip').html(quips[genRandom(0,quips.length-1)]);
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.font         = '152px OpenSans';
  ctx.fillStyle = '#888';
  ctx.fillText  ('404', 200, 270);
  startGlitch(ctx);
});