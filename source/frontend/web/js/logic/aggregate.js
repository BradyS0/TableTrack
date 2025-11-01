export function restaurantSearchByNameTags(search_by, restaurants){
    const result = restaurants.filter(rest =>
        rest.name.toLowerCase().includes(search_by.toLowerCase())
        || rest.tags.filter(tag => tag.toLowerCase().includes(search_by.toLowerCase())).length > 0
    );

    return result
}