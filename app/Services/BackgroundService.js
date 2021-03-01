import { ProxyState } from '../AppState.js'
import { sandBoxApi } from './AxiosService.js'

class BackgroundService {
    constructor() {
        this.getBackground()
    }

    async getBackground() {
        try {
            const res = await sandBoxApi.get("images/")
            ProxyState.activeBackground = res.data
        } catch (err) {
            console.error(err)
        }
    }

}

const backgroundService = new BackgroundService()
export default backgroundService; 