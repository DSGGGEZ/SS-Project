import Api from '@/services/Api'

export default {
    index() {
        return Api().get('places')
    },
    show(placeId){
        return Api().get('place/'+placeId)
    },
    post(place){
        return Api().post('place', place)
    },
    put(place){
        return Api().put('place/'+place.id, place)
    },
    delete(place){
        return Api().delete('place/'+place.id, place)
    },
}