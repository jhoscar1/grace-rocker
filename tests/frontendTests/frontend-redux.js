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
import rootReducer, {SET_ORDER, DELETE_ORDER, GET_ORDERS, getOrders, deleteOrder, getUser, getUsers, GET_USER, fetchUsers} from '../../client/reducer';
import actualStore from '../../client/store';
const db = require('../../server/db');
const User = db.model('user');


 describe('Redux architecture', () => {

    beforeEach('Synchronize and clear database', () => db.sync({force: true}));

    after('Synchronize and clear database', () => db.sync({force: true}));

        describe('action creators', () => {

            // Action creators are functions which return action objects.

            describe('createGetUserAction', () => {
                let userToGet;
                before(() => {
                    User.create({
                        name: 'Jason',
                        email: 'test@test.com',
                        pass: 'yahoo',
                        isAdmin: true
                    })
                    .then((created) => {
                        userToGet = created;
                    })
                });

                it('returns expected action description', () => {

                    const actionDescriptor = getUser(userToGet);
                    expect(actionDescriptor).to.be.deep.equal({
                        type: GET_USER,
                        user: userToGet
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
                expect(currentStoreState.userReducer.users).to.be.deep.equal([]);
            });

            // "on MESSAGES_LOADING" means when an action of that type is dispatched.

            describe('reducing on GET_USERS', () => {
                let userToGet;
                before(() => {
                    User.create({
                        name: 'Jason',
                        email: 'test@test.com',
                        pass: 'yahoo',
                        isAdmin: true
                    })
                    .then((created) => {
                        userToGet = created;
                    })
                });
                it('affects state by fetching all users and setting them to userReducer.users', () => {

                    // an action is dispatched…
                    testingStore.dispatch(getUser(userToGet));

                    const newState = testingStore.getState();

                    // and lo, the state has changed! The reducer function is
                    // responsible for generating the new state.
                    expect(newState.userReducer.user).to.deep.equal(userToGet);

                });

                it('creates a NEW state object on any dispatched action', () => {

                    const currentStoreState = testingStore.getState();

                    testingStore.dispatch({
                        type: 'default'
                    });

                    const subsequentStoreState = testingStore.getState();

                    // Remember how to copy properties into new objects?
                    // You should not be modifying a previous Redux state!

                    expect(currentStoreState).to.not.be.equal(subsequentStoreState);

                });

            });

        });
 });
