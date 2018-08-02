//https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
export default function(time){
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;

  var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
  return finalTime;
}

function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}
