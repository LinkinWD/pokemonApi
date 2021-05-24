const pokelista = document.querySelector('.pokelista')
const seuraava = document.querySelector('.seuraava')
const edellinen = document.querySelector('.edellinen')
const yksiPokemon = document.querySelector('.yksipokemon')

const alkuOsoite = 'https://pokeapi.co/api/v2/pokemon/'
let seuraavatPoket
let edellisetPoket

/* rajapintahaku */
const lähetäPyyntö = async (osoite) => {
    try {
        const resp = await axios.get(osoite);
        console.log(resp.data);
        return resp.data
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }

};

/* yksittäispoken kuuntelija */
const liKuuntelija = () => {
        const li = document.querySelectorAll('li')
        li.forEach(  (tämä) => {
            tämä.addEventListener('click', () => {
                näytäPoke(tämä.dataset.osoite)
            })
        })
    } 


/* alkulistanluominen */
const luoLista = async (osoite) => {
    const lista = await lähetäPyyntö(osoite)
    const ul = document.createElement('ul')
    for(let poke of lista.results) {
        let li = document.createElement('li')  
        li.innerText= `${poke.name}`
        li.dataset.osoite = `https://pokeapi.co/api/v2/pokemon/${poke.name}/`
        ul.append(li)
    }
    pokelista.append(ul)
    seuraavatPoket = lista.next
    edellisetPoket = lista.previous
    console.log(edellisetPoket)
    if(!edellisetPoket) {
        
        edellinen.classList.add('piilota')
    } else {
        edellinen.classList.remove('piilota')
    }
    
    liKuuntelija()
}
luoLista(alkuOsoite)

/* Lisä pokemonien hakeminen */
seuraava.addEventListener('click', () => {
    pokelista.innerHTML = ''
    luoLista(seuraavatPoket)
})
edellinen.addEventListener('click', () => {
    pokelista.innerHTML = ''
    luoLista(edellisetPoket)
})

async function näytäPoke(osoite) {
    const poke = await lähetäPyyntö(osoite)
    console.log(poke)
    yksiPokemon.innerHTML = ''
    const img = document.createElement('img')
    img.src = poke.sprites.front_default
    yksiPokemon.append(img)
    const p = document.createElement('p')
    p.innerText = '(Paina missä vaan sulkeaksesi)'
    yksiPokemon.append(p)
    const h3 = document.createElement('h3')
    h3.innerText = 'Abilities'
    yksiPokemon.append(h3)
    let ul = document.createElement('ul')
    ul.classList.add('abilities')
    yksiPokemon.append(ul)
    const abilities = document.querySelector('.abilities') 
    for(let taito of poke.abilities){
        let li = document.createElement('li')
        li.innerText=taito.ability.name
        abilities.append(li)
    }
    const hh3 = document.createElement('h3')
    hh3.innerText = 'stats'
    yksiPokemon.append(hh3)
    let ul2 = document.createElement('ul')
    ul2.classList.add('stats')
    yksiPokemon.append(ul2)
    const stats = document.querySelector('.stats')
    for(let stat of poke.stats){
        let li = document.createElement('li')
        console.log(stat)
        li.innerText= `${stat.stat.name}: ${stat.base_stat}` 
        stats.append(li)
    }
    yksiPokemon.classList.remove('piilota')
    yksiPokemon.addEventListener('click', () => yksiPokemon.classList.add('piilota'))  
}




