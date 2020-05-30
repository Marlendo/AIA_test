import AsyncStorage from '@react-native-community/async-storage';

export const getPublicPost = async (data) => {
    let newData = []
    const favoriteStorage = await AsyncStorage.getItem('favorite')
    if (favoriteStorage) {        
        for (let i in data) {
            let isFavorite = JSON.parse(favoriteStorage).filter(function (rows) {
                return rows.link === data[i].link
            });
            if (isFavorite.length !== 0) {                
                newData.push(Object.assign({
                    favorite: true
                }, data[i]))
            } else {
                newData.push(Object.assign({
                    favorite: false
                }, data[i]))
            }
        }
        return newData
    } else {        
        return data
    }
}