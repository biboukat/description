{
	
var key;
function topKey(tKey){	
//проверка длинны ключа
function inspectionKey(val){
	if(val=="")return '123456789';
	var i = 0;
	while(val.length < 9){
		val += val.charAt(i++); 
	}
	return val;
}	
	var a = inspectionKey(tKey);
	var keyBit = 0; //сюда запишем начальный ключ в битах
	var keyArr = []; // массив юникода
	for(var i = 0; i<a.length; i++){
		var b = a.charCodeAt(i);		//берем каждый символ ключа, юникод
		keyArr[i] = b.toString(2);		//перевод ключа в биты
		while(keyArr[i].length<7){
			keyArr[i] = '0' + keyArr[i];// проверка длинны символа в битах	
		}
		keyBit += keyArr[i];		//запись в ключ каждый символ в битах
	}	
//document.writeln(keyBit+keyBit.length+'<br>');


// Делим ключ на два блока C0 и D0
var c0Position = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36];
var d0Position = [63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
// p блок нумерация
var keyPosition = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];


// получаем С0
var c0 = [];
for(var i = 0; i < c0Position.length; i++){
	c0.unshift(keyBit.charAt(63 - (c0Position[i]-1)));
}



//получаем D0
var d0 = [];
for(var i = 0; i < d0Position.length; i++){
	d0.unshift(keyBit.charAt(63 - (d0Position[i]-1)));
}



// сдвиг влево
function shiftLeft(cd0){
	cd0.push(cd0.shift());
	return cd0;
}

//функция сдвигов и записи в массив окончательных 16-ти ключей по 48 бит
function makeKey (c0,d0){
var keyNum = {}, intermediateValueC = c0, intermediateValueD = d0;
for(var i = 1; i < 17; i++){
	intermediateValueC = shiftLeft(intermediateValueC);
	intermediateValueD = shiftLeft(intermediateValueD);
	if(i == 1 || i == 2 || i == 9 || i == 16){
	} else{
		intermediateValueC = shiftLeft(intermediateValueC);
		intermediateValueD = shiftLeft(intermediateValueD);
	}
	keyNum['k'+i] = intermediateValueC.join('') + intermediateValueD.join('');
}


return keyNum;
}
key = makeKey(c0,d0);

//P бокс
var xxx = [];
for(var j in key){
	for(var i = 0; i < keyPosition.length; i++){
		xxx.unshift(key[j].charAt(i));
	}
	key[j] = xxx.join('');
	xxx.length = 0;
}
}//функцич KEY
}