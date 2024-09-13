let pelaajat = [];
        let nykyinenPelaaja = 0;
        let vuoronPisteet = 0;
        let perakkasetTuplat = 0;

        function asetaPelaajat() {
            const pelaajaMaara = document.getElementById('pelaaja-maara').value;
            document.getElementById('asetukset').style.display = 'none';
            const peliDiv = document.getElementById('peli');
            peliDiv.style.display = 'block';
            
            for (let i = 0; i < pelaajaMaara; i++) {
                const nimi = prompt(`Syötä pelaajan ${i + 1} nimi:`);
                pelaajat.push({ nimi, pisteet: 0 });
            }
            
            paivitaPelaajaNaytto();
        }

        function paivitaPelaajaNaytto() {
            const pelaajatDiv = document.getElementById('pelaajat');
            pelaajatDiv.innerHTML = '';
            pelaajat.forEach((pelaaja, indeksi) => {
                const pelaajaDiv = document.createElement('div');
                pelaajaDiv.className = `pelaaja ${indeksi === nykyinenPelaaja ? 'aktiivinen' : ''}`;
                pelaajaDiv.textContent = `${pelaaja.nimi}: ${pelaaja.pisteet}`;
                pelaajatDiv.appendChild(pelaajaDiv);
            });
        }

        function heitaNoppaa() {
            const noppa1 = Math.floor(Math.random() * 6) + 1;
            const noppa2 = Math.floor(Math.random() * 6) + 1;
            document.getElementById('nopat').textContent = `🎲 ${noppa1} ${noppa2}`;

            if (noppa1 === 1 && noppa2 === 1) {
                vuoronPisteet += 25;
                perakkasetTuplat = 0;
            } else if (noppa1 === noppa2) {
                vuoronPisteet += noppa1 * 4;
                perakkasetTuplat++;
                if (perakkasetTuplat === 3) {
                    alert('Kolme tuplaa peräkkäin! Vuoro päättyy.');
                    lopetaVuoro();
                    return;
                }
            } else if (noppa1 === 1 || noppa2 === 1) {
                alert('Ykkönen! Vuoro päättyy.');
                vuoronPisteet = 0;
                lopetaVuoro();
                return;
            } else {
                vuoronPisteet += noppa1 + noppa2;
                perakkasetTuplat = 0;
            }

            paivitaPelaajaNaytto();
        }

        function lopetaVuoro() {
            pelaajat[nykyinenPelaaja].pisteet += vuoronPisteet;
            vuoronPisteet = 0;
            perakkasetTuplat = 0;
            nykyinenPelaaja = (nykyinenPelaaja + 1) % pelaajat.length;
            paivitaPelaajaNaytto();

            if (pelaajat[nykyinenPelaaja].pisteet >= 100) {
                alert(`${pelaajat[nykyinenPelaaja].nimi} voitti pelin!`);
                aloitaAlustaOhjaussivu();
            }
        }

        function aloitaAlustaOhjaussivu() {
            pelaajat = [];
            nykyinenPelaaja = 0;
            vuoronPisteet = 0;
            perakkasetTuplat = 0;
            document.getElementById('asetukset').style.display = 'block';
            document.getElementById('peli').style.display = 'none';
            document.getElementById('nopat').textContent = '';
        }

        document.getElementById('asetukset').style.display = 'block';