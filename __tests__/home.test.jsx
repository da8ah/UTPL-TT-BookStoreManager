import React from 'react';
import { act, create } from 'react-test-renderer';
import Home from '../src/view/screens/Home';
import Wrapper from './wrapper';
import StockBook from '../src/model/core/entities/StockBook';

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
        // comp = create(<Home />).root;
        // {/* <RootNav navigation={navigation} /> */ }
        // {/* <MainFrame navigation={navigation} /> */ }
        comp = create(<Wrapper>
            <Home navigation={navigation} />
        </Wrapper>)
        // console.log(comp.root);
    });

    it('should render <BookStore />', async () => {
        expect(comp).toBeDefined()
        let books
        books = comp.root.findByProps({ testID: 'books' }).props
        console.log(books)
        expect(books).toBeDefined()
    });

    // it('should render home: <BookEditor />', async () => {
    //     let home
    //     await act(async () => {
    //         home = await comp.findByProps({ testID: 'nav' });
    //     });
    //     expect(home).toBeDefined();
    // });
});
