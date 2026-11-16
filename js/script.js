// Part A — function basics
function greetUser(name){return `Hello, ${name}!`;}
function isEven(number){return number % 2 === 0;}
function maxOfThree(a,b,c){return Math.max(a,b,c);}
function formatStudent(name,group,gpa){return `Student ${name} from ${group} has GPA ${gpa}`;}
// Part B — function expressions and arrow functions
const multiply=function(a,b){return a*b;};
const squareExpression=function(x){return x*x;};
const squareArrow=x=>x*x;
const toUpper=str=>str.toUpperCase();
// Part C — defaults and rest parameters
function calculatePrice(basePrice,taxRate=0.12){return basePrice+basePrice*taxRate;}
function sumAll(...nums){return nums.reduce((sum,n)=>sum+n,0);}
function average(...nums){if(nums.length===0)return null;return sumAll(...nums)/nums.length;}

const $=id=>document.getElementById(id);
const num=id=>Number($(id).value);
function result(id,value,error=false){const el=$(id);el.textContent=String(value);el.className=error?'error':'done';}
function parseList(id){const raw=$(id).value.trim();if(!raw)return[];const parts=raw.split(',').map(s=>s.trim());if(parts.some(s=>s===''||!Number.isFinite(Number(s))))throw Error('Enter valid comma-separated numbers.');return parts.map(Number);}
document.querySelectorAll('[data-run]').forEach(btn=>btn.addEventListener('click',()=>{
 try{switch(btn.dataset.run){
 case'greet':result('greet-output',greetUser($('greet-name').value.trim()||'Guest'));break;
 case'even':result('even-output',isEven(num('even-number')));break;
 case'max':result('max-output',maxOfThree(num('max-a'),num('max-b'),num('max-c')));break;
 case'student':result('student-output',formatStudent($('student-name').value,$('student-group').value,$('student-gpa').value));break;
 case'multiply':result('multiply-output',multiply(num('mul-a'),num('mul-b')));break;
 case'square':{const x=num('square-number');result('square-output',`Function expression: ${squareExpression(x)} | Arrow function: ${squareArrow(x)}`);break;}
 case'upper':result('upper-output',toUpper($('upper-text').value));break;
 case'price':{const raw=$('price-tax').value.trim();const tax=raw===''?undefined:Number(raw)/100;result('price-output',(tax===undefined?calculatePrice(num('price-base')):calculatePrice(num('price-base'),tax)).toFixed(2));break;}
 case'sum':result('sum-output',sumAll(...parseList('sum-values')));break;
 case'average':{const avg=average(...parseList('average-values'));result('average-output',avg===null?'null (no numbers provided)':avg);break;}
 }}catch(e){result(btn.dataset.run+'-output',e.message,true);}
}));
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 document.querySelectorAll('.exercise').forEach(card=>card.classList.toggle('hide',btn.dataset.filter!=='all'&&card.dataset.part!==btn.dataset.filter));
}));
const menu=document.querySelector('.menu'),links=document.querySelector('.links');
menu.addEventListener('click',()=>links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));