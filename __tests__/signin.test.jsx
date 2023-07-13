import React from 'react';
import { act, create } from 'react-test-renderer';
import SignIn from '../src/view/auth/SignIn';
import Wrapper, { authTestCTX } from './wrapper';

jest.useFakeTimers()

const navigation = {
    navigate: jest.fn()
}

describe('<SignIn />', () => {
    let comp
    beforeAll(() => {
        comp = create(<Wrapper>
            <SignIn navigation={navigation} />
        </Wrapper>)
    });

    it('should press signin', async () => {
        expect(comp).toBeDefined();
        console.log(authTestCTX.isAuth);
        await act(async () => {
            const buttonAuth = comp.root.findByProps({ testID: 'button-auth' }).props
            console.log(buttonAuth);
            await buttonAuth.onPress()
        })
        expect(authTestCTX.tryToAuth).toBeCalled()
    })

    it('should auth', async () => {
        expect(authTestCTX.isAuth).toBe(true)
        console.log(authTestCTX.isAuth);
    })
});