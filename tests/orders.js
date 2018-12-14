const {assert} = require('chai')
const {
    createOrder,
} = require('../controllers/orders.js')

describe('Create an Order', () => {
    it('Should return a success message when supplied valid inputs', async () => {
        let newOrder = {
            id: 10,
            billingName: 'test',
            billingCompany: 'test',
            billingPhone: '111 111 1111',
            billingEmail: 'test',
            billingAddress: 'test',
            billingCity: 'test',
            billingState: 'test',
            billingZip: '10016',
            shippingName: 'test',
            shippingAddress1: 'test',
            // shippingAddress2: '',
            shippingCity: 'test',
            shippingState: 'test',
            shippingZip: '10016',
            shippingSenderName: 'test',
            shippingGiftMessage: 'test',
            paid: false,
            cartId: 'test-id',
            orderTotal: 10,
            status: 'i cant remember what this is for',
            // trackingCode: '',
            isConfirmed: false,
            isShipped: false,
            isArchived: false,
            memo: 'test',
        }

        let result = await createOrder(newOrder)
        assert.deepStrictEqual(result, {success: true})
    })
})
