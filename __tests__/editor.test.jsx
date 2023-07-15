import React from 'react';
import { create } from 'react-test-renderer';
import BookEditor from '../src/view/screens/BookEditor';
import Wrapper from './wrapper';

jest.useFakeTimers()

const navigation = {
    navigate: jest.fn()
}

describe('<Home />', () => {
    let comp;
    beforeAll(() => {
        comp = create(<Wrapper>
            <BookEditor route={{ params: undefined }} navigation={navigation} />
        </Wrapper>)
    })

    it('should render home: <BookEditor />', async () => {
        let editor
        editor = comp.findByProps({ testID: 'editor' });
        expect(editor).toBeDefined();
    });
})
