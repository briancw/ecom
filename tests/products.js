const {assert} = require('chai')
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/products.js')

describe('Insert a product into the database', () => {
    let newProduct = {
        name: 'Test Product',
        urlSlug: 'test-product',
        price: 3.50,
        sku: 'tp1',
        description: 'test product description',
        weight: 1,
        buyable: true,
        sortOrder: 1,
        isVariant: false,
        isVisible: true,
    }

    it('Should return a success message when supplied valid inputs', async () => {
        let result = await createProduct(newProduct)
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should not allow duplicate names', async () => {
        newProduct.urlSlug = 'foo'
        let result = await createProduct(newProduct)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow duplicate url slugs', async () => {
        newProduct.name = 'foo'
        newProduct.urlSlug = 'test-product'
        let result = await createProduct(newProduct)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should allow creating multiple products', async () => {
        newProduct.name = 'Test Product 2'
        newProduct.urlSlug = 'test-product-2'
        let result = await createProduct(newProduct)
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should not allow empty strings for name', async () => {
        newProduct.name = ''
        newProduct.urlSlug = 'random-slug'
        let result = await createProduct(newProduct)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow empty strings for url slug', async () => {
        newProduct.name = 'random name'
        newProduct.urlSlug = ''
        let result = await createProduct(newProduct)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })
})

describe('Get Products', () => {
    it('Should return a list of all existing products', async () => {
        let result = await getProducts()

        assert.isArray(result)
        assert.lengthOf(result, 2)
        assert.strictEqual(result[0].name, 'Test Product')
        assert.strictEqual(result[0].urlSlug, 'test-product')
        assert.strictEqual(result[1].name, 'Test Product 2')
        assert.strictEqual(result[1].urlSlug, 'test-product-2')
    })
})

describe('Update a product', () => {
    it('Should return a success message when supplied valid inputs', async () => {
        let updatedProduct = {
            name: 'Test Product Updated',
            urlSlug: 'test-product-updated',
        }

        let result = await updateProduct('test-product', updatedProduct)
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should update values on a product', async () => {
        // TODO This test is a little weak
        let result = await getProducts()
        assert.strictEqual(result[1].name, 'Test Product Updated')
        assert.strictEqual(result[1].urlSlug, 'test-product-updated')
    })
})

describe('Delete a product', () => {
    it('Should return a success message when supplied valid inputs', async () => {
        let result = await deleteProduct()
        assert.deepStrictEqual(result, {success: true})
    })

    // TODO test product was deleted

    // TODO test invalid entries
})
