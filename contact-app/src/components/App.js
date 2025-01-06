import React, {useState, useEffect} from 'react';
import {uuid} from "uuidv4";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const LOCAL_STORAGE_KEY="contact";
  const [contacts,setContacts]=useState([]);

  const addcontacthandler= (contact)=>{
    setContacts([...contacts,{id:uuid(),...contact}]);
  }

  const removeContactHandler=(id)=>{
    const newcontactlist=contacts.filter((contact)=>{
      return contact.id!==id;
    });

    setContacts(newcontactlist);
  }

  useEffect(()=>{
    const retriveContacts= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts)));
    if(retriveContacts) setContacts(retriveContacts);
   },[]);
  
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
   },[contacts]);

  return (
    <div className='ui container'>
  <Header/>
  <AddContact addcontacthandler={addcontacthandler}/>
  <ContactList contacts={contacts} getContactId={removeContactHandler} />
  </div>
  );
}

export default App;
