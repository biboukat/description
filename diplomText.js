
{

function DES(valueIn,chek){
var textBit = [];		//массив готовых 64-битных частей текста

function hexEnter(inHex){
	var a = inHex;
	var arr4Text = [], j = 0;
for(var i = 0; i < a.length; i = i+7){
	arr4Text[j] = a.charAt(i) + a.charAt(i+1) + a.charAt(i+2) + a.charAt(i+3) + a.charAt(i+4) + a.charAt(i+5) + a.charAt(i+6);
	j++;
	}
var bitIN = '';
for(var i = 0, j = 0; i < arr4Text.length; i++){
	var m = parseInt(arr4Text[i++],36).toString(2);
	var n  =  parseInt(arr4Text[i],36).toString(2);
	if(m.length>32)m=10101010101010101010101010101010;
	if(n.length>32)m=10101010101010101010101010101010;
	while(m.length < 32 || n.length <32){  // проверяем имеет ли кааждый символ 16 бит
			m.length < 32 ? m = '0' + m : n = '0' + n;
		}
		textBit[j++] = m+n;
		
}

}


if(chek){
	if(valueIn.length%14)return 'error; контрольная сумма неверна';
	hexEnter(valueIn); 
}else{

 

var a = valueIn;

var arr4Text = [], j = 0;
for(var i = 0; i < a.length; i = i+4){
	arr4Text[j] = a.charAt(i) + a.charAt(i+1) + a.charAt(i+2) + a.charAt(i+3);
	j++;
}


//вызывает ф-ию преобразования

for(var i = 0; i<arr4Text.length; i++){
	textBit[i] = textForUni(arr4Text[i]);
	//document.writeln(textBit[i] + ' входящий набор бит <br>')
		
}

//ф-ция преобразования в биты
function textForUni(elem){
	var b, arr = [], Bit = '';
	for(var i = 0; i < elem.length; i++){
		var b = elem.charCodeAt(i);		//берем каждый символ ключа, юникод
		
		arr[i] = b.toString(2);		//перевод ключа в биты
		while(arr[i].length != 16){  // проверяем имеет ли кааждый символ 16 бит
				arr[i] = '0' + arr[i];
			
		}
		Bit += arr[i];		//запись в ключ каждый символ в битах
	}
	return Bit;
}

}//конец ифа

//функция проверки последнего набора символов на длинну
function last(l){
	while(l.length != 64){
				l += '0';
			}
			return l;
		
	}
// берем последний набор символов
textBit[textBit.length-1] = last(textBit[textBit.length-1]); 
	

// задаем P-бокс расширения в i-м раунде
var pPosition = 
[32, 1, 2, 3, 4, 5,
 4, 5, 6, 7, 8, 9, 
 8, 9, 10, 11, 12, 13, 
 12, 13, 14, 15, 16, 17, 
 16, 17, 18, 19, 20, 21, 
 20, 21, 22, 23, 24, 25, 
 24, 25, 26, 27, 28, 29, 
 28, 29, 30, 31, 32, 1];

var encryptedArr = [];
for(var k = 0; k < textBit.length; k++)
{

// начальная перестановка
var permutationS = '';
	for(var i = 0; i < 64; i++){
		permutationS = textBit[k].charAt(63-(permutationStart[i]-1)) + permutationS;
	}

ro(permutationS);

function ro(text){
var left='', right='', leftDop='';
for(var q = 0; q<16; q++ ){

	if (q == 0){round0(text);}
	leftDop = left;			// для конечной операции xor
	left = right;
	
	function round0(bit64text){
	//разбиение на лев прав
			left = bit64text.substring(0,32);
			right = bit64text.substring(32,64);
			}

	
function expansion(right){
	
	//расширение правой части ключа до 48 бит
	var rightPlus = '';
	for(var i = 0; i < pPosition.length; i++){
		rightPlus = right.charAt(31 - (pPosition[i]-1)) + rightPlus;
	}
	
	return rightPlus;

}


//операция xor

var round = expansion(right); // расширяем правую часть до 48 бит
var keyI = (chek)? 16-q : q+1;
var sBox48 = '';
for(var i = 0; i < 48; i++){ 							//			xor ключа и расширенной правой части
	sBox48 += (round.charAt(i)^key['k'+keyI].charAt(i));
}
//document.writeln(sBox48 + ' после XOR с ключем ' + parseInt(sBox48, 2) + '<br>')
//расбиение 48битного на 8 по 6
var sBoxArr = []; 				// массив для 8 на 6
for(var i = 0, j = 0; i < 48; i = i+6){
		sBoxArr[j++] = sBox48.substring(i,i+6);
	}


//прохождение через s-box
var sBoxReturn = sBox(sBoxArr);
right = [];
//document.writeln(sBoxReturn + '<br>');
for(var i = 0; i < sBoxReturn.length; i++ ){
	right[i] = sBoxReturn[i].toString(2);
	
		while(right[i].length !=4){
			right[i] = '0' + right[i];
		}
	
}
right = right.join('');
//document.writeln(right + ' уменьшин до 32 бит s-box ' + parseInt(right, 2) + '<br>');
right = pBoxFunc(right);   //P-бокс прямой в i-м раунде
//document.writeln(right + ' переставлен P-box ' + parseInt(right, 2) + '<br>');
//document.writeln(leftDop + ' левая часть для XOR ' + parseInt(leftDop, 2) + '<br>');

var rightXORleft = '';
for(var i = 0; i < 32; i++){ 							//			xor левой  и правой части после сбокса
	rightXORleft += (right.charAt(i)^leftDop.charAt(i));
}

right = rightXORleft;
//document.writeln(right + ' результат leftXORright ' + parseInt(right, 2) + '<br>');

if(q==15){

	var encrypted = right + left;
	//document.writeln(encrypted+ ' конечний результат без перестановки'+'<br>'+parseInt(encrypted, 2) + '<br>');
	var permutationE = '';
	for(var i = 0; i < 64; i++){
		permutationE = encrypted.charAt(63 - (permutationEnd[i]-1)) + permutationE;
	}
	encryptedArr[k] = permutationE;
}


	}//конец цыкла раундов

}//конец ф-ции раундов


}//конец для всех частeй текста

//разбиение 64 битных ключей по 16 бит каждый
var j = 0;
var numArrBy16 = [];
var numArr = [];

	for(var i = 0; i < encryptedArr.length; i++){
	numArrBy16[j++] = encryptedArr[i].substring(0,16);
	numArrBy16[j++] = encryptedArr[i].substring(16,32);
	numArrBy16[j++] = encryptedArr[i].substring(32,48);
	numArrBy16[j++] = encryptedArr[i].substring(48,64);
}

var out = chek ? line(numArrBy16) : code36(numArrBy16);

//перевод бит в слово
function line(arr16){
var str = '';
for(var i = 0; i < arr16.length; i++){
	numArr[i] = parseInt(arr16[i], 2);
	if(numArr[i]!=0)str += String.fromCharCode(numArr[i]);
	//перевод юникод в текст

}
return str;
}

function code36(arr16){
var hex36 = '', inspection;
for(var i = 0; i < arr16.length; i++){
	inspection = arr16[i++]+arr16[i];
	inspection = parseInt(inspection, 2);
	inspection = inspection.toString(36);
	while(inspection.length != 7){
		inspection = '0' + inspection;
	}
	hex36 += inspection;

	//перевод юникод в текст

}
return hex36;
}

return out;

	}//конец функции DES

}