document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calcularButton').addEventListener('click', function(event) {
      event.preventDefault();
      let ip = document.getElementById('DirIPFormControl').value;
      let mascara = parseInt(document.getElementById('MascaraRedFormControl').value);
      let subnet = document.getElementById('SubRedNetFormControl').value;
      let cuadmask = document.getElementById('cuadmask');
      let subnetContainer = document.getElementById('subnetContainer');
      let partesIP = ip.split('.').map(octeto => parseInt(octeto));
      let dirred = [...partesIP];
      let dirbroca = [...partesIP];
      let ipmin = [...partesIP];
      let ipmax = [...partesIP];
      let oct_llenos = Math.floor(mascara / 8);
      let cant_de_host = Math.pow(2, 32 - mascara) - 2;
      let salto = Math.pow(2, (8 - mascara % 8));
      let octdered = Math.floor(partesIP[oct_llenos] / salto) * salto;
     
      subnetContainer.innerHTML = '';

      if (subnet.trim() === "") {
          cuadmask.style.display = 'block';
          ipmin = [...dirred];
          let restantes = cant_de_host;

          for (let index = dirbroca.length - 1; index >= oct_llenos; index--) {
              if (restantes >= 254) {
                  dirbroca[index] = 255;
                  dirred[index] = 0;
                  restantes = Math.floor(restantes / 256);
              } else {
                  dirred[index] = octdered;
                  dirbroca[index] = restantes + octdered;
              }
          }

          ipmin = [...dirred];
          ipmin[3]++;
          ipmax = [...dirbroca];
          ipmax[3]--;

          document.getElementById('direccionSpan').innerHTML = ip;
          document.getElementById('mascaraSpan').innerHTML = mascara;
          document.getElementById('direccionRedSpan').innerHTML = dirred.join('.');
          document.getElementById('HostMinimoSpan').innerHTML = ipmin.join('.');
          document.getElementById('HostMaximoSpan').innerHTML = ipmax.join('.');
          document.getElementById('BroadcastSpan').innerHTML = dirbroca.join('.');
          document.getElementById('HostSpan').innerHTML = cant_de_host;

          return;
      } else {// cuando el campo de subnet esta vacio
          cuadmask.style.display = 'none';
          
          let subnetInt = parseInt(subnet);
          let cant_de_subredes = Math.pow(2, (subnetInt - mascara));
          let restantes = cant_de_host;
          let oct_llenossub = Math.floor(subnet / 8);
          for (let index = dirbroca.length - 1; index >= oct_llenos; index--) {
            if (restantes >= 254) {
                dirbroca[index] = 255;
                dirred[index] = 0;
                restantes = Math.floor(restantes / 256);
            } else {
                dirred[index] = octdered;
                dirbroca[index] = restantes + octdered;
            }
        }
        cant_de_host=cant_de_host+2;
        let cant_de_host_subred=(cant_de_host/cant_de_subredes);

        if (cant_de_subredes>256) {
            cant_de_subredes=260;
        }
        if (cant_de_host <= 256) {
            let subnetDiv = document.createElement('div');
            subnetDiv.className = 'subnet'; 
            let parteEnt=0.0;
            parteEnt=0;
           
            let parteDec=0;
            parteDec= cant_de_host_subred/256 ;
            parteDec=(parteDec*256);
            for (let i = 0; i < cant_de_subredes; i++) {
                let pSubred = document.createElement('p');
                pSubred.textContent = `Subred ${i + 1}:`;
                let pDirRed = document.createElement('p');
                pDirRed.innerHTML = `Dirección de red: <span>${dirred.join('.')}</span>`;

           
            ipmin=[...dirred];
            ipmin[3]++;
            dirred[3]+=parteDec;
            dirbroca=[...dirred];
            dirbroca[3]--;
            ipmax=[...dirbroca];
            ipmax[3]--;
            let pHostMin = document.createElement('p');
            pHostMin.innerHTML = `Host Mínimo: <span>${ipmin.join('.')}</span>`;

            let pHostMax = document.createElement('p');
            pHostMax.innerHTML = `Host Máximo: <span>${ipmax.join('.')}</span>`;

            let pBroadcast = document.createElement('p');
            pBroadcast.innerHTML = `Broadcast: <span>${dirbroca.join('.')}</span>`;

           let pHost = document.createElement('p');
            pHost.innerHTML = `Host: <span>${cant_de_host_subred-2}</span>`;

            subnetDiv.appendChild(pSubred);
            subnetDiv.appendChild(pDirRed);
            subnetDiv.appendChild(pHostMin);
            subnetDiv.appendChild(pHostMax);
            subnetDiv.appendChild(pBroadcast);
            subnetDiv.appendChild(pHost);
            subnetContainer.appendChild(subnetDiv);
            }








            
        }else if (cant_de_host <= 65536) {
            let subnetDiv = document.createElement('div');
            subnetDiv.className = 'subnet';

              
            for (let i = 0; i < cant_de_subredes; i++) {
                let pSubred = document.createElement('p');
                                pSubred.textContent = `Subred ${i + 1}:`;
                                let pDirRed = document.createElement('p');
                                pDirRed.innerHTML = `Dirección de red: <span>${dirred.join('.')}</span>`;

                
                    ipmin=[...dirred];
                    ipmin[3]++;
                    if (cant_de_host_subred>255) {// hace el subneteo para cuadno las subredes tiene mas de 256 hosts por subred
                        dirred[2]+=cant_de_host_subred%255;
                        dirbroca=[...dirred];
                        dirbroca[3]=255;
                        dirbroca[2]--;
                        ipmax=[...dirbroca]
                        ipmax[3]--;

                        
                    }
                    else{//hace el subneteo para las redes de menos de 256 hosts por subred
                       
                        dirred[3]+=cant_de_host_subred;
                        if (dirred[3]>255) {
                           dirbroca=[...dirred];
                           dirbroca[3]--;
                           ipmax=[...dirbroca];
                           ipmax[3]--;
                           dirred[3]=0;
                           dirred[2]++;
                            
                        } else {
                            dirbroca=[...dirred];
                           dirbroca[3]--;
                           ipmax=[...dirbroca];
                           ipmax[3]--;
                        }


                    }
                    
                
                
                
                
                    let pHostMin = document.createElement('p');
                    pHostMin.innerHTML = `Host Mínimo: <span>${ipmin.join('.')}</span>`;
  
                    let pHostMax = document.createElement('p');
                    pHostMax.innerHTML = `Host Máximo: <span>${ipmax.join('.')}</span>`;
  
                    let pBroadcast = document.createElement('p');
                    pBroadcast.innerHTML = `Broadcast: <span>${dirbroca.join('.')}</span>`;
  
                   let pHost = document.createElement('p');
                    pHost.innerHTML = `Host: <span>${cant_de_host_subred-2}</span>`;
  
                    subnetDiv.appendChild(pSubred);
                    subnetDiv.appendChild(pDirRed);
                    subnetDiv.appendChild(pHostMin);
                    subnetDiv.appendChild(pHostMax);
                    subnetDiv.appendChild(pBroadcast);
                    subnetDiv.appendChild(pHost);
                    subnetContainer.appendChild(subnetDiv);

                


            }
        
        }else {// para mas de 65536 hosts
            let subnetDiv = document.createElement('div');
            subnetDiv.className = 'subnet';
            
                    
                    let valor_salto=256-(256-(2**(8-(subnet%8))))
                    
                        for (let i = 0; i < cant_de_subredes; i++) {
                            let pSubred = document.createElement('p');
                                pSubred.textContent = `Subred ${i + 1}:`;
                                let pDirRed = document.createElement('p');
                                pDirRed.innerHTML = `Dirección de red: <span>${dirred.join('.')}</span>`;
                            
    
                            
                                ipmin=[...dirred];
                                ipmin[3]++;
                               /* if (cant_de_host_subred>524286) {
                                    console.log("Hola");
                                }else*/ if (cant_de_host_subred>765) {
                                    dirred[1]+=cant_de_host_subred%255;
                                    console.log("4");
                                    console.log(cant_de_host_subred%255);
                                    if (dirred[1]>255) {
                                        dirbroca=[...dirred];
                                        dirbroca[1]--;
                                        dirbroca[3]=255;
                                        dirbroca[2]=255;
                                        ipmax=[...dirbroca];
                                        ipmax[3]--;
                                        dirred[2]=0;
                                        dirred[3]=0;
                                        dirred[1]=0;
                                        dirred[0]++;
                                        
                                    } else {
                                        dirbroca=[...dirred];
                                        dirbroca[1]--;
                                        dirbroca[3]=255;
                                        dirbroca[2]=255;
                                        ipmax=[...dirbroca];
                                        ipmax[3]--;
                                        dirred[2]=0;
                                        dirred[3]=0;
                                        
                                    }





                                


                                } else if (cant_de_host_subred>255) {
                                    console.log("2");
                                    dirred[2]+=cant_de_host_subred%255;
                                    console.log(cant_de_host_subred%255);
                                    if (dirred[2]>255) {

                                    dirbroca=[...dirred];
                                    dirbroca[3]=255;
                                    dirbroca[2]--;
                                    ipmax=[...dirbroca]
                                    ipmax[3]--;
                                    dirred[3]=0;
                                   dirred[2]=0;
                                   dirred[1]++;
                                        
                                    } else {
                                        dirbroca=[...dirred];
                                        dirbroca[3]=255;
                                        dirbroca[2]--;
                                        ipmax=[...dirbroca]
                                        ipmax[3]--;
                                        dirred[3]=0;
                            
                                        
                                    }





                                } else {

                                    console.log("1");
                                    dirred[3]+=cant_de_host_subred;
                                    if (dirred[3]>255) {
                                    dirbroca=[...dirred];
                                    dirbroca[3]--;    
                                    dirred[2]++;
                                        if (dirred[2]>255) {
                                            dirbroca=[...dirred];
                                            dirbroca[2]=0;
                                            dirred[2]=0;
                                            dirbroca[3]--;
                                            dirred[2]++;
                                        }else {
                                            dirred[3]=0;
                                            ipmax=[...dirbroca];
                                            ipmax[3]--;  
                                        } 
                                    } else {
                                        dirbroca=[...dirred];
                                        dirbroca[3]--;
                                        ipmax=[...dirbroca];
                                        ipmax[3]--;
                                    }

                                }
                            
                               
              
                                
              
                              
                                let pHostMin = document.createElement('p');
                                pHostMin.innerHTML = `Host Mínimo: <span>${ipmin.join('.')}</span>`;
              
                                let pHostMax = document.createElement('p');
                                pHostMax.innerHTML = `Host Máximo: <span>${ipmax.join('.')}</span>`;
              
                                let pBroadcast = document.createElement('p');
                                pBroadcast.innerHTML = `Broadcast: <span>${dirbroca.join('.')}</span>`;
              
                               let pHost = document.createElement('p');
                                pHost.innerHTML = `Host: <span>${cant_de_host_subred-2}</span>`;
              
                                subnetDiv.appendChild(pSubred);
                                subnetDiv.appendChild(pDirRed);
                                subnetDiv.appendChild(pHostMin);
                                subnetDiv.appendChild(pHostMax);
                                subnetDiv.appendChild(pBroadcast);
                                subnetDiv.appendChild(pHost);
                                subnetContainer.appendChild(subnetDiv);
                                
    
                        }

        
                       
        
        
        
        
        
        
        
        
        }
          

        
          
              

             

        

                  
              
          
      }
  });
});


    
    
    

