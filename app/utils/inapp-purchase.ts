import { BuyItemOptions, Item as InAppItem, InAppPurchase, PaymentEvent } from '@akylas/nativescript-inapp-purchase/index';

let inappPurchase: InAppPurchase;
let inappItems: InAppItem[];
export function init() {
    if (!inappPurchase) {
        inappPurchase = new InAppPurchase();
        inappPurchase.on(PaymentEvent.EventName, (event: PaymentEvent.IEvent) => {
            switch (event.context) {
                case PaymentEvent.Context.CONNECTING_STORE:
                    console.log('Store Status: ' + event.result);
                    if (event.result === PaymentEvent.Result.SUCCESS) {
                        const canPay = inappPurchase.canMakePayments();
                        if (canPay) {
                            // pass in your product IDs here that you want to query for
                            inappPurchase.fetchItems(['io.nstudio.iapdemo.coinsfive', 'io.nstudio.iapdemo.coinsone', 'io.nstudio.iapdemo.coinsonethousand']);
                        }
                    }
                    break;
                case PaymentEvent.Context.RETRIEVING_ITEMS:
                    if (event.result === PaymentEvent.Result.SUCCESS) {
                        // if you passed multiple items you will need to handle accordingly for your app
                        inappItems = (event as PaymentEvent.RetrievingItems.ISuccess).payload;
                    }
                    break;
                case PaymentEvent.Context.PROCESSING_ORDER:
                    if (event.result === PaymentEvent.Result.FAILURE) {
                        console.log(`🛑 Payment Failure - ${(event as PaymentEvent.ProcessingOrder.IFailure).payload.description} 🛑`);
                        // handle the failure of the purchase
                    } else if (event.result === PaymentEvent.Result.SUCCESS) {
                        const payload = (event as PaymentEvent.ProcessingOrder.ISuccess).payload;
                        // handle the successful purchase
                        console.log('🟢 Payment Success 🟢');
                        console.log(`Order Date: ${payload.orderDate}`);
                        console.log(`Receipt Token: ${payload.receiptToken}`);
                        inappPurchase.finalizeOrder(payload);
                    }
                    break;
                case PaymentEvent.Context.FINALIZING_ORDER:
                    if (event.result === PaymentEvent.Result.SUCCESS) {
                        console.log('Order Finalized');
                    }
                    break;
                case PaymentEvent.Context.RESTORING_ORDERS:
                    console.log(event);
                    break;
                default:
                    console.log(`Invalid EventContext: ${event}`);
                    break;
            }
        });
    }
    inappPurchase.init();
    return inappPurchase;
}

export function buySponsor() {
    const opts: BuyItemOptions = {
        accountUserName: 'someuseraccount123@test.orgbizfree',
        android: {
            // vrPurchase: true
        },
        ios: {
            quantity: 1,
            simulatesAskToBuyInSandbox: true
        }
    };

    // This method will kick off the platform purchase flow
    // We are passing the item and an optional object with some configuration
    inappPurchase.buyItem(inappItems, opts);
}
