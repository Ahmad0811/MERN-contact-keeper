import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
	ADD_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	DELETE_CONTACT,
	SET_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
		loading: true,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	//get contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//Add contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
		}
	};

	//Delete contact
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
		}
	};

	//Update current contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			console.log(res);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
		}
	};

	//Clear Contacts
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	//Set current contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	//Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//Filter contact
	const filterContact = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	//Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<contactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				loading: state.loading,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContact,
				clearFilter,
				getContacts,
				clearContacts,
			}}
		>
			{props.children}
		</contactContext.Provider>
	);
};

export default ContactState;
