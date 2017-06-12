import React from 'react';
import {createStore} from 'redux';
import {range, last} from 'lodash';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import faker from 'faker';

import { UserItem } from '../../client/components/';
// var rootReducer, {SET_ORDER, DELETE_ORDER, GET_ORDERS, getOrders, deleteOrder}  from '../../client/reducer';
// import actualStore from '../../client/store';

// NOTE: these specs use vanilla React & Redux — no React-Redux.

describe('▒▒▒ React tests ▒▒▒', function () {

    describe('Message', () => {

        describe('visual content', () => {

            // Before every `it` spec, we instantiate a new `Message` react component.
            // `Message` comes from the react/components/Message.js file.
            // This component will receive some data in its `fullMessage` prop.
            // We store this component in a testable wrapper, `messageWrapper`.

            let UserItemData, UserItemWrapper, empty;
            beforeEach('Create <UserItem /> wrapper', () => {
                 UserItemData = {
                    id: 5,
                    name: 'dan',
                    email: 'ashi@gracehopperacademy.com',
                    isAdmin: 'false',
                    shippingAddress: 'this is my address!',
                    createdAt: 'Today junior'
                };
                    empty = function(){return 1};
                // creates the testable React component
                 UserItemWrapper = shallow(`<UserItem user={UserItemData} handleUpdateClick={empty} deleteUser={empty} />`);
            });

            // These specs are relatively promitive — all we are asking you to
            // do is to fill in each JSX tag (h1, h2, etc.) in the `render`
            // method to match the HTML string shown. You can pass these in a
            // "trivial" way, but look five or so specs down for a twist…

            it('includes dan', () => {
                expect(messageWrapper.find('th')).to.have.html('<th>dan</th>');
            });

            it('includes "TO" line as h2', () => {
                expect(messageWrapper.find('h2')).to.have.html('<h2>To: <span>ashi@gracehopperacademy.com</span></h2>');
            });

            it('includes "SUBJECT" line as h3', () => {
                expect(messageWrapper.find('h3')).to.have.html('<h3>Subject: <span>In re: curriculum updates</span></h3>');
            });

            it('includes "BODY" as p', () => {
                expect(messageWrapper.find('p')).to.have.html('<p>We should teach React!</p>');
            });

            // This spec requires more understanding of JSX / React.
            // Here we are demonstrating that your `render` method shouldn't
            // always return the exact same strings in its JSX; instead, the result
            // should vary based on the passed-in data. Where does that data come from?
            // How do you get access to it? Go back to the `beforeEach` block to see.

            it('is not hardcoded', () => {
                const aDifferentMessage = {
                    id: 6,
                    from: {email: 'ashi@gracehopperacademy.com'},
                    to: {email: 'dan.sohval@fullstackacademy.com'},
                    subject: 'Re: In re: curriculum updates',
                    body: 'Sounds awesome'
                };
                // we make a new component with this different data, and check its contents
                const differentMessageWrapper = shallow(`<UserItem user={UserItemData} handleUpdateClick={empty} deleteUser={empty} />`);
                expect(messageWrapper.find('th')).to.have.html('<th>dan</th>');
            });

        });
    })
});
