export function restaurantSearchByNameTags(search_by, restaurants){
    if (!Array.isArray(restaurants)|| !search_by|| 
    !(typeof(search_by)=== 'string')|| search_by.length===0) 
     return [];

    const result = restaurants.filter(rest => (rest.name && rest.tags) &&
        (rest.name.toLowerCase().includes(search_by.toLowerCase())
        || rest.tags.filter(tag => tag.toLowerCase().includes(search_by.toLowerCase())).length > 0)
    );

    return result
}