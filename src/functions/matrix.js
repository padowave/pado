import { isAbsoluteNaN } from './isLike'
import { max, turn } from './reducer';
import { times } from './enumerator';

const range = function(value,step,sizeBase){
  var r=[],start,end,reverse;
  
  if(typeof value === "number"){
    end   = value;
    start = 0;
  } else if(typeof value === "object"){
    start = value[0];
    end   = value[1];
      
    if(!step && typeof value[2] === "number"){
      step = value[2];
    }
      
    if(typeof sizeBase !== "boolean"){
      sizeBase=false;
    }
  }
  
  if(typeof start !== "number" || typeof end !== "number"){
    if(typeof start !== "number" && typeof end !== "number") return r;
    if(typeof start === "number") return r.push(start),r;
    if(typeof end   === "number") return r.push(end)  ,r;
  }
  
  if(start > end){
    reverse = end;
    end     = start;
    start   = reverse;
    reverse = true;
  }
  
  end=parseFloat(end),end=isAbsoluteNaN(end)?0:end;
  start=parseFloat(start),start=isAbsoluteNaN(start)?0:start;
  step=parseFloat(step),step=isAbsoluteNaN(step)||step==0?1:step;
  if(step <= 0){ return console.warn("range::not support minus step"),r;};
  if(sizeBase==false){ for(var i=start,l=end;i<=l;i=i+step) r.push(i); } else { for(var i=start,l=end;i<l;i=i+step) r.push(i); }
  return reverse ? r.reverse() : r;
}

const domainRangeValue = FUNCTION_EXPORTS.DOMAIN_RANGE_VALUE = function(domain,range,vs,nice){
  return forMap(cloneDeep(vs),function(v,sel){
    var $range  = sel ? range[sel]  : range;
    var $domain = sel ? domain[sel] : domain;
    if(!$range || !$domain){ return v; }
                    
    var dSize = $domain[1] - $domain[0];
    var sSize = $range[1] - $range[0];
    var dRate = (v - $domain[0]) / dSize;
    var calc  = $range[0] + sSize * dRate;
                    
    return nice ? Math.floor(calc) : calc;
  });
};

//matrixRange([1],[3]) // [[1], [2], [3]] 
//matrixRange([1,1],[3,3]) // [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3]]

const matrixRange = function(start,end,step,sizeBase){
  var scales=[];
  var maxLength = max([start.length,end.length]);
    
  var selectLengthes = times(maxLength,function(scaleIndex){
    var range = range([start[scaleIndex],end[scaleIndex]],step,sizeBase)
    scales.push(range);
    return range.length;
  });

  var result = times(reduce(selectLengthes,function(redu,value){
    return redu * value;
  },1),function(){ return new Array(maxLength); });
    
  var turnSize = 1;
  
  each(scales,function(scaleCase,scaleIndex){
    var scaleCaseLength = scaleCase.length;
    times(result.length,function(time){
      result[time][scaleIndex] = scaleCase[turn(time,scaleCaseLength,turnSize)];
    });
    turnSize = turnSize * scaleCaseLength;
  });
    
  return result;
};