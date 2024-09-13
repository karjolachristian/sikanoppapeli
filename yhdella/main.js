let pelaajat = [];
        let nykyinenPelaajaIndex = 0;
        let vuoroPisteet = 0;

        // Asetetaan pelaajat
        function asetaPelaajat() {
            const maara = document.getElementById('pelaajienMaara').value;
            const pelaajalista = document.getElementById('pelaajat');
            pelaajalista.innerHTML = '';
            
            for (let i = 1; i <= maara; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Pelaaja ${i}`;
                pelaajalista.appendChild(input);
            }

            const aloitaNappi = document.createElement('button');
            aloitaNappi.textContent = 'Aloita peli';
            aloitaNappi.onclick = aloitaPeli;
            pelaajalista.appendChild(aloitaNappi);

            document.getElementById('pelaajat').style.display = 'block';
            document.getElementById('asetukset').style.display = 'none';
        }

        // Aloitetaan peli
        function aloitaPeli() {
            const nimet = document.querySelectorAll('#pelaajat input');
            pelaajat = Array.from(nimet).map(input => ({ nimi: input.value || input.placeholder, pisteet: 0 }));
            
            document.getElementById('pelaajat').style.display = 'none';
            document.getElementById('peli').style.display = 'block';
            
            paivitaPelinakyma();
        }

        // Funktio heittämiselle
        function heita() {
            const tulos = Math.floor(Math.random() * 6) + 1;
            document.getElementById('noppa').textContent = tulos;

            if (tulos === 1) {
                vuoroPisteet = 0;
                seuraavaPelaaja();
            } else {
                vuoroPisteet += tulos;
            }

            paivitaPelinakyma();
        }

        // Vuoron lopetus ja pisteet tallennetaan
        function lopetaVuoro() {
            pelaajat[nykyinenPelaajaIndex].pisteet += vuoroPisteet;
            seuraavaPelaaja();
        }

        // Seuraavan pelaajan vuoro
        function seuraavaPelaaja() {
            nykyinenPelaajaIndex = (nykyinenPelaajaIndex + 1) % pelaajat.length;
            vuoroPisteet = 0;
            paivitaPelinakyma();
        }

        // Päivitellään
        function paivitaPelinakyma() {
            const nykyinenPelaaja = pelaajat[nykyinenPelaajaIndex];
            document.getElementById('nykyinenPelaaja').textContent = nykyinenPelaaja.nimi;
            document.getElementById('vuoroPisteet').textContent = vuoroPisteet;
            document.getElementById('kokonaisPisteet').textContent = nykyinenPelaaja.pisteet;
        }