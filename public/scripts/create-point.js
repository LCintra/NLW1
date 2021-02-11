function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const ufValue = event.target.value
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    //console.log(event.target)  É quem foi mudado e causou o listener de eventos acionar, no caso o select do uf
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json())
    .then(cities =>{
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll(".items-grid li")
const collectedItems = document.querySelector("input[name=items]")
for(item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}
let selectedItems = []
function handleSelectedItem(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected") //.add para adicionar .remove para remover e .toggle para tirar ou remover
    const itemId = event.target.dataset.id
    console.log('ITEM ID: ', itemId)
    //verificar se existem item selecionados, se sim pega-los
    //se clicar já estiver selecionado, tirar da seleção
    //se não tiver selecionado, adicionar a seleção
    //atualizar o campo escondido com os itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId
        return itemFound
    })  //pra cada item que ele encontrar no array ele executa essa função findindex de parâmetro item que retorna true or false dependendo se item == Itemid
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            return item != itemId
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    console.log('selectedItems: ',selectedItems)
    //agora atualizar o campo escondido
    collectedItems.value = selectedItems    
}



