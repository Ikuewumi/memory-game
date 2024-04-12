import path from 'path'
import { describe, it, expect } from 'vitest'


describe('Testing', _ => {
    it('Sum Testing', () => {

        const d = path.resolve('./src/test')
        console.log(d)

        expect(2 + 2).toBe(4)

    })

})
