export class HorizonService {
    constructor() {
        this.horizon = null;
        this.status = {};
    }

    connect() {
        this.horizon = Horizon({host: 'localhost:8181'});
        return new Promise((resolve, reject) => {
            this.horizon.onReady(status => {
                this.status = status;
                resolve(status);
            });
            this.horizon.connect();
        });
    }
}