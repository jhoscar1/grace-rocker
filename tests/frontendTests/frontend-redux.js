import React from 'react';
import {createStore} from 'redux';

import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import faker from 'faker';

import rootReducer, {SET_ORDER, DELETE_ORDER, GET_ORDERS, getOrders, deleteOrder} from '../../client/reducer';
import actualStore from '../../client/store';

 describe('Redux architecture', () => {

        describe('action creators', () => {

            // Action creators are functions which return action objects.

            describe('createMessagesReceivedAction', () => {

                it('returns expected action description', () => {

                    const message = .
                    const actionDescriptor = createMessagesReceivedAction(messages);
                    expect(actionDescriptor).to.be.deep.equal({
                        type: MESSAGES_RECEIVED,
                        messages: messages
                    });

                });

            });

            describe('createLoadingAction', () => {

                it('returns expected action description', () => {

                    const actionDescriptor = createLoadingAction();

                    expect(actionDescriptor).to.be.deep.equal({
                        type: MESSAGES_LOADING
                    });

                });

            });

            describe('createNewMessageAction', () => {

                it('returns expected action description', () => {

                    const message = testUtilities.createOneRandomMessage();

                    const actionDescriptor = createNewMessageAction(message);

                    expect(actionDescriptor).to.be.deep.equal({
                        type: NEW_MESSAGE,
                        message: message
                    });

                });

            });

        });

        // Remember, reducers receive old state and an action object, and
        // return a new state.

        describe('store/reducer', () => {

            let testingStore;
            beforeEach('Create testing store from reducer', () => {
                testingStore = createStore(rootReducer);
            });

            it('has an initial state as described', () => {
                const currentStoreState = testingStore.getState();
                // Our initial state has two properties as shown.
                expect(currentStoreState.messagesLoading).to.be.equal(false);
                expect(currentStoreState.messages).to.be.deep.equal([]);
            });

            // "on MESSAGES_LOADING" means when an action of that type is dispatched.

            describe('reducing on MESSAGES_LOADING', () => {

                it('affects state by setting messagesLoading to true and messages to empty array', () => {

                    // an action is dispatched…
                    testingStore.dispatch({
                        type: MESSAGES_LOADING
                    });

                    const newState = testingStore.getState();

                    // and lo, the state has changed! The reducer function is
                    // responsible for generating the new state.
                    expect(newState.messagesLoading).to.be.true; // eslint-disable-line
                    expect(newState.messages).to.be.deep.equal([]);

                });

                it('creates a NEW state object on any dispatched action', () => {

                    const currentStoreState = testingStore.getState();

                    testingStore.dispatch({
                        type: MESSAGES_LOADING
                    });

                    const subsequentStoreState = testingStore.getState();

                    // Remember how to copy properties into new objects?
                    // You should not be modifying a previous Redux state!

                    expect(currentStoreState).to.not.be.equal(subsequentStoreState);

                });

            });

            describe('reducing on MESSAGES_RECEIVED', () => {

                beforeEach('initialize the store to be loading messages', () => {
                    testingStore.replaceReducer(() => ({...testingStore.getState(), messagesLoading: false}));
                    testingStore.dispatch({type: 'INITIALIZE_FOR_MESSAGES_RECEIVED_TEST'});
                    testingStore.replaceReducer(rootReducer);
                });

                it('affects the state by setting messagesLoading to false and messages to dispatched messages', () => {

                    const randomMessages = testUtilities.createRandomMessages(10);

                    testingStore.dispatch({
                        type: MESSAGES_RECEIVED,
                        messages: randomMessages
                    });

                    const newState = testingStore.getState();

                    expect(newState.messagesLoading).to.be.false; // eslint-disable-line
                    expect(newState.messages).to.be.deep.equal(randomMessages);

                });

            });

            describe('reducing on NEW_MESSAGE', () => {

                let existingRandomMessages;
                beforeEach(() => {
                    existingRandomMessages = testUtilities.createRandomMessages(5);
                    testingStore = createStore(
                        rootReducer,
                        // this just sets the initial state of our store.
                        {messagesLoading: false, messages: existingRandomMessages}
                    );
                });

                it('affects the state by appends dispatched message to state messages', () => {

                    const dispatchedMessage = testUtilities.createOneRandomMessage();

                    testingStore.dispatch({
                        type: NEW_MESSAGE,
                        message: dispatchedMessage
                    });

                    const newState = testingStore.getState();
                    const lastMessageOnState = last(newState.messages);

                    // the NEW_MESSAGE action, when reduced, results in a
                    // message being added to the redux state's `messages` arr.
                    expect(newState.messages).to.have.length(6);
                    expect(lastMessageOnState).to.be.deep.equal(dispatchedMessage);

                });

                it('sets messages to different array from previous state', () => {

                    const originalState = testingStore.getState();
                    const dispatchedMessage = testUtilities.createOneRandomMessage();

                    testingStore.dispatch({
                        type: NEW_MESSAGE,
                        message: dispatchedMessage
                    });

                    const newState = testingStore.getState();

                    // Once again, don't mutate old data! Generate new data
                    // that looks the way you want. There are many ways to do
                    // so with arrays.
                    expect(newState.messages).to.not.be.equal(originalState.messages);
                    expect(originalState.messages).to.have.length(5);

                });

            });

        });
 });
