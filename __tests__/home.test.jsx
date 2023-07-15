import React from 'react';
import { create } from 'react-test-renderer';
import StockBook from '../src/model/core/entities/StockBook';
import Home from '../src/view/screens/Home';
import Wrapper from './wrapper';

jest.useFakeTimers()

const navigation = {
    navigate: jest.fn()
}

const listBooks = [
    new StockBook(
        '9786073152181',
        'https://azure.blob.png',
        'Crear o Morir',
        'Andrés Oppenheimer',
        '01/01/2014',
        '12/07/2023',
        'La esperanza de Latinoamérica y las cinco claves de la innovación.',
        16.95,
        true,
        100,
        false,
        300,
        true,
        true,
        false,
        false
    )
]

describe('<Home />', () => {
    let comp;
    beforeAll(() => {
        comp = create(<Wrapper>
            <Home navigation={navigation} />
        </Wrapper>)
    })

    it('should render <BookStore />', async () => {
        expect(comp).toBeDefined()
        let books
        books = comp.root.findByProps({ testID: 'books' }).props
        console.log(books)
        expect(books).toBeDefined()
    })
})
