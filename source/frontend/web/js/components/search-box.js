export function createSearchBox(){
    document.head.innerHTML+= `<link rel="stylesheet" href="css/components/search.css">`
    const searchGroup = document.createElement('span')
    const searchInput = document.createElement('input')
    const searchButton = document.createElement('button')

    searchGroup.className = 'search-group'
    searchInput.className = 'search-input'
    searchButton.className = 'btn search-btn'
    searchButton.innerHTML = '<img src="../assets/magnifying-glass-solid-full.svg" alt="search-icon"/>' 

    searchGroup.search = searchInput
    searchGroup.searchButton = searchButton
    searchGroup.append(searchInput,searchButton)
    return searchGroup;
}