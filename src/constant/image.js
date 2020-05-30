const data = {
    icon: require('../../assets/images/icon.png'),
    iconWhite: require('../../assets/images/icon_white.png'),
    slide1: require('../../assets/images/dummy/slide1.png'),
    slide2: require('../../assets/images/dummy/slide2.png'),
    slide3: require('../../assets/images/dummy/slide3.png'),
    slide4: require('../../assets/images/dummy/slide4.png'),
    slide5: require('../../assets/images/dummy/slide5.png'),
    hairTreatment: require('../../assets/images/driyer.png'),
    nailTreatment: require('../../assets/images/nail.png'),
    hairColoring: require('../../assets/images/coloring.png'),
    creambath: require('../../assets/images/shower.png'),
    smoothing: require('../../assets/images/wig.png'),
}
export default data;

export const imageCategory = (id) => {

    switch (Number(id)) {
        case 1:
            return data.hairTreatment
        case 2:
            return data.nailTreatment
        default:
            return data.hairTreatment
    }
}

export const imageSubCategory = (id) => {

    switch (Number(id)) {
        case 1:
            return data.hairColoring
        case 2:
            return data.creambath
        case 3:
            return data.smoothing
        default:
            return data.hairTreatment
    }
}