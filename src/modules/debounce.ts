import {CancelerToken} from "@/service/REST_API/base";

class Debounce {
    timeoutId: ReturnType<typeof setTimeout> | undefined;
    func: Function;
    delay: number;
    request: boolean | undefined;
    source: ReturnType<typeof CancelerToken>;
    constructor(func: Function, delay: number) {
        this.timeoutId = undefined
        this.func = func
        this.delay = delay
        this.request = undefined
        this.source = CancelerToken()
    }
    run = async (val: any) => {
        if (this.request) {
            await this.reset();
        }

        return () => {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }

            return new Promise((resolve, reject) => {
                this.timeoutId = setTimeout(() => {
                    this.request = true;
                    resolve(this.func(val, this.source.token));
                }, this.delay);
            });
        };
    };
    reset = async () => {
        await this.source.cancel();
        this.request = undefined;
        this.source = CancelerToken();
    };
}


export {
    Debounce
}