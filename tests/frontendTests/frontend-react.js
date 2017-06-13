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

describe('▒▒▒ React tests ▒▒▒', function () {

    describe('User Item', () => {

        describe('visual content', () => {

            let UserItemData, UserItemWrapper, empty;
            beforeEach('Create <UserItem /> wrapper', () => {
                 UserItemData = {
                    id: 5,
                    name: 'dan',
                    email: 'dan@dansworld.com',
                    isAdmin: 'false',
                    shippingAddress: 'this is my address!',
                    createdAt: 'Today'
                };
                empty = function(){return 1};
                UserItemWrapper = shallow(<UserItem user={UserItemData} handleUpdateClick={empty} deleteUser={empty} />);
            });

            it('includes 7 th nodes', () => {
                expect(UserItemWrapper.find('th')).to.have.length(7);
            });

            it('includes user name', () => {
                expect(UserItemWrapper.find('th').at(0)).to.have.html('<th>dan</th>');
            });

            it('includes email', () => {
                expect(UserItemWrapper.find('th').at(1)).to.have.html('<th>dan@dansworld.com</th>');
            });

            it('includes admin status', () => {
                expect(UserItemWrapper.find('th').at(2)).to.have.html('<th>false</th>');
            });

            it('includes shipping address', () => {
                expect(UserItemWrapper.find('th').at(3)).to.have.html('<th>this is my address!</th>');
            });


            it('is not hardcoded', () => {
                const aDifferentUser = {
                    id: 5,
                    name: 'oh danny boy',
                    email: 'thepipes@thepipesarecalling.com',
                    isAdmin: 'false',
                    shippingAddress: 'ireland',
                    createdAt: ''
                };
                let empty = function(){return 1};
                const differentUserItem = shallow(<UserItem user={aDifferentUser} handleUpdateClick={empty} deleteUser={empty} />);
                 expect(differentUserItem.find('th').at(0)).to.have.html('<th>oh danny boy</th>');
            });
        });
        describe('interactivity', () => {
            let userItemData, userItemWrapper, handleUpdateClickSpy, empty;
            beforeEach('Create <Message />', () => {
                userItemData = {
                    id: 5,
                    name: 'dan',
                    email: 'ashi@gracehopperacademy.com',
                    isAdmin: 'false',
                    shippingAddress: 'this is my address!',
                    createdAt: 'Today junior'
                };
                empty = function(){return 1};
                handleUpdateClickSpy = spy();
                userItemWrapper = shallow(<UserItem user={userItemData} handleUpdateClick={handleUpdateClickSpy} deleteUser={empty} />);
            });
            it('spy is not instantly called', () => {
                expect(handleUpdateClickSpy).not.to.have.been.called; // eslint-disable-line
            })

            it('when clicked, calls the spy', () => {
                expect(handleUpdateClickSpy).not.to.have.been.called; // eslint-disable-line
                (userItemWrapper.find('button').at(1)).simulate('click')
                expect(handleUpdateClickSpy).to.have.been.called; // eslint-disable-line
            });
        });
    });
});
