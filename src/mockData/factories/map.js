import {generators, create, createMany} from 'sharkhorse';
import uuidV4 from 'uuid/v4';
import {Message} from './message';
import {Contacts, Permissions} from 'expo';
import {store} from '../../app/store';
import {createMap} from '../../app/containers/Map/actions';

export const SharedMap = {
  id: null,
  ownerUserID: 'MY-USER-ID',
  lastContact: generators.date().jsTimestamp,
  subject: generators.lorem().words(3),
  contactIDs: [],
  messages: []
};

export function createSharedMap({ownerUserID, contactIDs = []}) {
  const newMap = Object.assign(
    create(SharedMap), 
    {
      id: uuidV4(),
      ownerUserID: ownerUserID,
      contactIDs,
      messages: createMany(Message, 5)
    }
  );
  return newMap;
}

function getNRandomContactIDs(n, inputArray) {
  const array = inputArray.slice();
  const output = [];

  for (let i = 0; i < n; i++) {
    const randIdx = Math.floor(Math.random() * array.length);
    const randContact = array[randIdx];
    array.splice(randIdx, 1) ;
    output.push(randContact.id);
  }
  
  return output;
}

async function _generateMockMaps(numMaps, numContactsPerMap = []) {
  // Just setting ownerUserID (which represents the current user's userID) to a mock value..
  const ownerUserID = 'MY-USER-ID';
  const maps = [];

  const permission = await Permissions.askAsync(Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    throw 'Could not create mock maps because user denied contact permissions.';
  }

  // Fetch contacts so we can use actual contactIDs...
  const contactsResponse = await Contacts.getContactsAsync({
    fields: [
      Contacts.PHONE_NUMBERS
    ]
  });
  const contacts = contactsResponse.data ? contactsResponse.data : [];
  
  // Create the specified number of maps...
  for (let i = 0; i < numMaps; i++) {
    const numContacts = numContactsPerMap[i];
    const contactIDs = getNRandomContactIDs(numContacts, contacts);
    // Create the new shared map.
    const newMap = createSharedMap({ownerUserID, contactIDs});
    // Set subject to contact's name if they're the only one in the group.
    if (numContacts === 1) {
      const contactID = contactIDs[0];
      let contact;
      contacts.some(c => {
        if (c.id === contactID) {
          contact = c;
          newMap.subject = `${contact.firstName} ${contact.lastName}`;
          return true;
        }
        return false;
      }); 
    }
    // Add the new map to the maps array.
    maps.push(newMap);
  }

  // Store each of the mock maps into the redux store.
  maps.forEach(map => {
    const {id, ownerUserID, contactIDs, subject, lastContact, messages} = map;
    store.dispatch(createMap({
      id,
      ownerUserID, 
      contactIDs, 
      subject,
      lastContact,
      messages
    }));
  });
}

export async function setupMockMaps() {
  const state = store.getState();
  const {mapsData} = state;
  const {mapList}  = mapsData;

  return new Promise((resolve) => {
    if (mapList.length <= 0) {
      // Generate 5 mock maps...
      // Map 1: has 1 random contact
      // Map 2: has 4 random contacts
      // Map 3: has 3 random contacts
      // Map 4: has 2 random contacts
      // Map 5: has 1 random contact
      return _generateMockMaps(5, [1, 4, 3, 2, 1]);
    } else {
      return resolve();
    }
  });
}