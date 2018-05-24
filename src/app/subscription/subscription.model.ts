export class Subscription{
    constructor(
        public name: string,
        public description: string,
        public discount: number,
        public subscriptionId?: Subscription
    ) {}
}
