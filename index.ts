//country enum
enum Country {
    EG = "EG",
    US = "US",
    AU = "AU",
}

//Shape interface
interface PaymentVendor{
    paymentIntent(arg: any):void;
    refund(arg: any):void;
}

//concrete classes implementing the same interface
class Stripe implements PaymentVendor{
    paymentIntent(arg: any): void {
        console.log(`Inside Stripe payment method, arg: ${arg}`);
    }
    refund(arg: any): void {
        console.log(`Inside Stripe refund method, arg: ${arg}`);
    }
}

class EgyptianVendor implements PaymentVendor{
    paymentIntent(arg: any): void {
        console.log(`Inside Paymob payment method, arg: ${arg}`);
    }
    refund(arg: any): void {
        console.log(`Inside Paymob refund method, arg: ${arg}`);
    }
}

//Factory to generate object of concrete class based on given information
class PaymentFactory {
    getPaymentVendor(countryCode: string): PaymentVendor{
        return (countryCode == Country.EG) ? new EgyptianVendor() : new Stripe()
    }
}


let paymentFactory: PaymentFactory = new PaymentFactory();

//get an object of Circle and call its draw method.
let paymentObjectInsideEgypt: PaymentVendor = paymentFactory.getPaymentVendor(Country.EG);

//call draw method of Circle
paymentObjectInsideEgypt.paymentIntent("attempting paying from Egypt through the egyptian vendor");


//another try
let paymentObjectOutsideEgypt: PaymentVendor = paymentFactory.getPaymentVendor(Country.US);
paymentObjectOutsideEgypt.refund("attempting paying from outside of Egypt through Stripe");