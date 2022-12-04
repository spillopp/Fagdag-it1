document.addEventListener('DOMContentLoaded', () => { //Gjør at js koden venter til siden har lastet ordentlig inn

    const bildeListe = [ //En liste med kortene som skal brukes i spillet
        {
            name: 'tre',
            image: './bilder/bilde 1.jpeg'     
        },  
        {
            name: 'tre',
            image: './bilder/bilde 1.jpeg'     
        },
        {
            name: 'univers',
            image: './bilder/bilde3.jpeg'     
        },
        {
            name: 'univers',
            image: './bilder/bilde3.jpeg'     
        },

        {
            name: 'skog',
            image: './bilder/bilde2.jpeg'     
        },
        {
            name: 'skog',
            image: './bilder/bilde2.jpeg'     
        },
        {
            name: 'sort_hull',
            image: './bilder/bilde4.png'
        },
        {
            name: 'sort_hull',
            image: './bilder/bilde4.png'
        }
    ]

    const ruter = document.querySelector('.rutenett'); //
    bildeListe.sort( () => 0.5 - Math.random() );
    const forsøkHolder = document.querySelector('.forsøkHolder');
    const funnetHolder = document.querySelector('.funnetHolder');
    const bilderISpill = 10;
    var forsøk = 0;
    var funnet = 0;
    var valgteBilder = [];
    var valgteBilderId = [];
    forsøkHolder.textContent = forsøk;
    funnetHolder.textContent = funnet;   

        function flipBilde() { // Funskjonen som flipper bildene når de trykkes på
            if(valgteBilder != 2){ // skjekker om valgte bilder ikke er 2 for å spørge for at man ikke kan trykke på fler enn 2 kort av gangen
                var bildId = this.getAttribute('data-id') // Definerer bildeId som id-en til bildene i Bildelista.
                if(this.getAttribute('src') != 'blank.png'){  // Hvis kortet som blit valgt ikke er et blankt bilde kjøres koden under
                    valgteBilder.push(bildeListe[bildId].name); // Legger til navnet til det valgte bildet i "valgteBilder"
                    valgteBilderId.push(bildId); // Legger til id-en til det valgte bildet i "valgteBilderId"
                    this.setAttribute('src', bildeListe[bildId].image); // Gjør bildet om fra placeholder bildet til det faktiske bildet
                    if(valgteBilder.length ==2){ // Hvis to bilder er valgt kjører programmet "skjekkMatch" funksjonen
                        setTimeout(skjekkMatch, 400); 
                }
            }
        }
    }
        function skjekkMatch() { // funksjonen som skjekker om de to kortene som har blitt valgt er det samme bidlet
            forsøk ++ //Legger til 1 til forsøkstelleren
            var kort = document.querySelectorAll('img'); //
            var førsteBilde = valgteBilderId[0]; //Definerer det første valgte bildet med Id-en til det bildet som ble valgt først
            var andreBilde = valgteBilderId[1]; //Definerer det anbre valgte bildet med Id-en til det bildet som ble valgt sist
            if(valgteBilder[0] == valgteBilder[1]){ //Skjekker om bildene er de samme, hvis de er like kjøres koden under
                funnet++ //Legger til 1 på telleren over antall bildepar du har funnet
                kort[førsteBilde].setAttribute('src', './bilder/blank.png'); //Gjør "førsteBilde" som ble definert i koden over om til det blanke bildet "blank.png"
                kort[andreBilde].setAttribute('src', './bilder/blank.png'); //Gjør "andreBilde" som ble definert i koden over om til det blanke bildet "blank.png"
            } else{ // Hvis de to bildene ikke er like kjører koden under
                kort[førsteBilde].setAttribute('src', './bilder/placeholder.png'); // Setter første bildet tilbake til "placehodler.png"
                kort[andreBilde].setAttribute('src', './bilder/placeholder.png'); // Setter andre bildet tilbake til "placehodler.png"
            }
            valgteBilder = [];// Setter valgteBilder tilbake til å være en tom array.
            valgteBilderId = []; //Setter ValgteBilderId tilbake til å være en tom array
            forsøkHolder.textContent = forsøk // Gjør teksten i forsøkHolder om til teksten i forsøk
            funnetHolder.textContent = funnet // Gjør teksten i funnetHolder om til teksten i funnet
            if (funnet == bildeListe.length/2){ // Skjekker om du har funnet alle bildeparrene
                alert('Gratulerer du vant') // Sier ifra om at du klarte det
            }

        }
        document.getElementById('reset').addEventListener('click', () => { // Resetter spillbrettet og starter spillet på nytt
            for(i = 0; i<bildeListe.length; i++) {
                var kort = document.querySelectorAll('img')
                ruter.removeChild(kort[0])
            }
            bildeListe.sort( () => 0.5 - Math.random() );
            funnet = 0;
            forsøk = 0;
            startSpill()
        });
        
        function startSpill(){ //Funksjonen som starter spillet
            for (var i = 0; i < bildeListe.length; i++) { // Denne koden gjentas like mange ganger som det er inlegg i bildelsita.          
                var kort = document.createElement('img'); // Lager en variabel "kort" og definerer det som et bilde
                kort.setAttribute('src', './bilder/placeholder.png'); // Bruker src til å gjøre kortet om til placegolder.png
                kort.setAttribute('data-id', i); //Gir dette spesefike kortet en id basert på hvor langt ut i for loopen dette kortet lages.
                kort.addEventListener('click',flipBilde); //gjør at funskjone "flipBilde" kjøres hvis kortet klikkes på
                ruter.appendChild(kort); //Legger til dette kortet til "ruter" som vi har definert som en flexbox litt over
                }
            }
    startSpill()
            
});