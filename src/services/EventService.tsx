import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"

class EventService {

    static async getAllEvent() {
        let events = await requestApiHelper(
            interceptor.get(
                "events"
            )   
        )
        return events;
    }
    static async createEvent(user: any) {
        return await requestApiHelper(
            interceptor.post(
                "events",
                user
            )   
        )
    }

}

export default EventService