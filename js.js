  document.addEventListener('DOMContentLoaded', function() {
        
    document.getElementById('calcularButton').addEventListener('click', function(event) {
        event.preventDefault();
        let ip = document.getElementById('DirIPFormControl').value;
        let mascara=document.getElementById('MascaraRedFormControl').value;
        let partesIP = ip.split('.').map(octeto => parseInt(octeto));;
        let dirred = [...partesIP];
        let dirbroca = [...partesIP];
        let ipmin=[...partesIP];
        let ipmax=[...partesIP];
        let oct_llenos = Math.floor(mascara / 8);
        let cant_de_subredes = Math.pow(2, mascara - (oct_llenos * 8));
        let cant_de_host = Math.pow(2, 32 - mascara) - 2;
        let salto=Math.pow(2, (8 - mascara % 8));
        let octdered=Math.floor(partesIP[oct_llenos] / salto) * salto;// es el numero del salto mas cercano al de la ip inicial
       
        dirred[oct_llenos]=octdered;

        dirbroca[oct_llenos]=cant_de_host+octdered+1;

        ipmin[oct_llenos]=dirred[oct_llenos]+1;

        ipmax[oct_llenos]=dirbroca[oct_llenos]-1;

        document.getElementById('direccionSpan').innerHTML=ip;
        document.getElementById('mascaraSpan').innerHTML=mascara;
        document.getElementById('direccionRedSpan').innerHTML=dirred.join('.');
        document.getElementById('HostMinimoSpan').innerHTML=ipmin.join('.');
        document.getElementById('HostMaximoSpan').innerHTML=ipmax.join('.');
        document.getElementById('BroadcastSpan').innerHTML=dirbroca.join('.');
        document.getElementById('HostSpan').innerHTML=cant_de_host;



    });
});
    

    
    
    

