import Api from '@/services/Api'

export default {
    index() {
        return Api().get('cafes')
    },
    show(cafeId){
        return Api().get('cafe/'+cafeId)
    },
    post(cafe){
        return Api().post('cafe', cafe)
    },
    put(cafe){
        return Api().put('cafe/'+cafe.id, cafe)
    },
    delete(cafe){
        return Api().delete('cafe/'+cafe.id, cafe)
    },
}