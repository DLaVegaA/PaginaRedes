let ip = '12.10.5.92';
let mascara = 22;
let partesIP = ip.split('.').map(octeto => parseInt(octeto));;
let dirred = [...partesIP];
let dirbroca = [...partesIP];
let ipmin = [...partesIP];
let ipmax = [...partesIP];

let oct_llenos = Math.floor(mascara / 8);
let cant_de_subredes = Math.pow(2, mascara - (oct_llenos * 8));
let cant_de_host = Math.pow(2, 32 - mascara) - 2;
console.log(cant_de_subredes);
console.log(cant_de_host);
let salto=Math.pow(2, (8 - mascara % 8));
console.log(salto);
console.log(Math.floor(partesIP[oct_llenos] / salto) )
let octdered=Math.floor(partesIP[oct_llenos] / salto) * salto;// es el numero del salto mas cercano al de la ip inicial
console.log(oct_llenos)
console.log(dirred);


console.log(dirred);
console.log(dirbroca)
ipmin=[...dirred];
let restantes=cant_de_host;
console.log(restantes);
console.log(dirbroca.length-1);
for (let index = dirbroca.length-1; index >= oct_llenos; index--) {
    console.log(restantes);
    if(restantes>=254){
        
        console.log(index)
        dirbroca[index]=255;
        dirred[index]=0;
        restantes=Math.floor(restantes/256);
        console.log(restantes);
    }else{
        
        console.log(index);
        dirred[index]=octdered;
        dirbroca[index]=restantes+octdered;
    }
  
    
   
};
//dirbroca[oct_llenos]=cant_de_host+octdered+1;
console.log(dirbroca);
console.log(octdered);
ipmin=[...dirred];
ipmin[3]++;
console.log(ipmin);
console.log(dirred)
ipmax=[...dirbroca];
ipmax[3]--;
console.log(ipmax);


